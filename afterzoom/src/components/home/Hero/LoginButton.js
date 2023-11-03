import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginModal from '../login/Login'; // Import the modal component
import styles from './buttonStyle.module.css';

let easeing = [0.6,-0.05,0.01,0.99];

const btnGroup={
    initial:{
      y:-60,
      opacity:0,
      transition:{duration:0.6, ease:easeing}
    },
    animate:{
      y:0,
      opacity:1,
      animation:{
        duration:0.6,
        ease:easeing
      }
    }
  };

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="btn loginButton"
        variants={btnGroup}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Log in
      </motion.div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default LoginButton;
