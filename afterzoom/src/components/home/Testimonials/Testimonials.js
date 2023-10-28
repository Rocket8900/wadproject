import React, { useState, useRef } from 'react';
import {AnimatePresence, motion,  useInView} from 'framer-motion';
import Person from './Person';

import '../Home.css';


const slideUpVariants = {
    initial : {y:20, opacity:0},
    animate : {
      y:0, 
      opacity: 1,
      transition: {duration:.5, delay:0.3},
    }
  }

function TestimonialCarousel() {

  return (
    <motion.div className="service_container">
        <div className="title_wrapper">
            <motion.span className="service_title"
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once:true,
              }}
            >Testimonials</motion.span>
            <motion.h2 className=" my-5"
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once:true,
              }}
            >Hear from some of our users.</motion.h2>
        </div>
        
        <Person/>  
    </motion.div>
    
    
  )
}

export default TestimonialCarousel