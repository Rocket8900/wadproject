import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
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
  const [instructors, setInstructors] = useState({});

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
            // console.log(bookingsResponse.data.data)
            setBookings(bookingsResponse.data.data);


        } catch (error) {
            // console.error(error);
        }
    };

    fetchData(); 
    
}, []); 

useEffect(() => {
    const fetchInstructorNames = async () => {
      const instructorDetails  = {};
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
        //   console.log("instructor details")
        //   console.log(instructorResponse.data.data)
        //   const instructorName = instructorResponse.data.data.name; // Adjust the property based on the API response structure
          instructorDetails [booking.instructorId] = instructorResponse.data.data;
        } catch (error) {
        //   console.error(error);
          instructorDetails[booking.instructorId] = "Instructor Name Not Found";
        }
      }
      setInstructors(instructorDetails);
    };

    if (bookings.length > 0) {
      fetchInstructorNames();
    //   console.log(instructorNames)
    }
  }, [bookings]);

  // Create a Set to store unique instructor IDs
  const uniqueInstructorIds = new Set();

  // Filter out unique instructor details
  const uniqueInstructors = bookings.reduce((unique, booking) => {
    if (!uniqueInstructorIds.has(booking.instructorId) && booking.status === 'ACCEPTED' && instructors[booking.instructorId]) {
      uniqueInstructorIds.add(booking.instructorId);
      unique.push(instructors[booking.instructorId]);
    }
    return unique;
  }, []);

if (bookings === null || student === null) {
    return <div>Loading...</div>;
}

    return (
        <div className={styles.body}>
            <div className="row">
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student} />
                </Col>

                <Col lg={10} md={10} sm={10} id={styles["main-content"]}>
                    <h1>Your lessons at a glance</h1>
                    <div className={styles.container}>
                        <h3>Your Upcoming Lessons</h3>
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
                                            <td data-th="Instructor">{instructors[booking.instructorId] ? instructors[booking.instructorId].name || '-' : '-'}</td>
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

                    <div className={styles.container}>
                        <h3>Your Instructors</h3>
                        <table className={styles["rwd-table"]}>
                            <thead>
                            <tr>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>GENDER</th>
                                <th>AFFILIATION</th>
                                <th>EMAIL</th>
                                <th>CARMODEL</th>
                            </tr>
                            </thead>

                            <tbody>
                            {uniqueInstructors.map((instructor) => (
                                <tr key={instructor ? instructor.id || '-':'-'}>
                                    <td data-th="Instructor Name">{instructor ? instructor.name || '-':'-'}</td>
                                    <td data-th="Age">{instructor ? instructor.age || '-':'-'}</td>
                                    <td data-th="Gender">{instructor ? instructor.gender || '-':'-'}</td>
                                    <td data-th="Affiliation">{instructor ? instructor.affiliation || '-':'-'}</td>
                                    <td data-th="Email">{instructor ? instructor.email || '-':'-'}</td>
                                    <td data-th="Car Model">{instructor ? instructor.carModel || '-':'-'}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </div>
        </div>
        
    )
}

export default StudentView