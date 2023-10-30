import AuthController from "../auth/authController.js";
import express from "express";
import LessonController from "./lessonController.js";



const lessonRoute = express.Router()

lessonRoute.use(AuthController.validateUser) // user-only auth
lessonRoute.post("/", LessonController.scheduleLesson)
lessonRoute.get("/:id", LessonController.viewLessonDetails)
lessonRoute.patch("/:id", LessonController.modifyLessonDetails)

export {lessonRoute as default}

