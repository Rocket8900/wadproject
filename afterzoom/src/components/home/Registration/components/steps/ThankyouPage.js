import React, { useEffect } from 'react';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import '../../../Home.css';
import Tick from '../../assets/icon-thank-you.svg';
import BASE_URL from "../../../../apiConfig" 

export default function ThankyouPage({ goto, values }) {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  useEffect(() => {
    if (values.type === 'student') {
      const formData = values;
      axios.post(`${BASE_URL}/v1/api/student/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            // Handle success if needed
          } else {
            // Handle other cases
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      const formData = values;
      axios.post(`${BASE_URL}/v1/api/instructor/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            // Handle success if needed
          } else {
            console.error('Error submitting form data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='thankyou-form'>
      <m.div
        variants={container}
        initial='hidden'
        animate='show'
      >
        <img src={Tick} alt="tick mark" />
        <h1>Thank you!</h1>
        <p>Thanks for signing up! You may now login using your new account</p>
      </m.div>
    </div>
  );
}
