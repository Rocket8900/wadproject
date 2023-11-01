


import express from "express";
import InstructorController from "./instructorController.js";
import AuthController from "../auth/authController.js";
import multer from "multer";

const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); // Limit file size to 5MB


const instructorRoute = express.Router();


instructorRoute.post("/register", InstructorController.makeInstructorAccount)
instructorRoute.post("/login", InstructorController.loginInstructor);

instructorRoute.use(AuthController.validateUser) // user-only auth
instructorRoute.get("/list", InstructorController.listInstructorsByFilter)
instructorRoute.get("/profile/:id", InstructorController.viewSpecificInstructor);


instructorRoute.use(AuthController.validateInstructor) // instructor-only auth
instructorRoute.patch("/profile", InstructorController.updateInstructorProfile);
instructorRoute.patch("/carousel/photo", upload.single('photo'), InstructorController.uploadInstructorPhoto);
instructorRoute.patch("/profile/photo", upload.single('photo'), InstructorController.uploadInstructorDP);



export {instructorRoute as default}