import Navbar from "./components/Navbar";
import { Home } from "./components/Home"
import {Routes,Route} from 'react-router'
import './App.css';

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  ) 
}

