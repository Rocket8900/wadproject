import Features from './Features/Features';
import {Hero} from './Hero/Hero';
import TestimonialCarousel from './Testimonials/Testimonials'

export function Home() {
  return <>
    <Hero/>
    <Features/>        
    <TestimonialCarousel/>  
  </>
}