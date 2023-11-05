import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function StudentChatPage({student}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [messageCounter, setMessageCounter] = useState(0);



  const token = Cookies.get("access_token");
  
  useEffect(() => {
    if (messageCounter > 0) {
        setTimeout(() => {
            handleInstructorChange(selectedInstructorId);
        }, 1000); // 1 seconds delay
    }

    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/v1/api/chat/student/list",  // Assuming the endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allChat = response.data.data;

        let instructorProfile = [];
        for (let i = 0; i < allChat.length; i++) {
          const profile = await axios.get(`http://localhost:3001/v1/api/instructor/profile/${allChat[i]}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          let profileDetails = profile.data;
          if (profileDetails.data.dp == null) {
            profileDetails.data.dp = "/Screenshot 2023-11-03 at 4.14.19 AM.png"
          } else {
            profileDetails.data.dp = (await axios.get(`http://localhost:3001/v1/api/s3/instructor/single/${profileDetails.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })).data.data
          }
          instructorProfile.push(profileDetails);
        }
        let finalProfiles = [];
        for (let i = 0; i < instructorProfile.length; i++) {
          finalProfiles.push(instructorProfile[i].data);
        }

        setInstructors(finalProfiles);
      } catch (error) {
        console.error("Error fetching instructors with chat history:", error);
      }
    };




    fetchInstructors();


    

    const connectToSocketServer = () => {
      const newSocket = io("http://localhost:3001", {
        query: `token=${token}`,
      });
      newSocket.emit("connection");
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
          receiverId: selectedInstructorId,
          message: input,
        });
      }
      setInput("");
      setMessageCounter((prev) => prev + 1);
    }
  };

  const handleInstructorChange = async (e) => {
    setSelectedInstructorId(e);
    setMessages([]);
    const instructor = instructors.find(inst => inst.id === e);
    setSelectedInstructor(instructor);
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/api/chat/${e}`,  // Assuming this endpoint gets the chat history
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data) {
        setMessages(response.data.data.message);
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
      <Col lg={2} md={2} sm={2} id="sidebar" style={{background: 'linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)',
}}>
            <div className="chat-header">
                <h2>Chats</h2>
                <div className="custom-dropdown">
                    <div className="custom-dropdown-options">
                    {instructors.map((instructor) => (
                        <button 
                            key={instructor.id}
                            onClick={() => {
                                handleInstructorChange(instructor.id);
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
                                src={instructor.dp} 
                                alt={`Image of ${instructor.name}`} 
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }} 
                            />
                            <span style={{
                                fontSize: 'small',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 'calc(100% - 50px)'  // considering image width and margin
                            }}>
                                {instructor.name}
                            </span>
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </Col>
        <Col lg={10} md={10} sm={10} id="main-content">
          <div className="chat-page">
            {selectedInstructor && (
                <div className="recipient-header">
                    <img 
                        src={selectedInstructor.dp} 
                        alt={`Image of ${selectedInstructor.name}`} 
                    />
                    <h3>{selectedInstructor.name}</h3>
                </div>
            )}
            <div className="chat-window">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender.id === student.id ? "sent" : "received"
                  }`}
                >
                  {message.sender.id === student.id ? (
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

export default StudentChatPage;
