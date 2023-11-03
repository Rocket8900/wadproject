

import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar'
import InstructorChatPage from './InstructorChatPage'
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ThreeDotsWave from "../loader/loader";


function ChatWithStudentPage() {

   
  const [instructor, setInstructor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      
      const fetchData = async () => {
          try {
              const token = getCookie("access_token");
              const decodedToken = jwtDecode(token).user;
              const instructorId = decodedToken.id;

              const instructorResponse = await axios.get(

                  `http://localhost:3001/v1/api/instructor/profile/${instructorId}`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              setInstructor(instructorResponse.data.data);
  

          } catch (error) {
              console.error(error);
          }
      };
  
      fetchData(); 
      
  }, []); 

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


  if (instructor === null) {
    return <ThreeDotsWave/>;
}

  return (
    
    <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <InstructorSidebar instructor={instructor}/>
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                <InstructorChatPage instructor={instructor}/>
              </Col>
          </Row>
      </Container>
  );
}

export default ChatWithStudentPage;
