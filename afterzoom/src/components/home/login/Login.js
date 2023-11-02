import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import carImage from './car.jpg'; // Import car image
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion as m } from 'framer-motion'
import { Formik, Field, Form, ErrorMessage } from 'formik'; 

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

  const btn ={
    hover: {
      scale:[null, 1.1, 1.05],
      transition:{
        duration: .2
      },
    },
    tap:{
      scale: .98,
    }    
  }

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
      const token = getCookie('access_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      navigate('/student-dashboard');
  
    } catch (error) {
      console.error(error);
    }
  };

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
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      navigate('/instructor-dashboard');

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} dialogClassName="modal-lg modal-dialog-centered rounded" >
      <div className="loginModal"
        style={{ backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "35px", minHeight: "50vh"}}
      >
        <m.main
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          className='loginForm-box '
        >
<Formik>
  <Form>
    <h1 className="loginTitle">Login</h1>
<div className="input-container" style={{marginBottom:"20px"}}>
        <label htmlFor="email">
        Email
        </label>
        <Field 
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="input-container" style={{marginBottom:"20px"}}>
        <label htmlFor="password">
        Password
        </label>
        <Field 
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>


        <m.div 
              className="login-btn-container"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:.5}}
              style={{marginTop: "40px"}}
            >
              <m.button 
                // style={{minHeight:"3.8rem", padding:"0"}}
                className='next-btn' 
                type='button' 
                variants={btn}
                whileHover='hover'
                whileTap='tap'
                onClick={handleStudentLogin}
              >Student Login</m.button>

              <m.button 
                // style={{minHeight:"3.5rem", padding:"0 10px 0 10px"}}
                className='next-btn' 
                type='submit'
                variants={btn}
                whileHover='hover'
                whileTap='tap'
                onClick={handleInstructorLogin}
              > Instructor Login</m.button>
            </m.div>
            </Form>
            </Formik>
        </m.main>

      </div>
    </Modal>
  );
};

export default LoginModal;



// <Modal.Header closeButton>

//       </Modal.Header>
//       <Modal.Body>
//       <div className="App" style={{ backgroundColor: 'white', textAlign: 'center', padding: '20px' }}>
//       <h1 style={{ color: 'black' }}>Log-in</h1>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <input
//           type="email"
//           placeholder="Email"
//           style={inputStyles}
//           value={email}
//           onChange={handleEmailChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           style={inputStyles}
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         </div>
//         <div >
//           <Button variant="primary" type="button" onClick={handleStudentLogin} style={{ marginRight: '10px' }}>
//             Student Login
//           </Button>
//           <Button variant="primary" type="button" onClick={handleInstructorLogin}>
//             Instructor Login
//           </Button>
//         </div>
//       <div style={{ position: 'relative', marginTop: '100px' }}>
//         <hr style={{ border: '2px solid black', margin: '30px 0' }} /> 
//         <img
//           src={carImage}
//           alt="Car"
//           style={{
//             position: 'absolute',
//             bottom: '10px', 
//             right: '20px', 
//             width: '100px', 
//           }}
//         />
//       </div>

//         <div style={{ color: 'black', position: 'absolute', bottom: '10px', right: '10px' }}>
//           <a href="/registration">Have not registered before? Click Here</a>
//         </div>
      
//     </div>
//       </Modal.Body>