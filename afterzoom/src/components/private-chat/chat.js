import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  const token = Cookies.get('access_token');

  useEffect(() => {
    // Function to connect to the server
    const connectToSocketServer = () => {
      const newSocket = io('http://localhost:3001', {query: `token=${token}`});

      newSocket.emit('connection', () => {
        console.log('Connected to server');
      });

      newSocket.on('private_message', (message) => {
        // Handle incoming messages and update the messages state
        setMessages(prevMessages => [...prevMessages, message]);
      });

      // Save the socket object in the state
      setSocket(newSocket);
    };

    // Connect to the server only once when the component mounts
    connectToSocketServer();

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.emit('disconnect');
        socket.disconnect();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const sendMessage = () => {
    if (input.trim()) {
      // Emit a message to the server
      if (socket) {
        socket.emit('private_message', {receiverId: "51059993-2d8a-49b1-a160-d9410d1506bf", message: input});
      }
      setInput('');
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with [Friend's Name]</h2>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
            <p><strong>{message.sender}:</strong> {message.text}</p>
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
}

export default ChatPage;
