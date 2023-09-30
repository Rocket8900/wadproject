import NavbarComponent from "./components/ui/Navbar";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { UserDashboard } from "./components/dashboards/UserDashboard";
import { InstructorDashboard } from "./components/dashboards/InstructorDashboard";
import {Routes,Route} from 'react-router';
import React, { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />

      </Routes>
    </div>
  ) 
}

