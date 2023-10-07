


import express from "express";
import InstructorController from "./instructorController.js";

import AuthController from "../auth/authController.js";


const instructorRoute = express.Router();


instructorRoute.post("/register", InstructorController.makeInstructorAccount)
instructorRoute.post("/login", InstructorController.loginInstructor);

instructorRoute.use(AuthController.validateUser)

instructorRoute.get("/list", InstructorController.listAllAvailableInstructor)
instructorRoute.post("/list/filter", InstructorController.listInstructorsByFilter)
instructorRoute.get("/list/:id", InstructorController.viewSpecificInstructor);
instructorRoute.get("/profile/:id", InstructorController.viewSpecificInstructor);
instructorRoute.post("/profile/:id/update", InstructorController.updateInstructorProfile);



export {instructorRoute as default}