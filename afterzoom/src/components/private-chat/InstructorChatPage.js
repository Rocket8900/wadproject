// Import your necessary modules

import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InstructorChatPage({instructor}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const token = Cookies.get("access_token");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/v1/api/chat/instructor/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allChat = response.data.data

        let studentProfile = []
        for (let i = 0; i < allChat.length ; i ++) {

          const profile = await axios.get(`http://localhost:3001/v1/api/student/profile/${allChat[i]}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          studentProfile.push(profile.data)
        }
        let finalProfiles = []
        for (let i = 0; i < studentProfile.length; i ++ ){
          finalProfiles.push(studentProfile[i].data)
        }
        console.log(finalProfiles, 1)
        setStudents(finalProfiles);
      } catch (error) {
        console.error("Error fetching students with chat history:", error);
      }
    };

    fetchStudents();

    const connectToSocketServer = () => {
      const newSocket = io("http://localhost:3001", {
        query: `token=${token}`,
      });

      newSocket.emit("connection", () => {
        console.log("Connected to server");
      });

      newSocket.on("private_message", (message) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);
    };

    connectToSocketServer();

    return () => {
      if (socket) {
        // socket.emit('disconnect');
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      if (socket) {
        socket.emit("private_message", {
          receiverId: selectedStudentId,
          message: input,
        });
      }
      setInput("");
    }
  };

  const handleStudentChange = async (e) => {
    console.log(e);
    setSelectedStudentId(e);
    setMessages([]);
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/api/chat/${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.data) {
        console.log(response.data.data.message)
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
        <Col lg={2} md={2} sm={2} id="sidebar">
          <div className="chat-header">
            <h2>Chats</h2>
            <div className="custom-dropdown">
              <div className="custom-dropdown-selected">
                {selectedStudentId
                  ? students.find((student) => student.id === selectedStudentId)
                      .name
                  : "Select a student"}
              </div>
              <div className="custom-dropdown-options">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentChange(student.id)}
                    className="custom-dropdown-option-individual"
                  >
                    {student.name}
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

// import React, { useState, useEffect } from 'react';
// import './ChatPage.css';
// import { io } from 'socket.io-client';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// function InstructorChatPage() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [selectedStudentId, setSelectedStudentId] = useState('');

//   const token = Cookies.get('access_token');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/v1/api/student/list", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setStudents(response.data.data);
//       } catch (error) {
//         console.error("Error fetching students with chat history:", error);
//       }
//     };

//     fetchStudents();

//     const connectToSocketServer = () => {
//       const newSocket = io('http://localhost:3001', {query: `token=${token}`});

//       newSocket.emit('connection', () => {
//         console.log('Connected to server');
//       });

//       newSocket.on('private_message', (message) => {
//         console.log(message)
//         setMessages(prevMessages => [...prevMessages, message]);
//       });

//       setSocket(newSocket);
//     };

//     connectToSocketServer();

//     return () => {
//       if (socket) {
//         socket.emit('disconnect');
//         socket.disconnect();
//       }
//     };
//   }, []);

//   const handleStudentChange = async (e) => {
//     setSelectedStudentId(e.target.value);
//     setMessages([])
//     console.log(e.target.value)
//     // Fetch the chat history with the selected student
//     try {
//       const response = await axios.get(`http://localhost:3001/v1/api/chat/${e.target.value}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log(response.data.data)
//       if (response.data.data) {
//         setMessages(response.data.data.message); // Assuming the chat history is in the data property of the response=
//       }
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

//   const sendMessage = () => {
//     if (input.trim()) {
//       if (socket) {
//         socket.emit('private_message', {receiverId: selectedStudentId, message: input});
//       }
//       setInput('');
//     }
//   };

// /* ... Your existing imports and component setup ... */

// return (
//     <div className="chat-page">
//       <div className="chat-header">
//         <h2>Chat with Student</h2>
//         <select value={selectedStudentId} onChange={handleStudentChange}>
//           <option value="">Select a student</option>
//           {students.map(student => (
//             <option key={student.id} value={student.id}>
//               {student.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.sender.id === 'You' ? 'sent' : 'received'}`}>
//             <p><strong>{message.sender.name}:</strong> {message.text}</p>
//             <p><i>{message.timestamp}</i></p>
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );

// }

// export default InstructorChatPage;
