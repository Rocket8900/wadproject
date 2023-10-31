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
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import profile from './sampleprofile.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';


function ProfileModal(props) {
  const { instructor } = props;
  const [name, setName] = useState(instructor.name);
  const [carModel, setCarModel] = useState(instructor.carModel);
  const [imageFile, setImageFile] = useState(null);
  const handleProfileUpdate = (e) => {
    console.log('Updated Name:', name);
    console.log('Updated Car Model:', carModel);
    if (imageFile) {
      console.log('Selected Image File:', imageFile);
    }
  }

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };
  return (
    <Modal
      {...props}
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
          <input type="file" onChange={handleImageUpload}  />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={instructor.name}  onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Car:</label>
          <input type="text" value={instructor.carModel} onChange={(e) => setCarModel(e.target.value)}
 />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleProfileUpdate}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Sidebar = ({ instructor }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
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
  };
  const handleDeleteCookie = () => {
    Cookies.remove('access_token');
    <Link to={'/'}></Link>
  }
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  if (name === null || instructorId === null) {
    return <div>Loading...</div>;
  }
  console.log(instructor)



  return (
    <div id="sidebar">
                    <ProfileModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              instructor={instructor}
            />
            
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>


        <SidebarContent>
        {/* {!isSmallScreen && ( */}
          <div className="user-info-box" onClick={() => setModalShow(true)}>
            <Container>
              <Row>
                <Col lg = {5} md={12}>
                    <img className="sidebarprofile" src={profile} alt="Logo" />
                  </Col>
                <Col lg = {7} md={12}><p>Hi {name}!</p></Col>
              </Row>
            </Container>
            <div className="user-info">


            </div>
          </div>
        {/* )} */}

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome />}
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <Link to="/instructor-dashboard" ><div className="mostInner">Dashboard</div></Link>
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
