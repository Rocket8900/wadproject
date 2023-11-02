import '../../../Home.css'

// framer motion
import { motion as m } from 'framer-motion'

export default function PersonalInfo({Field, errors, touched}) {
  const container ={
    hidden: {
        opacity:0,
    },
    show: {
        opacity:1,
        transition:{
          delay:.25,
        },
    },
}
const card ={
  hover: {
    scale:[null, 1.1, 1.05],
    transition:{
      duration: .2,
    },
    outline: '1px solid hsl(var(--purpleish-blue))'
  },
  tap:{
    scale: .98,
  },
}

  return (
    <m.div 
      className='personalInfo-form'
      variants={container}
      initial='hidden'
      animate='show'
    >
      <h1>Personal info</h1>
      
      <div className="input-container">
        <label htmlFor="email">Email Address</label>
        <Field 
          type="text" 
          name='email' 
          placeholder='Enter Your Email'
        />
      </div>
      
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <Field 
          type="password" 
          name='password' 
          placeholder='Enter Your password'
        />
      </div>


    </m.div>
  )
}
