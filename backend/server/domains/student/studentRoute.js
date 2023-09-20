import express from "express"
import StudentController from "./studentController.js"


const studentRoute = express.Router()

studentRoute.post("/register", StudentController.registerStudent)
studentRoute.post("/login", StudentController.loginStudent)

export { studentRoute as default }