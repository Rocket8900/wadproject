


import express from "express";
import InstructorController from "./instructorController.js";


const instructorRoute = express.Router();


instructorRoute.post("/register", InstructorController.makeInstructorAccount)
instructorRoute.post("/login", InstructorController.loginInstructor);


export {instructorRoute as default}