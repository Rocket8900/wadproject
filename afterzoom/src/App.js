import NavbarComponent from "./components/ui/Navbar";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
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
      </Routes>
    </div>
  ) 
}

