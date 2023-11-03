import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentSidebar from '../dashboards/sidebar/Sidebar';
import StudentChatPage from './StudentChatPage'; // This will be the student chat mirror you requested earlier
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ChatWithInstructorPage() {
   
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      
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
                  }
              );
              setStudent(studentResponse.data.data);

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

  if (student === null) {
    return <div>Loading...</div>;
}

  return (
    
    <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <StudentSidebar student={student}/> {/* Assuming you have a student sidebar component */}
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content"> 
                 <StudentChatPage student={student}/>
              </Col>
          </Row>
      </Container>
  );
}

export default ChatWithInstructorPage;
