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
import "./insSidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
// import profile from './sampleprofile.jpg';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { motion as m } from 'framer-motion'
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import styles from "./insSidebarOverlap.module.css";
import BASE_URL from "../../apiConfig";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const btn ={
  hover: {
    scale:[null, 1.1, 1.05],
    transition:{
      duration: .2
    },
  },
  tap:{
    scale: .98,
  }    
}

const ProfileModal = ({modal, setModal, instructor }) => {
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
    axios.patch(`${BASE_URL}/v1/api/instructor/profile/`, data)
      .then((response) => {

      })
      .catch((error) => {
        console.error('Error updating name and car model:', error);
      });
      window.location.reload()
    if (imageFile) {
      const formData = new FormData();
      formData.append('photo', imageFile);
      const token = getCookie("access_token");
      axios.patch(`${BASE_URL}/v1/api/instructor/profile/photo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {

        })
        .catch((error) => {
          console.error('Error updating image:', error);
        });
    }
    setModal(false)
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

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Modal show={modal} onHide={() => setModal(false)} dialogClassName="modal-lg modal-dialog-centered rounded">
      <div className="loginModal" style={{ backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "35px", minHeight: "50vh"}}>
        <m.main initial={{ y: '-100%' }} animate={{ y: '0%' }} className='loginForm-box '>
          <Formik
              initialValues={{
              name: '',
              carModel: '',
            }}
          >
            <Form>
              <h1 className="loginTitle">Edit Profile</h1>
              <div className="input-container" style={{marginBottom:"20px"}}>
                <label htmlFor="Name">Name</label>
                <Field 
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => handleInstructorName(e.target.value)}
                />
              </div>
              <div className="input-container" style={{marginBottom:"20px"}}>
                <label htmlFor="CarModel">Car Model</label>
                <Field 
                  type="text"
                  placeholder="Car Model"
                  value={carModel}
                  onChange={(e) => handleCarModel(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Upload Image: </label>
                <input type="file" onChange={handleImageUpload} />
              </div>
              
              <m.div className="login-btn-container" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}} style={{marginTop: "40px"}}>
                <m.button className='next-btn' type='button' variants={btn} whileHover='hover' whileTap='tap' onClick={() => setModal(false)}>Cancel</m.button>
                <m.button className='next-btn' type='submit' variants={btn} whileHover='hover' whileTap='tap' onClick={handleProfileUpdate}>Submit</m.button>
              </m.div>
            </Form>
          </Formik>
        </m.main>
      </div>
    </Modal>
  );
}

const Sidebar = ({ instructor }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modal, setModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
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
          `${BASE_URL}/v1/api/s3/instructor/single/${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const { name, instructorId } = instructor || { name: '', instructorId: '' };
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  }

  const navigate = useNavigate();

  const navigateToHome = () => {
    Cookies.remove('access_token')
    navigate('/');
  };
  if (name === null || instructorId === null) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div id="sidebar">
      <ProfileModal
        modal={modal}
        setModal={setModal} 
        instructor={instructor}
      />

      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
        {isSmallScreen ? null : (
          <div className={styles.userInfoBox} onClick={() => toggleModal()}>
            <Container>
              <Row>
                <Col lg={5} md={12}>
                  <img className="sidebarprofile" src={profileImage} alt="pic" />
                </Col>
                <Col lg={7} md={12}><div className="user-info">Hello, {name}!</div></Col>
              </Row>
            </Container>
            <p className="profileEditInfo">Click me to edit your profile</p>
          </div>
               )}

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome />}
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
              className="mostinnerouter"
            >
              <Link to="/instructor-dashboard"><div className="mostInner">Dashboard</div></Link>
            </MenuItem>

            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "instructorbookings"}
              onClick={() => handleMenuItemClick("instructorbookings")}
              className="mostinnerouter"
            >
              <Link to="/instructorbookings">
                <div className="mostInner">Bookings</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaChild />}
              active={activeMenuItem === "instructorstudents"}
              onClick={() => handleMenuItemClick("instructorstudents")}
              className="mostinnerouter"
            >
              <Link to="/instructorstudents">
                <div className="mostInner">View Students</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaRocketchat />}
              active={activeMenuItem === "instructorChat"}
              onClick={() => handleMenuItemClick("instructorChat")}
              className="mostinnerouter"
            >
              <Link to="/instructor-chat">
                <div className="mostInner">Open Chat</div>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FaCog />} onClick={navigateToHome} className="mostinnerouterSignOut"><div className="mostInner ">Sign Out</div></MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
