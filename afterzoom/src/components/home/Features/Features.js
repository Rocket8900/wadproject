import React, { useState, useRef } from 'react';
import {AnimatePresence, motion,  useInView} from 'framer-motion';
import search from './search.svg'
import book from './book.svg'
import pen from './pen.svg'



import '../Home.css';

const tabs = [
    {
      name: 'students',
      label: 'Students',
      render: () => {
        return  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                        <img src={search} className='featurePic'></img>
                        <h4>Find your best match</h4>
                        <h6 className='featureInfoOne'>Search through and filter to find the best instructor for you</h6>
                        <h6 className='featureInfo'>Ensure that they cater towards your learning style</h6>
                        <h6 className='featureInfo'>Find instructors that fit your budget</h6>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                    <img src={book} className='featurePic'></img>
                        <h4>Help book lessons</h4>
                        <h6 className='featureInfoOne'>Gone are the days of having to text teachers to ask when they are free</h6>
                        <h6 className='featureInfo'>See past and upcoming lessons</h6>
                        <h6 className='featureInfo'>See their free lessons at a glance</h6>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                        <img src={pen} className='featurePic'></img>
                        <h4>Supplement your learning</h4>
                        <h6 className='featureInfoOne'>Practice our btt and ftt tips for guaranteed passes</h6>
                        <h6 className='featureInfo'>Enter our simluation based training to practice scenarios</h6>
                        <h6 className='featureInfo'>Enter notes to remember your learning</h6>
                    </div>
                </div>;
      },
    },
    {
      name: 'instructors',
      label: 'Instructors',
      render: () => {
        return <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                        <img src={search} className='featurePic'></img>
                        <h4>Find more students</h4>
                        <h6 className='featureInfoOne'>Allow students to search for u</h6>
                        <h6 className='featureInfo'>Ensure you have more students</h6>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                    <img src={book} className='featurePic'></img>
                        <h4>Help book lessons</h4>
                        <h6 className='featureInfoOne'>Let students book automatically</h6>
                        <h6 className='featureInfo'>See past and upcoming lessons</h6>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3">
                        <img src={pen} className='featurePic'></img>
                        <h4>Supplement your student learning</h4>
                        <h6 className='featureInfoOne'>Implement notes</h6>

                    </div>
                </div>;
      },
    },
  ];
  
  const tabContentVariants = {
    initial: {
      y: 10,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };

  const slideUpVariants = {
    initial : {y:20, opacity:0},
    animate : {
      y:0, 
      opacity: 1,
      transition: {duration:.5, delay:0.3},
    }
  }

function Features() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const isSelected = (tab) => activeTab.name === tab.name;
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
                
                // exit={{opacity:0}}
                // transition={{duration:.5, delay:1.8}}
            >Our Services</motion.span>
            <motion.h2
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once:true,
              }}
            >Why you should sign up with us.</motion.h2>
        </div>

        <motion.div className="tabWrapper my-5"
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once:true,
              }}

        >
            <div className="tabHeader">
            {tabs.map((tab) => (
            <div
                key={tab.name}
                className={`tabItem ${isSelected(tab) ? 'selected' : ''}`}
            >
                <a href="#" onClick={(e) => handleClick(e, tab)}>
                {tab.label}
                </a>
                {isSelected(tab) && (
                <motion.div layoutId="indicator" className="indicator" />
                )}
            </div>
            ))}
        </div>

        <div className="tabContent ">
            <AnimatePresence mode="wait">
            <motion.div
                key={activeTab.name || 'empty'}
                variants={tabContentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{
                duration: 0.3,
                }}
            >
                {activeTab && activeTab.render()}
            </motion.div>
            </AnimatePresence>
        </div>
    </motion.div>

    </motion.div>
    
    
  )
}export default Features