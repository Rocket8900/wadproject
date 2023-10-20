import NavbarComponent from "./components/ui/Navbar";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { StudentDashboard } from "./components/dashboards/StudentDashboard";
import { InstructorDashboard } from "./components/dashboards/InstructorDashboard";
import  Registration  from "./components/registration/registration";
import InstructorsComponent from "./components/instructors/instructors";
import InstructorDetail from "./components/instructors/InstructorDetail";
import Quiz from "./components/quiz/Quiz";
import {Routes,Route} from 'react-router';
import React from 'react';
import './App.css';
import Chat from "./components/private-chat/chat";
import InstructorChat from "./components/private-chat/instructor-chat"


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructors" element={<InstructorsComponent />} />
        <Route path="/instructor" element={<InstructorDetail />} />
        <Route path="/student-chat" element={<Chat />} />
        <Route path="/instructor-chat" element={<InstructorChat />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  ) 
}
