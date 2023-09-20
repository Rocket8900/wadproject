import express from "express"
import StudentController from "./studentController.js"


const studentRoute = express.Router()

studentRoute.post("/register", StudentController.registerStudent)
studentRoute.post("/login", StudentController.loginStudent)
studentRoute.get("/profile/:id", StudentController.viewStudentProfile)
studentRoute.post("/profile/:id/update", StudentController.updateStudentProfile)


export { studentRoute as default }