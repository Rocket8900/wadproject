import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import styles from "./card.module.css";
import Modal from "react-bootstrap/Modal";
import { createRoot } from "react-dom";
import Button from "react-bootstrap/Button";
import Sidebar from "../dashboards/sidebar/Sidebar";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from 'react-bootstrap/Carousel';
import AsyncScriptLoader from './MapView';
import {toast} from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../apiConfig";


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// function for setting background image
const backgroundImageStyle = (urls) => {
  if (Array.isArray(urls) && urls.length > 0) {
    return {
      backgroundImage: `url(${urls[0]})`,
    };
  } else {
    return {};
  }
};

const handleChatClick = async (instructorId) => {
  try {
    const token = getCookie("access_token"); // Assuming you use Cookies for storing the token
    console.log(token);
    const response = await axios.post(
      `${BASE_URL}/v1/api/chat/${instructorId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      console.log(response.data.data);
    }

    // Handle the response or set state here, if needed
    window.location.reload();
  } catch (error) {
    console.error("Error when clicking the button:", error);
  }
};

const handleBookingClick = async (instructorId) => {
  try {
    const token = getCookie("access_token");
    const data = {
      instructorId: instructorId,
    };
    const response = await axios.post(
      `${BASE_URL}/v1/api/booking/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      toast.success("Booking successful!"); // Success toaster
    } else {
      console.log("nope")
      toast.error("Booking failed. Please try again."); // Error toaster for unsuccessful response
    }
  } catch (error) {
    console.error("Error when clicking the button:", error);
    toast.error("Booking failed. Please try again."); // Error toaster for exceptions
  }
};

function BookingConfirmationModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to book this instructor?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
// component for creating Instructor Card
function InstructorCard({ instructor, showModal, onAddMarker }) {
  const [geocodedAddress, setGeocodedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [signedUrls, setSignedUrls] = useState([]);
  const [instructorDP, setInstructorDP] = useState(null);

  const initiateBooking = () => {
    setShowBookingConfirmation(true);
  };

  const confirmBooking = async () => {
    setShowBookingConfirmation(false);
    await handleBookingClick(instructor.id);
  };
  const fetchInstructorDP = async () => {
    try {
      const token = Cookie.get("access_token");
      const response = await axios.get(`${BASE_URL}/v1/api/S3/instructor/single/${instructor.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.data) {
        setInstructorDP(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching instructor DP:", error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC2Qnl98e6FirAZSVRYEyzYfs_0jPaTsSk`
      );

      const results = response.data.results;
      if (results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;
        setGeocodedAddress(formattedAddress);
      } else {
        setGeocodedAddress("No address found for the given coordinates.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setGeocodedAddress("Error reverse geocoding");
      setLoading(false);
    }
  };

  const handleAddMarkerClick = () => {
    console.log("Add Marker Clicked");
    const { name, preferedLocation } = instructor;
    console.log("preferedLocation:", preferedLocation); // Log preferedLocation object
    if (preferedLocation != null) {
      console.log("Adding Marker:", name, preferedLocation);
      onAddMarker(name, preferedLocation);
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const fetchSignedUrls = async () => {
    try {
      const token = Cookie.get("access_token");
      const response = await axios.get(
        `${BASE_URL}/v1/api/s3/instructor/bulk/${instructor.id}`, 
          {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
      );
      setSignedUrls(response.data.data); // Assuming the response contains an array of signed URLs
    } catch (error) {
      console.error("Error fetching instructor images:", error);
    }
  };

  const handleModalShow = () => {
    fetchSignedUrls(); // Fetch signed URLs when the modal is about to be shown
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  useEffect(() => {
    fetchInstructorDP();
  }, [instructor.id]);

  
  return (
    <div className={styles.card} style={{ 
      backgroundImage: `url(${instructorDP})`,
      backgroundSize: 'contain',  // scales the image to fit within the frame
      backgroundPosition: 'center',  // centers the image
      backgroundRepeat: 'no-repeat'  // ensures the image doesn't repeat
  }}>
  
      <div className={styles.content}>
        <h2 className={styles.title}>{instructor.name}</h2>
        <p className={styles.copy}>
          Instructor for {instructor.experience} years
        </p>
        <button
          variant="primary"
          className={styles.btn}
          onClick={handleModalShow}
        >
          View Details
        </button>
        <div>
          <Modal
            show={modalShow}
            onHide={handleModalClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: "center" }}>
              {/* Left Column (Carousel) */}
              <div className="col-md-6">
                <Carousel>
                {signedUrls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img src={url} alt={`Instructor Image ${index + 1}`} />
                  </Carousel.Item>
                ))}
                </Carousel>
              </div>

              {/* Right Column (Instructor Info) */}
              <div className="col-md-6">
                <h1>{instructor.name}</h1>
                <h4>Experience: {instructor.experience} years</h4>
                <p>Gender: {instructor.gender}</p>
                <p>Affiliation: {instructor.affiliation}</p>
                <p>Transmission: {instructor.type}</p>

                <p>
                  Preferred Location: {loading ? "Loading..." : geocodedAddress}
                </p>
                <Link to={`/student-chat`}>
                  <Button
                    variant="dark"
                    onClick={() => handleChatClick(instructor.id)}
                  >
                    Chat with instructor!
                  </Button><p></p>
                </Link>
                
                <Button variant="dark" onClick={initiateBooking}>
                  Book the instructor!
                </Button>
                <p></p>
                {instructor.preferedLocation && (
                  <Button variant="dark" onClick={handleAddMarkerClick}>Add Marker</Button>
                )}

                <BookingConfirmationModal
                  show={showBookingConfirmation}
                  onHide={() => setShowBookingConfirmation(false)}
                  onConfirm={confirmBooking}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function InstructorsComponent() {
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState(null);
  const { id } = useParams();

  const [filter, setFilter] = useState({
    
    gender: [],
    affiliation: [],
    type: [],
  });

  const handleAddMarker = (name, location) => {
    setMarkerCoordinates([...markerCoordinates, { name, location }]);
  };

  useEffect(() => {
    const getInstructorsData = async () => {
      try {
        const token = Cookie.get("access_token");

        const response = await axios.get(
          `${BASE_URL}/v1/api/instructor/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInstructors(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    

    const fetchData = async () => {
      try {
        const token = getCookie("access_token");
        const decodedToken = jwtDecode(token).user;
        const studentId = decodedToken.id;

        const studentResponse = await axios.get(
          `${BASE_URL}/v1/api/student/profile/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(studentResponse.data.data);

        const bookingsResponse = await axios.get(
          `${BASE_URL}/v1/api/booking/student/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(bookingsResponse.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getInstructorsData();
  }, []);

if (bookings === null || student === null) {
  return <div>Loading...</div>;
}

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;

    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter };

      if (checked) {
        updatedFilter[name] = [...updatedFilter[name], value];
      } else {
        updatedFilter[name] = updatedFilter[name].filter(
          (item) => item !== value
        );
      }

      return updatedFilter;
    });
  };

  const filteredInstructors = instructors.filter((instructor) => {
    return (
      (filter.gender.length === 0 ||
        filter.gender.includes(instructor.gender)) &&
      (filter.affiliation.length === 0 ||
        filter.affiliation.includes(instructor.affiliation)) &&
      (filter.type.length === 0 || filter.type.includes(instructor.type))
    );
  });

  return (
    <div>
      <ToastContainer />

      <Container fluid>
        <Row>
          <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
            <Sidebar student={student} />
          </Col>
          <Col lg={10} md={10} sm={10} xs={10} id="main-content">
            <div className={styles.header}>
              <h1>Instructors</h1>
            </div>
            <div className={styles.inline}>
              <form className="controls" id="Filters">
                <div className={styles.FilterBox}>
                  <fieldset>
                    <AsyncScriptLoader markerCoordinates={markerCoordinates} className={styles.MapView}/>
                  </fieldset>

                  <br />
                  <br />

                  <fieldset>
                    <h4>Gender</h4>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="gender"
                        value="Male"
                        checked={filter.gender.includes("Male")}
                        onChange={handleCheckboxChange}
                      />
                      <label>Male</label>
                    </div>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="gender"
                        value="Female"
                        checked={filter.gender.includes("Female")}
                        onChange={handleCheckboxChange}
                      />
                      <label>Female</label>
                    </div>
                  </fieldset>

                  <br />

                  <br />

                  <fieldset>
                    <h4>Affiliation</h4>

                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="affiliation"
                        value="BBDC"
                        checked={filter.affiliation.includes("BBDC")}
                        onChange={handleCheckboxChange}
                      />
                      <label>BBDC</label>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="affiliation"
                        value="SSDC"
                        checked={filter.affiliation.includes("SSDC")}
                        onChange={handleCheckboxChange}
                      />
                      <label>SSDC</label>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="affiliation"
                        value="CDC"
                        checked={filter.affiliation.includes("CDC")}
                        onChange={handleCheckboxChange}
                      />
                      <label>CDC</label>
                    </div>
                  </fieldset>

                  <br />
                  <br />

                  <fieldset>
                    <h4>Transmission</h4>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="type"
                        value="auto"
                        checked={filter.type.includes("auto")}
                        onChange={handleCheckboxChange}
                      />
                      <label>Auto</label>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="type"
                        value="manual"
                        checked={filter.type.includes("manual")}
                        onChange={handleCheckboxChange}
                      />
                      <label>Manual</label>
                    </div>
                  </fieldset>
                </div>
              </form>

              {/* Render InstructorCard component for each filtered instructor */}
              <Container fluid>
                <div className={styles.scrollableContainer}>
                <Row>
                  {filteredInstructors.map((instructor) => (
                    <Col key={instructor.id} lg={4} md={6} sm={12}>
                      <InstructorCard
                        instructor={instructor}
                        onAddMarker={handleAddMarker}
                      />
                    </Col>
                  ))}
        
                </Row>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InstructorsComponent;
