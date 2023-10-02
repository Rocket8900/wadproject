import NavbarComponent from "./components/ui/Navbar";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { UserDashboard } from "./components/dashboards/UserDashboard";
import { InstructorDashboard } from "./components/dashboards/InstructorDashboard";
import  Registration  from "./components/registration/registration";
import InstructorsComponent from "./components/instructors/instructors";
import InstructorComponent from "./components/instructors/instructor";
import {Routes,Route} from 'react-router';
import React from 'react';
import './App.css';
// ensure that custom components start with capital letter to differentiate from built in components
// instructordashboard.js

export default function App() {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/student-dashboard" element={<UserDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructors" element={<InstructorsComponent />} />
        <Route path="/instructor" element={<InstructorComponent />} />

      </Routes>
    </div>
  ) 
}
