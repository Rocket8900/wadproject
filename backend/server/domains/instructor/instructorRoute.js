


import express from "express";
import InstructorController from "./instructorController.js";
import AuthController from "../auth/authController.js";
import multer from "multer";

const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); // Limit file size to 5MB


const instructorRoute = express.Router();


instructorRoute.post("/register", InstructorController.makeInstructorAccount)
instructorRoute.post("/login", InstructorController.loginInstructor);

instructorRoute.use(AuthController.validateUser)

instructorRoute.get("/list", InstructorController.listInstructorsByFilter)
instructorRoute.get("/profile/:id", InstructorController.viewSpecificInstructor);
instructorRoute.patch("/profile/:id", InstructorController.updateInstructorProfile);
instructorRoute.patch("/profile/photo/:id", upload.single('photo'), InstructorController.uploadInstructorPhoto);



export {instructorRoute as default}