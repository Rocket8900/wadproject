import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { BsFillClipboard2Fill } from "react-icons/bs";
import {
  FaList,
  FaRegHeart,
  FaHome,
  FaCreativeCommonsBy,
  FaCog,
  FaRocketchat
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./stuSidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion as m } from 'framer-motion'
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import jwtDecode from "jwt-decode";
import axios from 'axios'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

const ProfileModal = ({ modal, setModal, student }) => {
  const [name, setName] = useState(student.name);
  const [imageFile, setImageFile] = useState(null);

  const token = getCookie("access_token");
  const decodedToken = jwtDecode(token).user;
  const studentId = decodedToken.id;

  const handleProfileUpdate = (e) => {
    const data = {
      name: name,
    };
    axios.patch('http://localhost:3001/v1/api/student/profile/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating name:', error);
      });

    if (imageFile) {
      const formData = new FormData();
      formData.append('photo', imageFile);
      axios.patch('http://localhost:3001/v1/api/student/profile/photo', formData, {
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
    setModal(false);
  }

  const handleStudentName = (e) => {
    setName(e);
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
        <m.main initial={{ y: '-100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} className='loginForm-box '>
          <Formik
            initialValues={{
              name: '',
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
                  onChange={(e) => handleStudentName(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label>Upload Image: </label>
                <input type="file" onChange={handleImageUpload} />
              </div>
              
              <m.div className="login-btn-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{marginTop: "40px"}}>
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

const Sidebar = ({ student }) => {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900); // Adjust the width as needed
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchPic = async () => {
      try {
        const token = getCookie("access_token");
        const decodedToken = jwtDecode(token).user;
        const studentId = decodedToken.id;

        const picResponse = await axios.get(
          `http://localhost:3001/v1/api/s3/student/single/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setProfileImage(picResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPic();

    return () => {
      isMounted = false;
    };
  }, []);

  const { name, instructorId } = student;
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const findInstructorLabel = instructorId ? "View Lessons" : "Find Instructor";
  const findInstructorLink = instructorId ? "/bookingStudent" : "/instructors";
  
  const navigate = useNavigate();

  const navigateToHome = () => {
    Cookies.remove('access_token');
    navigate('/');
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/student-dashboard") {
      setActiveMenuItem("dashboard");
    } else if (currentPath === "/bookingStudent" || currentPath === "/instructors") {
      setActiveMenuItem("findInstructor");
    } else if (currentPath === "/choose-quiz") {
      setActiveMenuItem("practice");
    } else if (currentPath === "/simulator") {
      setActiveMenuItem("simulator");
    } else if (currentPath === "/notes") {
      setActiveMenuItem("yourNotes");
    } else if (currentPath === '/student-chat') {
      setActiveMenuItem("instructorChat");
    }
  }, [location.pathname]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div id="stuSidebar">
      <ProfileModal
        modal={modal}
        setModal={setModal}
        student={student}
      />
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="user-info-box" onClick={() => toggleModal()}>
            <Container>
              <Row>
                <Col lg={5} md={12}>
                  <m.img
                    className="sidebarprofile"
                    src={profileImage}
                    alt="pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </Col>
                <Col lg={7} md={12}>
                  <div className="user-info">Hello, {name}!</div>
                </Col>
              </Row>
            </Container>
            <p className="profileEditInfo">Click me to edit your profile</p>
          </div>

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome/>} 
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
              className="mostinnerouter"  
            >
              <Link to="/student-dashboard">
                <div className="mostInner">Dashboard</div>
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "findInstructor"}
              onClick={() => handleMenuItemClick("findInstructor")}
              className="mostinnerouter"
            >
              <Link to={findInstructorLink}>
                {instructorId ? (
                  <div className="mostInner">View Lessons</div>
                ) : (
                  <div className="mostInner">Find Instructor</div>
                )}
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaRegHeart />}
              active={activeMenuItem === "practice"}
              onClick={() => handleMenuItemClick("practice")}
              className="mostinnerouter"
            >
              <Link to="/choose-quiz">
                <div className="mostInner">BTT / FTT</div>
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaCreativeCommonsBy />}
              active={activeMenuItem === "simulator"}
              onClick={() => handleMenuItemClick("simulator")}
              className="mostinnerouter"
            >
              <Link to="/simulator">
                <div className="mostInner">Enter the Simulator</div>
              </Link>
            </MenuItem>
            <MenuItem
              icon={<BsFillClipboard2Fill />}
              active={activeMenuItem === "yourNotes"}
              onClick={() => handleMenuItemClick("yourNotes")}
              className="mostinnerouter"
            >
              <Link to="/notes">
                <div className="mostInner">Your Notes</div>
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaRocketchat />}
              active={activeMenuItem === "instructorChat"}
              onClick={() => handleMenuItemClick("instructorChat")}
              className="mostinnerouter"
            >
              <Link to="/student-chat">
                <div className="mostInner">Open your chat</div>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FaCog />} onClick={navigateToHome} className="mostinnerouterSignOut">Sign Out</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
