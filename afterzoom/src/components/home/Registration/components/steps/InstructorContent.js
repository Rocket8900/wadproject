
// styles 
import '../../../Home.css'

// framer motion
import { motion as m } from 'framer-motion'

export default function InstructorContent({Field, values,c1,c2,c3, setC1,setC2,setC3, c4, setC4}) {

  const container ={
    hidden: {
        opacity:0,
    },
    show: {
        opacity:1,
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
  const addOn ={
    hover: {
      scale:[null, 1.08, 1.02],
      transition:{
        duration: .2,
      },
      outline: '1px solid #473dff'
    },
    tap:{
      scale: .99999,
    }    
  }

  
  return (
    <m.div 
      className='instructorform'
      variants={container}
      initial='hidden'
      animate='show'
    >
        <div className="input-container">
        <label htmlFor="name">
          Experience
        </label>
        <Field 
          type="number" 
          name='experience' 
          placeholder='Enter Years of Experience'
        />
      </div>

      <div className="input-container">
        <label htmlFor="name">
          Car Model
        </label>
        <Field 
          type="text" 
          name='carModel' 
          placeholder='Enter your car brand and model'
        />
      </div>
      <div className='customLabelParent' style={{marginTop:"2rem", marginBottom:"1rem"}}><div className='customLabel'>Affiliation</div></div>
      <div className="instructor-container" >
  <Field 
    type="radio" 
    name='affiliation'
    id='CDC'
    value= 'CDC'
  />
  <m.label 
    htmlFor="CDC"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>CDC</strong>
    </div>
  </m.label>
  

  <Field 
    type="radio" 
    name='affiliation'
    id='BBDC'
    value='BBDC'
  />

  <m.label 
    htmlFor="BBDC"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>BBDC</strong>

    </div>
  </m.label>

  <Field 
    type="radio" 
    name='affiliation'
    id='SSDC'
    value='SSDC'
  />

  <m.label 
    htmlFor="SSDC"
    variants={card}
    whileHover='hover'
    whileTap='tap'
  >
    <div>
      <strong>SSDC</strong>

    </div>
  </m.label>
</div>
<div className='customLabelParent' style={{marginTop:"2rem", marginBottom:"1rem"}}><div className='customLabel'>Language(s)</div></div>
        <m.div className='addOn-form'>
        <m.label 
          style={{
            outline: c1? '1px solid #473dff' : '',
            backgroundColor: c1? '#473dff1a' : ''
          }}
          htmlFor="english"
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
        >
          <Field
            id='english'
            type="checkbox" 
            name="language" 
            value='english'
            onClick={() => setC1(!c1)}
          />
          <div>
            English
          </div>

        </m.label>

        <m.label 
          style={{
          outline: c2? '1px solid #473dff' : '',
          backgroundColor: c2? '#473dff1a' : ''
          }}  
          htmlFor="Malay"
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
        >

        <Field 
          id='Malay'
          type="checkbox" 
          name="language" 
          value='Malay'
          onClick={() => setC2(!c2)}
        />
          <div>
            Malay
          </div>

        </m.label>

        <m.label 
          style={{
          outline: c3? '1px solid #473dff' : '',
          backgroundColor: c3? '#473dff1a' : ''
          }}  
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
          htmlFor="Mandarin"
        >
        <Field 
          id='Mandarin'
          type="checkbox" 
          name="language" 
          value='Mandarin'
          onClick={() => setC3(!c3)}
        />
          <div>
            Mandarin
          </div>
        </m.label>

        <m.label 
          style={{
          outline: c4? '1px solid #473dff' : '',
          backgroundColor: c4? '#473dff1a' : ''
          }}  
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
          htmlFor="Tamil"
        >
        <Field 
          id='Tamil'
          type="checkbox" 
          name="language" 
          value='Tamil'
          onClick={() => setC4(!c4)}
        />
          <div>
            Tamil
          </div>
        </m.label>
        </m.div>
    </m.div>
  )
}
