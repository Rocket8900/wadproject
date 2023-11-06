import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar';
import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from './studentlist.module.css';
import ThreeDotsWave from "../loader/loader";
import BASE_URL from "../apiConfig";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function InstructorLessonList() {
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [studentProfiles, setStudentProfiles] = useState([]);

  useEffect(() => {
    const getInstructorsData = async () => {
      try {
        const token = Cookie.get('access_token');
        const decodedToken = jwtDecode(token).user;
        const id = decodedToken.id;

        const response = await axios.get(`${BASE_URL}/v1/api/instructor/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInstructor(response.data.data)
        setStudents(response.data.data.students);
      } catch (error) {
        console.error(error);
      }
    };
    getInstructorsData();

    const getPendingStudents = async () => {
      try {
        const token = Cookie.get('access_token');
        const decodedToken = jwtDecode(token).user;
        const id = decodedToken.id;

        const response = await axios.get(`${BASE_URL}/v1/api/booking/instructor`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter bookings with PENDING status
        const filteredPendingBookings = response.data.data.filter((booking) => booking.status === "PENDING");
        setPendingBookings(filteredPendingBookings);
      } catch (error) {
        console.error(error);
      }
    };
    getPendingStudents();
  }, []);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      const token = Cookie.get('access_token');
      const profilePromises = pendingBookings.map(async (booking) => {
        try {
          const response = await axios.get(`${BASE_URL}/v1/api/student/profile/${booking.studentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });


          return response.data.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const profiles = await Promise.all(profilePromises);
      setStudentProfiles(profiles);
    };

    fetchStudentProfiles();
  }, [pendingBookings]);

  const acceptBooking = async (bookingId) => {
    try {
      const token = Cookie.get('access_token');
      await axios.patch(`${BASE_URL}/v1/api/booking/${bookingId}`, {
        status: "ACCEPTED",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the accepted booking from pendingBookings
      setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));
      setStudentProfiles();


      // Handle the response or update your UI as needed
      window.location.reload();

    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const rejectBooking = async (bookingId) => {
    try {
      const token = Cookie.get('access_token');
      await axios.patch(`${BASE_URL}/v1/api/booking/${bookingId}`, {
        status: "REJECTED",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the accepted booking from pendingBookings
      setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));

      // Handle the response or update your UI as needed

    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  if (instructor === null || students === null) {
    return <ThreeDotsWave/>;
  }

  let count = 0

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
          <InstructorSidebar instructor={instructor} />
        </Col>
        <Col lg={10} md={10} sm={10} xs={10} id={styles["main-content"]}>
          <h1>Your Students</h1>

          <div className={styles.container1}>
            <h3>Current Students</h3>
            <table className={styles["rwd-table"]}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>TYPE</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td data-th="Index">{++count}</td>
                    <td data-th="Student Name">{student.name || '-'}</td>
                    <td data-th="Email">{student.email || '-'}</td>
                    <td data-th="Type of transmission">{student.type || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={styles.container1}>
            <h3>Prospective Students</h3>
            <table className={styles["rwd-table"]}>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>TYPE</th>
                  <th>ACTION TO TAKE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pendingBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td data-th="Student Name">{studentProfiles[index] ? studentProfiles[index].name : 'Loading...'}</td>
                    <td data-th="Email">{studentProfiles[index] ? studentProfiles[index].email : 'Loading...'}</td>
                    <td data-th="Type">{studentProfiles[index] ? studentProfiles[index].type : 'Loading...'}</td>
                    <td data-th="Action to take" className={styles.actions}>
                      <Button 
                      variant="success" className='accept'
                      onClick={() => acceptBooking(booking.id)}>
                        Accept
                      </Button>{' '}

                      <Button 
                      variant="danger" className='decline'
                      onClick={() => rejectBooking(booking.id)}>
                        Reject
                      </Button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
}

export default InstructorLessonList;
