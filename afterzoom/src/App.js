import NavbarComponent from "./components/ui/Navbar";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { UserDashboard } from "./components/dashboards/UserDashboard";
import { InstructorDashboard } from "./components/dashboards/InstructorDashboard";
import  Registration  from "./components/registration/registration";
import StudentDashboard from "./components/dashboard/studentdashboard";
import InstructorDashboard from "./components/dashboard/instructordashboard";
import InstructorsComponent from "./components/instructors/instructors";
import InstructorComponent from "./components/instructors/instructor";
import {Routes,Route} from 'react-router';
import React from 'react';
import './App.css';

// instructordashboard.js

export default function App() {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/instructordashboard" element={<InstructorDashboard />} />
        <Route path="/instructors" element={<InstructorsComponent />} />
        <Route path="/instructor" element={<InstructorComponent />} />

      </Routes>
    </div>
  ) 
}
