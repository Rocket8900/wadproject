import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';

function ChatWithStudentPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const token = Cookies.get('access_token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/v1/api/student/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students with chat history:", error);
      }
    };

    fetchStudents();

    const connectToSocketServer = () => {
      const newSocket = io('http://localhost:3001', {query: `token=${token}`});

      newSocket.emit('connection', () => {
        console.log('Connected to server');
      });

      newSocket.on('private_message', (message) => {
        console.log(message)
        setMessages(prevMessages => [...prevMessages, message]);
      });

      setSocket(newSocket);
    };

    connectToSocketServer();

    return () => {
      if (socket) {
        socket.emit('disconnect');
        socket.disconnect();
      }
    };
  }, []);

  const handleStudentChange = async (e) => {
    setSelectedStudentId(e.target.value);
    setMessages([])
    console.log(e.target.value)
    // Fetch the chat history with the selected student
    try {
      const response = await axios.get(`http://localhost:3001/v1/api/chat/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data)
      if (response.data.data) {
        setMessages(response.data.data.message); // Assuming the chat history is in the data property of the response=
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  


  const sendMessage = () => {
    if (input.trim()) {
      if (socket) {
        socket.emit('private_message', {receiverId: selectedStudentId, message: input});
      }
      setInput('');
    }
  };

/* ... Your existing imports and component setup ... */

return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with Student</h2>
        <select value={selectedStudentId} onChange={handleStudentChange}>
          <option value="">Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.id === 'You' ? 'sent' : 'received'}`}>
            <p><strong>{message.sender.name}:</strong> {message.text}</p>
            <p><i>{message.timestamp}</i></p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
  
  /* ... Rest of your component ... */
  
}

export default ChatWithStudentPage;
