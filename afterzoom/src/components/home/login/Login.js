import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import carImage from './car.jpg'; // Import car image
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyles = {
    backgroundColor: 'black', 
    color: 'white', 
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
    border: '1px solid #ccc',
    width: '75%',
  };

  const loginStyles = { 
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    width: '33%',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleStudentLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/v1/api/student/login', {
        email,
        password,
      }, {withCredentials: true});
  
      // Extract the access_token from the cookie
      const token = getCookie('access_token');
  
      // Configure Axios to include the Authorization header for subsequent requests
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      // Handle successful student login here
      console.log(response.data);


      // Redirect to the student dashboard
      navigate('/student-dashboard');
  
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  
  // Helper function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  const handleInstructorLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/v1/api/instructor/login', {
        email,
        password,
      }, {withCredentials: true})

      const token = getCookie('access_token');
  
      // Configure Axios to include the Authorization header for subsequent requests
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      // Handle successful instructor login
      console.log(response.data);
      // Redirect to the instructor dashboard
      navigate('/instructor-dashboard');

    } catch (error) {
      // Handle login errors here (e.g. show an error message to the user)
      console.error(error);
    }
  };
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        {/* <Modal.Title>Login page</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
      <div className="App" style={{ backgroundColor: 'white', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: 'black' }}>Log-in</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email"
          style={inputStyles}
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyles}
          value={password}
          onChange={handlePasswordChange}
        />
        </div>
        <div >
          <Button variant="primary" type="button" onClick={handleStudentLogin} style={{ marginRight: '10px' }}>
            Student Login
          </Button>
          <Button variant="primary" type="button" onClick={handleInstructorLogin}>
            Instructor Login
          </Button>
        </div>
      <div style={{ position: 'relative', marginTop: '100px' }}>
        <hr style={{ border: '2px solid black', margin: '30px 0' }} /> {/* Thick black line with margin */}
        <img
          src={carImage}
          alt="Car"
          style={{
            position: 'absolute',
            bottom: '10px', // Lower the car image
            right: '20px', // Adjust the horizontal position
            width: '100px', // Set the width of the car image
          }}
        />
      </div>

        <div style={{ color: 'black', position: 'absolute', bottom: '10px', right: '10px' }}>
          <a href="/registration">Have not registered before? Click Here</a>
        </div>
      
    </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
