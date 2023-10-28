
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import  NewLogin  from "./components/home/login/Login";
import  Newregistration  from "./components/registration/newregistration";
import { StudentDashboard } from "./components/dashboards/StudentDashboard";
import RegistrationTest from "./components/home/Registration/Registration"
import { InstructorDashboard } from "./components/dashboards/InstructorDashboard";
import  Registration  from "./components/registration/registration";
import InstructorsComponent from "./components/instructors/instructors";
import InstructorDetail from "./components/instructors/InstructorDetail";
import { ChooseQuiz } from "./components/quiz/choosequiz";
import Quiz from "./components/quiz/Quiz.js";
import {Routes,Route} from 'react-router';
import React from 'react';
import './App.css';
import Chat from "./components/private-chat/chat";
import InstructorChat from "./components/private-chat/instructor-chat";
import InstructorFeedbackPage from "./components/notebook/InstructorFeedback";
import StudentNotebook from "./components/notebook/StudentNotebook";
import NotesPage from "./components/notes/NotesPage";
import { BookingStudent } from "./components/bookingLesson/bookingStudent";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} /> */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructors" element={<InstructorsComponent />} />
        <Route path="/instructor/:id" element={<InstructorDetail />} />
        <Route path="/student-chat" element={<Chat />} />
        <Route path="/instructor-chat" element={<InstructorChat />} />
        {/* <Route path="/regi" element={<RegistrationTest />} /> */}

        <Route path="/choose-quiz" element={<ChooseQuiz />} />
        <Route path="/btt-quiz" element={<Quiz type="btt"/>} />
        <Route path="/ftt-quiz" element={<Quiz type="ftt"/>} />
        <Route path="/topical-quiz" element={<Quiz type="topic"/>} />
        <Route path="/review-quiz" element={<Quiz type="review"/>} />

        <Route path="/notes" element={<NotesPage />} />
        <Route path="/bookingStudent" element={<BookingStudent />} />
        
        <Route path="/post-feedback" element={<InstructorFeedbackPage />} />
        <Route path="/view-notebook" element={<StudentNotebook />} />
      </Routes>
    </div>
    
  ) 
}
