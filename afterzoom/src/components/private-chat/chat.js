import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from '../dashboards/sidebar/instructorSidebar'

function ChatWithStudentPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const token = Cookies.get('access_token');

  useEffect(() => {
    // Fetch the list of students
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/v1/api/student/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    // Fetch the list of student chats
    const fetchStudentChats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/v1/api/chat/instructor/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const studentIdsFromChats = response.data.data.map(item => item.studentId);
        
        // Filter the students to include only those with IDs in studentIdsFromChats
        const filteredStudents = students.filter(student => studentIdsFromChats.includes(student.id));
        
        // Update the students state with the filtered student data
        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching students with chat history:", error);
      }
    };

    // Fetch the list of students and student chats
    fetchStudents();
    fetchStudentChats();

    // Connect to the socket server
    const newSocket = io('http://localhost:3001', { query: `token=${token}` });

    newSocket.emit('connection', () => {
      console.log('Connected to server');
    });

    newSocket.on('private_message', (message) => {
      console.log(message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Cleanup socket connection
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [token, students]); // Include token as a dependency

  const handleStudentChange = async (e) => {
    setSelectedStudentId(e.target.value);
    setMessages([]);
    console.log(e.target.value);
    // Fetch the chat history with the selected student
    try {
      const response = await axios.get(`http://localhost:3001/v1/api/chat/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data);
      if (response.data.data) {
        setMessages(response.data.data.message);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      if (socket) {
        socket.emit('private_message', { receiverId: selectedStudentId, message: input });
      }
      setInput('');
    }
  };

  return (
    // <div className="chat-page">
    //   <div className="chat-header">
    //     <h2>Chat with Student</h2>
    //     <select value={selectedStudentId} onChange={handleStudentChange}>
    //       <option value="">Select a student</option>
    //       {students.map(student => (
    //         <option key={student.id} value={student.id}>
    //           {student.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <div className="chat-window">
    //     {messages.map((message, index) => (
    //       <div key={index} className={`message ${message.sender.id === 'You' ? 'sent' : 'received'}`}>
    //         <p><strong>{message.sender.name}:</strong> {message.text}</p>
    //         <p><i>{message.timestamp}</i></p>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="chat-input">
    //     <input
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       placeholder="Type a message..."
    //     />
    //     <button onClick={sendMessage}>Send</button>
    //   </div>
    // </div>

      <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                  <Sidebar  />
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                 hi
              </Col>
          </Row>
      </Container>
  );
}

export default ChatWithStudentPage;
