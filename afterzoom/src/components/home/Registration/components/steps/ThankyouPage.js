import '../../../Home.css'

import Tick from '../../assets/icon-thank-you.svg'
import { useEffect } from 'react'
import axios from 'axios';

// framer motion
import { motion as m } from 'framer-motion'

export default function ThankyouPage({goto, values}) {
  const container ={
    hidden: {
        opacity:0,
    },
    show: {
        opacity:1,
    },
}

  useEffect(() => {
    console.log(values)
    console.log('Form submitted!')
    if(values.type === 'student'){
      const formData = values; // Assuming your values match the structure you need to send

    // Send the form values to the server using Axios
    axios.post('http://localhost:3001/v1/api/student/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Form data submitted successfully!');
        } else {
          console.error('Error submitting form data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    else {
      const formData = values;
      axios.post('http://localhost:3001/v1/api/instructor/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            console.log('Form data submitted successfully!');
          } else {
            console.error('Error submitting form data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }


    setTimeout(() => {
      goto(0)
    }, 5000);
  }, [goto])
  return (
    <m.div 
      className='thankyou-form'
      variants={container}
      initial='hidden'
      animate='show'
    >
        <img src={Tick} alt="tick mark" />
        <h1>Thank you!</h1>
        <p>Thanks for signing up! You may now login using your new account</p>
    </m.div>
  )
}
