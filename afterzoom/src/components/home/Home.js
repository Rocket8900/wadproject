import Features from './Features/Features';
import {Hero} from './Hero/Hero';
import TestimonialCarousel from './Testimonials/Testimonials'

export function Home() {
  return <div className='homeBody'>
    <Hero/>
    <Features/>        
    <TestimonialCarousel/>  
  </div>
}