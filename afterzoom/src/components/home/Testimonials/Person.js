import React from 'react';
import {motion} from 'framer-motion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Home.css'
import pic from './pic.jpg';

let easing = [0.6,-0.05,0.01,0.99];
const container = {
    show:{
        transition:{
            staggerChildren:0.2
        }
    }
};

const item = {
    hidden:{opacity:0,y:20},
    show:{
        opacity:1,
        y:0,
        transition:{
            ease:'easeInOut',
            duration:.2
        }
    }
}

const title = {
    hidden:{
        y:60,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            delay:.2,
            duration:0.6,
            ease:easing
        }
    }
};

const hoverEffect = {
    whileHover:{
        scale:1.5,rotate:630,borderRadius:"100%"
    },
    whileTap:{
        scale:.8,rotate:630,borderRadius:"100%"
    },
}

function Person() {
  return (
    <div>
<Row className="justify-content-center">
  <Col xs={12} sm={12} md={6} lg={6} xl={2}>
    <motion.div className="service_cards" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once: false}}>
      <motion.div className="cardItem" variants={item}>
        {/* <img src={pic} className="person"></img> */}
        <h2>Nashwyn</h2>
        <h6>Best thing to ever exist</h6>
      </motion.div>
    </motion.div>
  </Col>

  <Col xs={12} md={6} lg={6} xl={2}>
    <motion.div className="service_cards" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once: false}}>
      <motion.div className="cardItem" variants={item}>
        <h2>Clarissa</h2>
        <p>Just wow.</p>
      </motion.div>
    </motion.div>
  </Col>

  <Col xs={12} md={6} lg={6} xl={2}>
    <motion.div className="service_cards" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once: false}}>
      <motion.div className="cardItem" variants={item}>
        <h2>Zhi Hui</h2>
        <p>Stunning and breathtaking</p>
      </motion.div>
    </motion.div>
  </Col>

  <Col xs={12} md={6} lg={6} xl={2}>
    <motion.div className="service_cards" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once: false}}>
      <motion.div className="cardItem" variants={item}>
        <h2>Shawn</h2>
        <p>I love this website so damn much</p>
      </motion.div>
    </motion.div>
  </Col>

  <Col xs={12} md={6} lg={6} xl={2}>
    <motion.div className="service_cards" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once: false}}>
      <motion.div className="cardItem" variants={item}>
        <h2>See Jae</h2>
        <p>Take all my money</p>
      </motion.div>
    </motion.div>
  </Col>
</Row>


    </div>
  )
}

export default Person
