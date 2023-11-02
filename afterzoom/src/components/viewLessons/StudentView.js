import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import styles from './student.module.css'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to format a date string to 'hh:mm' format
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const isoString = date.toISOString();
  return isoString.replace('T', ' ').slice(0, 16);
}

  

export function StudentView () {
    
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [instructorNames, setInstructorNames] = useState({});

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


            const bookingsResponse = await axios.get(
                `http://localhost:3001/v1/api/booking/student/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(bookingsResponse.data.data)
            setBookings(bookingsResponse.data.data);


        } catch (error) {
            console.error(error);
        }
    };

    fetchData(); 
    
}, []); 

useEffect(() => {
    const fetchInstructorNames = async () => {
      const names = {};
      for (const booking of bookings) {
        try {
          const token = getCookie("access_token");
          const instructorResponse = await axios.get(
              `http://localhost:3001/v1/api/instructor/profile/${booking.instructorId}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          console.log("instructor details")
          console.log(instructorResponse.data.data)
          const instructorName = instructorResponse.data.data.name; // Adjust the property based on the API response structure
          names[booking.instructorId] = instructorName;
        } catch (error) {
          console.error(error);
          names[booking.instructorId] = "Instructor Name Not Found";
        }
      }
      setInstructorNames(names);
    };

    if (bookings.length > 0) {
      fetchInstructorNames();
      console.log(instructorNames)
    }
  }, [bookings]);

if (bookings === null || student === null) {
    return <div>Loading...</div>;
}

    return (
        <div className={styles.body}>
            <Row>
                <Col lg={2} md={2} sm={2} id={styles.sidebar}>
                    <Sidebar student={student} />
                </Col>

                <Col lg={10} md={10} sm={10} id={styles["main-content"]}>
                    <h1>Your lessons at a glance</h1>
                    <div className={styles.container}>
                        <table className={styles["rwd-table"]}>
                            <thead>
                            <tr>
                                <th>LESSON</th>
                                <th>INSTRUCTOR</th>
                                <th>DETAILS</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>FEEDBACK</th>
                            </tr>
                            </thead>

                            <tbody>
                                {bookings.map((booking) => (
                                    booking.lessons.map((lesson) => (
                                        <tr key={lesson.id}>
                                            <td data-th="Lesson">{lesson.title || 'Untitled'}</td>
                                            <td data-th="Instructor">{instructorNames[booking.instructorId] || '-'}</td>
                                            <td data-th="Description">{lesson.description || '-'}</td>
                                            <td data-th="Date">{formatDateTime(lesson.date) || '-'}</td>
                                            <td data-th="Status">{booking.status || '-'}</td>
                                            <td data-th="Feedback">{lesson.feedback || '-'}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </div>
        
    )
}

export default StudentView