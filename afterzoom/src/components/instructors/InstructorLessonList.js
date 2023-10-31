import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar'
import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from 'react-bootstrap/Button';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function formatDateToReadableString(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); 
}

function InstructorLessonList() {
  const [selectedLessonFeedback, setSelectedLessonFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  const FeedBackModal = ({ isOpen, setIsOpen, booking }) => {
    const [feedback, setFeedback] = useState(selectedLessonFeedback);
    const handleFeedbackChange = (e) => {
      setFeedback(e.target.value);  
    };

    const handleSaveChanges = async () => {
      try {
        const token = getCookie("access_token");
    
        const response = await axios.patch(
          `http://localhost:3001/v1/api/lesson/${booking.id}`, 
          { feedback },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(booking)
        console.log(booking.id)
        // Check if the request was successful
        if (response.status === 201) {
          window.location.reload();
          setIsOpen(false);
    
          // You can optionally update the UI or show a success message here
        } else {
          console.log(response)
          // Handle the case where the request was not successful
          console.error("Failed to update feedback");
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3>Edit the feedback for this lesson</h3>
                <textarea
                  type="textarea"
                  value={feedback}
                  onChange={handleFeedbackChange}
                  className="w-full p-2 mb-6 rounded border"
                textarea/>
                <div className="flex gap-2">
                  <button onClick={() => setIsOpen(false)} className="py-2 rounded">
                    Nah, go back
                  </button>
                  <button onClick={handleSaveChanges} className="py-2 rounded">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

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
      return 'N/A'; 
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
                <th>Modify Feedback</th>
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
                  <td></td>
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
                <th>Edit Feedback</th>
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
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedLessonFeedback(lesson.feedback);
                        setIsOpen(true);
                      }}
                    >
                      Edit Feedback
                    </Button>{' '}
                  </td>
                  <FeedBackModal isOpen={isOpen} setIsOpen={setIsOpen} booking={lesson} />
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
