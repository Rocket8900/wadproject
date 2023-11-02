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
  const [messageCounter, setMessageCounter] = useState(0);
  const [instructorImages, setInstructorImages] = useState({});


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
          instructorProfile.push(profile.data);
        }
        let finalProfiles = [];
        for (let i = 0; i < instructorProfile.length; i++) {
        let profileData = instructorProfile[i].data;

        if (profileData.dp !== null) {
            try {
            const url = await axios.get(`http://localhost:3001/v1/api/s3/instructor/single/${profileData.id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            let imgUrl = "./Screenshot 2023-11-03 at 4.14.19 AM.png";
            if (url && url.data) {
                imgUrl = url.data;
            }
            profileData['s3ImageUrl'] = imgUrl;  // Add the S3 URL to the profile data

            } catch (error) {
            console.error("Error fetching instructor image:", error);
            profileData['s3ImageUrl'] = "./Screenshot 2023-11-03 at 4.14.19 AM.png";  // default image in case of error
            }
        }
        
        finalProfiles.push(profileData);
        }
        console.log(finalProfiles);
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
      if (socket) socket.disconnect();
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
        <Col lg={2} md={2} sm={2} id="sidebar">
          <div className="chat-header">
            <h2>Chats</h2>
            <div className="custom-dropdown">
              <div className="custom-dropdown-options">
              {instructors.map((instructor) => (
                <div
                    key={instructor.id}
                    onClick={() => {
                        handleInstructorChange(instructor.id);
                        // Assuming you no longer need the fetchInstructorImage function here since you're loading all images initially
                    }}
                    className="custom-dropdown-option-individual"
                >
                    <img src={instructorImages[instructor.id]} alt={`Image of ${instructor.name}`} />
                    {instructor.name}
                </div>
            ))}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={10} md={10} sm={10} id="main-content">
          <div className="chat-page">
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
