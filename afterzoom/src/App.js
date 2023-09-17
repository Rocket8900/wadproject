// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import carImage from './car.jpg'; // Import car image

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyles = {
    backgroundColor: 'black', // Set the input background color to black
    color: 'white', // Set the text color to white
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
    border: '1px solid #ccc',
    width: '33%',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
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
        <button
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '10px 20px',
            margin: '10px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            width: '34.5%',
          }}
        >
          Sign In
        </button>
      </div>

      <div style={{ position: 'relative' }}>
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
          <a href="#">Have not registered before? Click Here</a>
        </div>
      
    </div>
  );
}

export default App;
