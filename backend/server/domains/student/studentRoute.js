import express from "express"
import StudentController from "./studentController.js"
import AuthController from "../auth/authController.js"


const studentRoute = express.Router()


studentRoute.post("/register", StudentController.registerStudent)
studentRoute.post("/login", StudentController.loginStudent)

studentRoute.use(AuthController.validateUser)

studentRoute.get("/profile/:id", StudentController.viewStudentProfile)
studentRoute.post("/profile/:id/update", StudentController.updateStudentProfile)


export { studentRoute as default }