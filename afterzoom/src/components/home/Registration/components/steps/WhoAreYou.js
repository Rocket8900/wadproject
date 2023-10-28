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
      <div className="input-container">
        <label htmlFor="name">
          Name
        </label>
        <Field 
          type="text" 
          name='name' 
          placeholder='Enter Your Name'
        />
      </div>
      <div className="input-container">
        <label htmlFor="age">
          Age
        </label>
        <Field 
          type="number" 
          name='age' 
          placeholder='Enter Your age'
        />
      </div>
      


<div className="radio-container">
  <Field 
    type="radio" 
    name='type'
    id='student'
    value= 'student'
  />
  <m.label 
    htmlFor="student"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>Student</strong>
    </div>
  </m.label>
  

  <Field 
    type="radio" 
    name='type'
    id='instructor'
    value='instructor'
  />

  <m.label 
    htmlFor="instructor"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>Instructor</strong>
    </div>
  </m.label>
</div>

<div className="radio-container">
  <Field 
    type="radio" 
    name='gender'
    id='male'
    value= 'male'
  />

  <m.label 
    htmlFor="male"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>Male</strong>
    </div>
  </m.label>

  <Field 
    type="radio" 
    name='gender'
    id='female'
    value='female'
  />

  <m.label 
    htmlFor="female"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>Female</strong>
    </div>
  </m.label>
</div>

    </m.div>
  )
}
