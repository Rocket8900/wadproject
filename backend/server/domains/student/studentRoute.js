import express from "express"
import StudentController from "./studentController.js"
import AuthController from "../auth/authController.js"

import multer from "multer";

const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); // Limit file size to 5MB
const studentRoute = express.Router()


studentRoute.post("/register", StudentController.registerStudent)
studentRoute.post("/login", StudentController.loginStudent)
studentRoute.use(AuthController.validateUser)
studentRoute.get("/list", StudentController.viewAllStudent)
studentRoute.get("/profile/:id", StudentController.viewStudentProfile)
studentRoute.patch("/profile/:id", StudentController.updateStudentProfile)
studentRoute.patch("/profile/photo/:id", upload.single('photo'), StudentController.uploadStudentPhoto);

export { studentRoute as default }