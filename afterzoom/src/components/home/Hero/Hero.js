import {motion} from 'framer-motion';
import React, { useState } from 'react';
import '../Home.css'
import LoginModal from '../login/Login'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

import RegiModal from '../Registration/Registration'

let easeing = [0.6,-0.05,0.01,0.99];

const stagger = {
  animate:{
    transition:{
      delayChildren:0.4,
      staggerChildren:0.2,
      staggerDirection:1
    }
  }
}

const fadeInUp = {
  initial:{
    y:-60,
    opacity:0,
    transition:{
      duration:0.6, ease:easeing
    }
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:0.6,
      delay:0.5,
      ease:easeing
    }
  }
};

const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};

const firstName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:-1
    }
  }
}

const lastName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:1
    }
  }
}

const letter = {
  initial:{
    y:400,
  },
  animate:{
    y:0,
    transition:{duration:1, ...transition}
  }
};

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
const star={
  initial:{
    y:60,
    opacity:0,
    transition:{duration:0.8, ease:easeing}
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

const header={
  initial:{
    y:-60,
    opacity:0,
    transition:{duration:0.05, ease:easeing}
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


export function Hero() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegiOpen, setRegiOpen] = useState(false);
    return <>

    <motion.div initial='initial' animate='animate'>
      <motion.div className="content_wrapperhome" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.3, ease:easeing}}>
        <video autoPlay loop muted className="video-background">
          <source src="vidbackground.mp4" type="video/mp4" />
        </video>
        <div className="left_content_wrapper">

          <motion.h2>

            <h1 className='Hometitle'>AfterZOOM</h1>
            <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
                <motion.span variants={letter}>L</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>g</motion.span>
                <motion.span variants={letter} className="second">D</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>v</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>g</motion.span>
            </motion.span>
            <motion.span variants={lastName} initial="initial" animate="animate" className='last'>
            <motion.span variants={letter} className="second"></motion.span>
                <motion.span variants={letter}>H</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter} className="second">N</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>v</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter} className="second">B</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter} className="second">Q</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>k</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>r.</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>Join afterZOOM, watch your learning progress boom.</motion.p>

          <motion.div className="btn_group mx-auto" variants={stagger}>
            <motion.div className="col-2"></motion.div>
            <motion.div className="col-3"><RegisterButton setRegiOpen={setRegiOpen} /></motion.div>
            <motion.div className="col-3"><LoginButton setIsOpen={setIsOpen} /></motion.div>
            <motion.div className="col-2"></motion.div>
          </motion.div>
        </div>
      </motion.div>
    
    </motion.div>
</>
}