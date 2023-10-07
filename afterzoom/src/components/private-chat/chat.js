import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState('');

  const token = Cookies.get('access_token');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/v1/api/instructor/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInstructors(response.data.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();

    const connectToSocketServer = () => {
      const newSocket = io('http://localhost:3001', {query: `token=${token}`});
      newSocket.emit('connection', () => console.log('Connected to server'));
      newSocket.on('private_message', (message) => setMessages(prevMessages => [...prevMessages, message]));
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

  const handleInstructorChange = async (e) => {
    setSelectedInstructorId(e.target.value);
    setMessages([]); // Clear the current messages

    try {
      const response = await axios.get(`http://localhost:3001/v1/api/chat/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
        socket.emit('private_message', {receiverId: selectedInstructorId, message: input});
      }
      setInput('');
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with Instructor</h2>
        <select value={selectedInstructorId} onChange={handleInstructorChange}>
          <option value="">Select an instructor</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
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
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
