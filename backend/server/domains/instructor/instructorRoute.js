


import express from "express";
import InstructorController from "./instructorController";


const instructorRoute = express.Router();


instructorRoute.post("/register", InstructorController.makeInstructorAccount)
instructorRoute.post("/login", InstructorController.loginInstructor);