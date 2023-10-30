import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar';
import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";



function InstructorLessonList() {
  const [students, setStudents] = useState([]);
  // const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getInstructorsData = async () => {
      try {
        const token = Cookie.get('access_token');
        const decodedToken = jwtDecode(token).user; 
        const id = decodedToken.id;

        const response = await axios.get(`http://localhost:3001/v1/api/instructor/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    getInstructorsData();

    // const getPendingStudents = async () => {
    //   try {
    //     const token = Cookie.get('access_token');
    //     const decodedToken = jwtDecode(token).user; 
    //     const id = decodedToken.id;

    //     const response = await axios.get(`http://localhost:3001/v1/api/booking/instructor/`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     console.log(response.data.data)
    //     setBookings(response.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getPendingStudents();


  }, []);

  return (
      <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <InstructorSidebar/>
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                These are my students
                <ul>
              {students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
              </Col>
          </Row>
      </Container>
  );
}

export default InstructorLessonList;
