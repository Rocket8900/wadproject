import React from 'react'
import '../../Home.css'
import Plan from './steps/LoginDetails'
import StudentContent from './steps/StudentContent'
import InstructorContent from './steps/InstructorContent'
import WhoAreYou from './steps/WhoAreYou'
import ThankyouPage from './steps/ThankyouPage'
import ErrorContent from './steps/ErrorContent'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import { FiX } from "react-icons/fi"; 

import {motion} from 'framer-motion'

export default function MyForm({step, next, prev, goto}) {

    const [c1, setC1] = useState(false)
    const [c2, setC2] = useState(false)
    const [c3, setC3] = useState(false)
    const [c4, setC4] = useState(false)
    const [validPlan, setValidPlan] = useState(null)

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


    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          // // confirmpassword: '',
          gender: '',
          type:'',
          age:'',
          language: [],
          // language: "english",
          // experience: '',
          // affiliation: '',
        }}
        
        onSubmit={ (values, {resetForm}) => {
          console.log(resetForm)
          console.log(values)

          if(step === 0){
            setValidPlan(true)
          }
          if (step !== 3) return next()
          
        }}
      >
        {({values, errors, touched}) => (
         
          <Form className='regiform'>
            {step === 0 && <WhoAreYou 
              Field={Field}
              values={values} 
            />}
            
            {step === 1 && <Plan 
              Field={Field} 
              values={values}/>}

            {step === 2 && values.type === 'student' && <StudentContent 
              Field={Field}
              values={values} 
              c1={c1} 
              c2={c2} 
              c3={c3}
              c4={c4} 
              setC1={setC1} 
              setC2={setC2} 
              setC3={setC3}
              setC4={setC4}
              />}

            {step === 2 && values.type === 'instructor' && <InstructorContent  
              Field={Field}
              values={values} 
              c1={c1} 
              c2={c2} 
              c3={c3}
              c4={c4} 
              setC1={setC1} 
              setC2={setC2} 
              setC3={setC3}
              setC4={setC4}
              />}

            {step === 2 && values.type === '' && <ErrorContent  
              Field={Field}
              values={values} 
              c1={c1} 
              c2={c2} 
              c3={c3}
              c4={c4} 
              setC1={setC1} 
              setC2={setC2} 
              setC3={setC3}
              setC4={setC4}
              />}

            {step === 3 && <ThankyouPage goto={goto} values={values}/>}
           
            
            <motion.div 
              className="btn-container"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:.5}}
            >
              {step !== 0 && step !== 3 && <motion.button 
                className='prev-btn' 
                type='button' 
                variants={btn}
                whileHover='hover'
                whileTap='tap'
                onClick={prev}
              >Go Back</motion.button>}

              {step === 0 && <div></div>}
              { step !== 3  && <motion.button 
                className='next-btn' 
                type='submit'
                variants={btn}
                whileHover='hover'
                whileTap='tap'
              > {step === 2 ? 'Confirm' : 'Next Step'}</motion.button>}

              
            </motion.div>
          </Form>
        )}
      </Formik>
    
  )
}
