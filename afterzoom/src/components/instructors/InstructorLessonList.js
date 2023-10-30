import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar'
import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function formatDateToReadableString(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); // You can customize the format as needed
}

function InstructorLessonList() {
  const [instructor, setInstructor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [studentNames, setStudentNames] = useState({});
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

    const fetchBookings = async () => {
      try {
        const token = getCookie("access_token");
        const decodedToken = jwtDecode(token).user;
        const instructorId = decodedToken.id;

        const bookingResponse = await axios.get(
          `http://localhost:3001/v1/api/booking/instructor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(bookingResponse.data.data);
        console.log(bookingResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchBookings();
  }, []);

  const getStudentName = async (studentId) => {
    try {
      const token = getCookie("access_token");
      const response = await axios.get(
        `http://localhost:3001/v1/api/student/profile/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.name;
    } catch (error) {
      console.error(error);
      return 'N/A'; // Return a default value in case of an error
    }
  };

  const getStudentNamesForBookings = async () => {
    const names = {};
    for (const booking of bookings) {
      names[booking.studentId] = await getStudentName(booking.studentId);
    }
    setStudentNames(names);
  };

  useEffect(() => {
    getStudentNamesForBookings();
  }, [bookings]);

  if (instructor === null || bookings === null) {
    return <div>Loading...</div>;
  }

  // Separate upcoming and past lessons
  const currentDate = new Date();
  const upcomingLessons = [];
  const pastLessons = [];

  for (const booking of bookings) {
    for (const lesson of booking.lessons) {
      const lessonDate = new Date(lesson.date);
      if (lessonDate > currentDate) {
        upcomingLessons.push({ booking, lesson });
      } else {
        pastLessons.push({ booking, lesson });
      }
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={2} sm={2} id="sidebar">
          <InstructorSidebar instructor={instructor} />
        </Col>
        <Col lg={10} md={10} sm={10} id="main-content">
          <h2>This is where all the lessons go</h2>

          <h3>Upcoming Lessons</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Lesson Title</th>
                <th>Lesson Date</th>
                <th>Lesson Description</th>
                <th>Lesson Feedback</th>
              </tr>
            </thead>
            <tbody>
              {upcomingLessons.map(({ booking, lesson }) => (
                <tr key={lesson.id}>
                  <td>{studentNames[booking.studentId]}</td>
                  <td>{lesson.title}</td>
                  <td>{formatDateToReadableString(lesson.date)}</td>
                  <td>{lesson.description}</td>
                  <td>{lesson.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Past Lessons</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Lesson Title</th>
                <th>Lesson Date</th>
                <th>Lesson Description</th>
                <th>Lesson Feedback</th>
              </tr>
            </thead>
            <tbody>
              {pastLessons.map(({ booking, lesson }) => (
                <tr key={lesson.id}>
                  <td>{studentNames[booking.studentId]}</td>
                  <td>{lesson.title}</td>
                  <td>{formatDateToReadableString(lesson.date)}</td>
                  <td>{lesson.description}</td>
                  <td>{lesson.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}

export default InstructorLessonList;
