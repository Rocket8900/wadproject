import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RegiModal from '../Registration/Registration'

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

const RegisterButton = () => {
  const [isRegiOpen, setRegiOpen] = useState(false);

  return (
    <>  
      <motion.div
        className="btn loginButton"
        variants={btnGroup}
        onClick={() => setRegiOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register
      </motion.div>
      <RegiModal isRegiOpen={isRegiOpen} setRegiOpen={setRegiOpen} />
    </>
  );
};

export default RegisterButton;
