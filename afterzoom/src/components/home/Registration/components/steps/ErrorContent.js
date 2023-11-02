
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
      style={{textAlign:"center"}}
    >
        <h1>Please select either an instructor or student to continue</h1>
    </m.div>
  )
}
