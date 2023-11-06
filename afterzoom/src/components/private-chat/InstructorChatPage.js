// Import your necessary modules

import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BASE_URL from "../apiConfig";


function InstructorChatPage({instructor}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messageCounter, setMessageCounter] = useState(0);

  const token = Cookies.get("access_token");
  useEffect(() => {
    if (messageCounter > 0) {
      setTimeout(() => {
          handleStudentChange(selectedStudentId);
      }, 1000); // 1 seconds delay
  }

    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/v1/api/chat/instructor/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let allChat = response.data.data
        for (let index = 0; index < instructor.students.length; index++) {
          const studentId = instructor.students[index].id;
          if (!allChat.includes(studentId)){
            allChat.push(studentId)
          }
        }
        let studentProfile = []
        for (let i = 0; i < allChat.length ; i ++) {

          const profile = await axios.get(`${BASE_URL}/v1/api/student/profile/${allChat[i]}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          let profileDetails = profile.data;
          if (profileDetails.data.selfie == null) {
            profileDetails.data.selfie = "/Screenshot 2023-11-03 at 4.14.19 AM.png"
          } else {
            profileDetails.data.selfie = (await axios.get(`${BASE_URL}/v1/api/s3/student/single/${profileDetails.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })).data.data
          }
          studentProfile.push(profileDetails)
        }
        let finalProfiles = []
        for (let i = 0; i < studentProfile.length; i ++ ){
          finalProfiles.push(studentProfile[i].data)
        }

        setStudents(finalProfiles);
      } catch (error) {
        console.error("Error fetching students with chat history:", error);
      }
    };

    fetchStudents();

    const connectToSocketServer = () => {
      const newSocket = io(`${BASE_URL}`, {
        query: `token=${token}`,
      });

      newSocket.emit("connection", () => {

      });

      newSocket.on("private_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);
    };

    connectToSocketServer();

    return () => {
      if (socket) {
        socket.emit('bye-bye');
        socket.disconnect();
      }
    };
  }, [messageCounter]);

  const sendMessage = () => {
    if (input.trim()) {
      if (socket) {
        socket.emit("private_message", {
          receiverId: selectedStudentId,
          message: input,
        });
      }
      setInput("");
      setMessageCounter((prev) => prev + 1);
    }

  };

  const handleStudentChange = async (e) => {
    setSelectedStudentId(e);
    setMessages([]);
    const student = students.find(inst => inst.id === e);
    setSelectedStudent(student);
    try {
      const response = await axios.get(
        `${BASE_URL}/v1/api/chat/${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data) {
        setMessages(response.data.data.message); // Assuming the chat history is in the data property of the response=
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  function timestampToDate(timestamp) {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
  

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
          <div className="chat-header">
            <h2>Chats</h2>
            <div className="custom-dropdown">
              <div className="custom-dropdown-options">
              {students.map((student) => (
                        <button 
                            key={student.id}
                            onClick={() => {
                                handleStudentChange(student.id);
                            }}
                            className="btn btn-light d-flex align-items-center mb-3 w-100"
                            style={{
                                borderRadius: '15px',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef2f7'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <img 
                                src={student.selfie} 
                                alt={`Image of ${student.name}`} 
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }} 
                            />
                            <span style={{
                                fontSize: 'small',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 'calc(100% - 50px)'  // considering image width and margin
                            }}>
                                {student.name}
                            </span>
                        </button>
                    ))}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={10} md={10} sm={10} xs={10} id="main-content">
          <div className="chat-page">

          {selectedStudent && (
                <div className="recipient-header">
                    <img 
                        src={selectedStudent.selfie} 
                        alt={`Image of ${selectedStudent.name}`} 
                    />
                    <h3>{selectedStudent.name}</h3>
                </div>
            )}
            <div className="chat-window">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender.id === instructor.id ? "sent" : "received"
                  }`}
                >
                  {message.sender.id === instructor.id ? (
                    <>
                      <p>
                        <strong>You:</strong> {message.text}
                      </p>
                      <p>
                        <i style={{fontSize:"0.8vw"}}>{timestampToDate(message.timestamp)}</i>
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>{message.sender.name}:</strong> {message.text}
                      </p>
                      <p>
                        <i style={{fontSize:"0.8vw"}}>{timestampToDate(message.timestamp)}</i>
                      </p>
                    </>
                  )}
                </div>
              ))}
              <div className="chat-input">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default InstructorChatPage;

