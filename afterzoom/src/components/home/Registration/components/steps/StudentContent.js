
// styles 
import '../../../Home.css'

// framer motion
import { motion as m } from 'framer-motion'

export default function StudentContent({Field, values,c1,c2,c3, setC1,setC2,setC3, c4, setC4}) {

  const container ={
    hidden: {
        opacity:0,
    },
    show: {
        opacity:1,
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
      className='addOn-form'
      variants={container}
      initial='hidden'
      animate='show'
    >

        <m.label 
          style={{
            outline: c1? '1px solid #473dff' : '',
            backgroundColor: c1? '#473dff1a' : ''
          }}
          htmlFor="online"
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
        >
          <Field
            id='online'
            type="checkbox" 
            name="checked" 
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
          htmlFor="storage"
          variants={addOn}
          whileHover='hover'
          whileTap='tap'
        >

        <Field 
          id='storage'
          type="checkbox" 
          name="checked" 
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
          htmlFor="custom"
        >
        <Field 
          id='custom'
          type="checkbox" 
          name="checked" 
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
          name="checked" 
          value='Tamil'
          onClick={() => setC4(!c4)}
        />
          <div>
            Tamil
          </div>
        </m.label>
    </m.div>
  )
}
