import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import {Routes,Route} from 'react-router';
import React, { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </div>
  ) 
}

