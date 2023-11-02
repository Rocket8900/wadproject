import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import "./styles/card.css";
import Modal from 'react-bootstrap/Modal';
import {createRoot} from 'react-dom';
import Button from 'react-bootstrap/Button';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from 'react-bootstrap/Carousel';

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

// component for creating Instructor Card
function InstructorCard({ instructor, showModal }) {

  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => {
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <div className="card" style={backgroundImageStyle(instructor.picture)}>
      <div className="content">
        <h2 className="title">{instructor.name}</h2>
        <p className="copy">Instructor for {instructor.experience} years</p>
        <button variant="primary" className="btn" onClick={handleModalShow}>
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
            <Modal.Title id="contained-modal-title-vcenter">
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
            {/* Left Column (Carousel) */}
            <div className="col-md-6">
              <Carousel>
                {instructor.picture.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img src={url} alt={`Instructor ${index + 1}`} />
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
              <Link to={`/student-chat`}><Button variant="dark">Chat with instructor!</Button></Link>
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
  const [instructors, setInstructors] = useState([]);
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState(null);
  const { id } = useParams();
  const [filter, setFilter] = useState({
    gender: [],
    affiliation: [],
    type: []
  });

  useEffect(() => {
    const getInstructorsData = async () => {
      try {
        const token = Cookie.get('access_token');

        const response = await axios.get("http://localhost:3001/v1/api/instructor/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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

            `http://localhost:3001/v1/api/student/profile/${studentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
           
        );
        console.log(studentResponse.data.data)
        setStudent(studentResponse.data.data);


        const bookingsResponse = await axios.get(
            `http://localhost:3001/v1/api/booking/student/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(bookingsResponse.data.data)
        setBookings(bookingsResponse.data.data[0]);

    } catch (error) {
        console.error(error);
    }
};

fetchData(); 
getInstructorsData();

},[]);

if (bookings === null || student === null) {
  return <div>Loading...</div>;
}

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;

    setFilter(prevFilter => {
      const updatedFilter = { ...prevFilter };

      if (checked) {
        updatedFilter[name] = [...updatedFilter[name], value];
      } else {
        updatedFilter[name] = updatedFilter[name].filter(item => item !== value);
      }

      return updatedFilter;
    });
  };

  const filteredInstructors = instructors.filter((instructor) => {
    return (
      (filter.gender.length === 0 || filter.gender.includes(instructor.gender)) &&
      (filter.affiliation.length === 0 || filter.affiliation.includes(instructor.affiliation)) &&
      (filter.type.length === 0 || filter.type.includes(instructor.type))
    );
  });

  return (
    <div>
      
      <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student} />
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                  <div className="headerCJ">
                    <h1 style={{fontSize: 'xx-large', textAlign:'center', color:'#00072D', margin:'auto', position:'relative'}}>INSTRUCTORS</h1>
                    <Link to={`/student-dashboard`} className='dashboardLink'>
                      <span>Dashboard</span>
                    </Link>
                  </div>
                    <div className="inline">
                      <form>
                        <div>
                          <h4>Gender:</h4>
                          <label>
                            <input
                              type="checkbox"
                              name="gender"
                              value="Male"
                              checked={filter.gender.includes('Male')}
                              onChange={handleCheckboxChange}
                            /> Male
                          </label>
                          <br/>
                          <label>
                            <input
                              type="checkbox"
                              name="gender"
                              value="Female"
                              checked={filter.gender.includes('Female')}
                              onChange={handleCheckboxChange}
                            /> Female
                          </label>
                        </div>
                        <br />
                        <div>
                          <h4>Affiliation:</h4>
                          <label>
                            <input
                              type="checkbox"
                              name="affiliation"
                              value="BBDC"
                              checked={filter.affiliation.includes('BBDC')}
                              onChange={handleCheckboxChange}
                            /> BBDC
                          </label>
                        <br/>
                          <label>
                            <input
                              type="checkbox"
                              name="affiliation"
                              value="SSDC"
                              checked={filter.affiliation.includes('SSDC')}
                              onChange={handleCheckboxChange}
                            /> SSDC
                          </label>
                        <br/>
                          <label>
                            <input
                              type="checkbox"
                              name="affiliation"
                              value="CDC"
                              checked={filter.affiliation.includes('CDC')}
                              onChange={handleCheckboxChange}
                            /> CDC
                          </label>
                        </div>
                        <br/>
                        <div>
                          <h4>Transmission:</h4>
                          <label>
                            <input
                              type="checkbox"
                              name="type"
                              value="auto"
                              checked={filter.type.includes('auto')}
                              onChange={handleCheckboxChange}
                            /> Auto
                          </label>
                        <br/>
                          <label>
                            <input
                              type="checkbox"
                              name="type"
                              value="manual"
                              checked={filter.type.includes('manual')}
                              onChange={handleCheckboxChange}
                            /> Manual
                          </label>
                        </div>                     
                      </form>

                      {/* Render InstructorCard component for each filtered instructor */}
                      <main className="page-content">
                        {filteredInstructors.map((instructor) => (
                          <InstructorCard key={instructor.id} instructor={instructor} />
                        ))}
                      </main>
                    </div>
              </Col>
            </Row>
        </Container>
    </div>
  );
}

export default InstructorsComponent;