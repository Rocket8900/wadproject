import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaRocketchat,
  FaList,
  FaChild,
  FaHome,
  FaCog,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import profile from './sampleprofile.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; // Import Axios
import { useLocation } from 'react-router-dom';
import jwtDecode from "jwt-decode";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const ProfileModal = ({ modalProps, instructor }) => {
  const [name, setName] = useState(instructor.name);
  const [carModel, setCarModel] = useState(instructor.carModel);
  const [imageFile, setImageFile] = useState(null);


  const handleProfileUpdate = (e) => {
    const data = {
      name: name,
      carModel: carModel,
    };
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    axios.patch('http://localhost:3001/v1/api/instructor/profile/', data)
      .then((response) => {
        console.log('Name and car model updated successfully');
      })
      .catch((error) => {
        console.error('Error updating name and car model:', error);
      });

    if (imageFile) {
      const formData = new FormData();
      formData.append('photo', imageFile);
      const token = getCookie("access_token");
      axios.patch('http://localhost:3001/v1/api/instructor/profile/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Image updated successfully');
        })
        .catch((error) => {
          console.error('Error updating image:', error);
        });
    }
  }

  const handleInstructorName = (e) => {
    setName(e);
  }

  const handleCarModel = (e) => {
    setCarModel(e);
  }

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleInstructorName(e.target.value)}
          />
        </div>
        <div>
          <label>Car:</label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => handleCarModel(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleProfileUpdate}>Submit</Button>
        <Button onClick={modalProps.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Sidebar = ({ instructor }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [profileImage, setProfileImage] = useState(profile); 
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 9);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
  const fetchPic = async () => {
    try {
        const token = getCookie("access_token");
        const decodedToken = jwtDecode(token).user;
        const instructorId = decodedToken.id;

        const picResponse = await axios.get(

            `http://localhost:3001/v1/api/s3/instructor/single/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
          console.log(picResponse.data.data)
          setProfileImage(picResponse.data.data);
          
        } catch (error) {
            console.error(error);
        }
    };

    fetchPic(); 
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/instructor-dashboard") {
      setActiveMenuItem("dashboard");
    } else if (currentPath === "/instructorbookings") {
      setActiveMenuItem("instructorbookings");
    } else if (currentPath === "/instructorstudents") {
      setActiveMenuItem("instructorstudents");
    } else if (currentPath === "/instructor-chat") {
      setActiveMenuItem("instructorChat");
    }
  }, [location.pathname]);

  const { name, instructorId } = instructor;
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  }

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  if (name === null || instructorId === null) {
    return <div>Loading...</div>;
  }

  
  return (
    <div id="sidebar">
      <ProfileModal
        modalProps={{
          show: modalShow,
          onHide: () => setModalShow(false),
        }}
        instructor={instructor}
      />

      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="user-info-box" onClick={() => setModalShow(true)}>
            <Container>
              <Row>
                <Col lg={5} md={12}>
                  <img className="sidebarprofile" src={profileImage} alt="Logo" />
                </Col>
                <Col lg={7} md={12}><p>Hi {name}!</p></Col>
              </Row>
            </Container>
            <div className="user-info"></div>
          </div>

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome />}
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <Link to="/instructor-dashboard"><div className="mostInner">Dashboard</div></Link>
            </MenuItem>

            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "instructorbookings"}
              onClick={() => handleMenuItemClick("instructorbookings")}
            >
              <Link to="/instructorbookings">
                <div className="mostInner">Check your bookings</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaChild />}
              active={activeMenuItem === "instructorstudents"}
              onClick={() => handleMenuItemClick("instructorstudents")}
            >
              <Link to="/instructorstudents">
                <div className="mostInner">See your students</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaRocketchat />}
              active={activeMenuItem === "instructorChat"}
              onClick={() => handleMenuItemClick("instructorChat")}
            >
              <Link to="/instructor-chat">
                <div className="mostInner">Open your chat</div>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FaCog />} onClick={navigateToHome}>Sign Out</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
