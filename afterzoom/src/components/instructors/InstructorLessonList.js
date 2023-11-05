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
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import CreatingLessonContent from './CreatingLessonContent';
import styles from './lessonlist.module.css';
import ThreeDotsWave from "../loader/loader";




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
  const [anchor, setAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedLessonFeedback, setSelectedLessonFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [studentNames, setStudentNames] = useState({});
  const { id } = useParams();
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [pastLessons, setpastLessons] = useState([]);

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
        const currentDate = new Date();
        let upLessons = []
        let backLessons = []
        for (const booking of bookingResponse.data.data) {
          for (const lesson of booking.lessons) {
            const lessonDate = new Date(lesson.date);
            if (lessonDate > currentDate) {
              upLessons.push({ booking, lesson });
            } else {
              backLessons.push({ booking, lesson });
            }
          }
        }
        setUpcomingLessons(upLessons);
        setpastLessons(backLessons);
        setBookings(bookingResponse.data.data);
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


        // Check if the request was successful
        if (response.status === 201) {
          window.location.reload();
          setIsOpen(false);
    
          // You can optionally update the UI or show a success message here
        } else {

          // Handle the case where the request was not successful
          console.error("Failed to update feedback");
        }
      } catch (error) {
        console.error(error);
      }
    };


    return (
      <div>
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

      </div>
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

  // useEffect(() => {
  //   updateUpcomingLessons();
  // }, []);

  useEffect(() => {
    getStudentNamesForBookings();
  }, [bookings]);




  // weather forecast API (max 1000 calls per day)
  // const fetchWeatherForecast = async (latitude, longitude, date) => {
  //   try {
  //     // Call the OpenWeatherMap API to get weather data
  //     const apiKey = "5edb4e64fd6cb6634cd6edb3a99e653d";
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&dt=${date}&appid=${apiKey}`
  //     );
  
  //     // Extract the relevant weather data from the API response

  //     const weatherData = response.data;
  
  //     return weatherData;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // }



  // const updateUpcomingLessons = async () => {
  //   try {  
  //     const updatedUpcomingLessons = [];

  //     for (const booking of bookings) {
  //       for (const lesson of booking.lessons) {
  //         if (new Date(lesson.date) > new Date()) {
  //           const weatherData = await fetchWeatherForecast(
  //             "1.3521", // Replace with actual latitude from your lesson data
  //             "103.8198", // Replace with actual longitude from your lesson data
  //             lesson.date // Date of the lesson
  //           );
  
  //           updatedUpcomingLessons.push({
  //             booking,
  //             lesson: {
  //               ...lesson,
  //               forecastedWeather: weatherData, // Add the weather forecast to the lesson
  //             },
  //           });
  //         }
  //       }
  //     }
  
  //     // Set the upcomingLessons with the updated lessons
  //     setUpcomingLessons(updatedUpcomingLessons);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  

  const handleClosePopup = () => {
    setOpen(false); // Close the pop-up
  };

  if (instructor === null || bookings === null) {
    return <ThreeDotsWave/>;
  }


  return (
    <div className={styles.body}>
      <Row>
        <Col lg={2} md={2} sm={2} id={styles.sidebar}>
          <InstructorSidebar instructor={instructor} />
        </Col>
        <Col lg={10} md={10} sm={10} id={styles["main-content"]}>
          <h1>Your bookings overview</h1>

          <div className={styles.container1}>
            <h3>Upcoming Lessons</h3>
            <table className={styles["rwd-table"]}>
              <thead>
                <tr>
                  <th>STUDENT NAME</th>
                  <th>LESSON TITLE</th>
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>FEEDBACK</th>
                </tr>
              </thead>
              <tbody>
                {upcomingLessons.map(({ booking, lesson }) => (
                  <tr key={lesson.id}>
                    <td data-th="Student Name">{studentNames[booking.studentId] || '-'}</td>
                    <td data-th="Lesson Title">{lesson.title || 'Untitled'}</td>
                    <td data-th="Date">{formatDateToReadableString(lesson.date) || '-'}</td>
                    <td data-th="Description">{lesson.description || '-'}</td>
                    <td data-th="Feedback">{lesson.feedback || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={styles.container2}>
            <h3>Past Lessons</h3>
            <table className={styles["rwd-table"]}>
              <thead>
                <tr>
                  <th>STUDENT NAME</th>
                  <th>LESSON TITLE</th>
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>FEEDBACK</th>
                  {/* <th>Edit Feedback</th> */}
                </tr>
              </thead>
              <tbody>
                {pastLessons.map(({ booking, lesson }) => (
                  <tr key={lesson.id}>
                    <td data-th="Student Name">{studentNames[booking.studentId] || '-'}</td>
                    <td data-th="Lesson Title">{lesson.title || 'Untitled'}</td>
                    <td data-th="Date">{formatDateToReadableString(lesson.date) || '-'}</td>
                    <td data-th="Description">{lesson.description || '-'}</td>
                    <td data-th="Feedback" className="feedback">{lesson.feedback || '-'}</td>
                    <td>
                      {isOpen ? (
                        <FeedBackModal isOpen={isOpen} setIsOpen={setIsOpen} booking={lesson} />
                      ) : (
                        <div>
                          <Button
                            variant="outline-success"
                            onClick={() => setIsOpen(true)}
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </td>

                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        <div>
        <StyledButton ref={setAnchor} onClick={() => setOpen((o) => !o)} type="button">
          Add New Lesson
        </StyledButton>
        <BasePopup anchor={anchor} open={open} withTransition>
          {(props) => (
            <PopAnimation {...props}>
              <PopupBody>
                <CreatingLessonContent studentNames={studentNames} bookings={bookings} onClosePopup={handleClosePopup}/>

              </PopupBody>
            </PopAnimation>
          )}
        </BasePopup>
        </div>

        </Col>
      </Row>


    </div>
  );
}

export default InstructorLessonList;


function Animated(props) {
  const { requestOpen, onEnter, onExited, children, className } = props;

  React.useEffect(() => {
    if (requestOpen) {
      onEnter();
    }
  }, [onEnter, requestOpen]);

  const handleAnimationEnd = React.useCallback(() => {
    if (!requestOpen) {
      onExited();
    }
  }, [onExited, requestOpen]);

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={className + (requestOpen ? ' open' : ' close')}
    >
      {children}
    </div>
  );
}

Animated.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  requestOpen: PropTypes.bool.isRequired,
};

const PopAnimation = styled(Animated)`
  @keyframes open-animation {
    0% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }

    50% {
      opacity: 1;
      transform: translateY(4px) scale(1.05);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes close-animation {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    50% {
      opacity: 1;
      transform: translateY(4px) scale(1.05);
    }

    100% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
  }

  &.open {
    animation: open-animation 0.4s ease-in forwards;
  }

  &.close {
    animation: close-animation 0.4s ease-in forwards;
  }
`;

const grey = {
  50: '#f6f8fa',
  200: '#d0d7de',
  500: '#6e7781',
  700: '#424a53',
  900: '#24292f',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 0.5rem 1rem;
  margin: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  min-height: 3rem;
  position: fixed;
  transform: translate(-55vw, -90vh);
  z-index: 9999;
    
`,
);

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const StyledButton = styled('button')(
  ({ theme }) => `

  position: fixed;
  bottom: 16px;
  right: 16px;
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);