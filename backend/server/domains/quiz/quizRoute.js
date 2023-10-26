import express from "express";
import QuizController from "./quizController.js";
import AuthController from "../auth/authController.js"

const quizRoute = express.Router();

quizRoute.use(AuthController.validateUser)
quizRoute.use(AuthController.validateStudent)
quizRoute.post("/", QuizController.storeQuizResultForStudent)
quizRoute.get("/", QuizController.retrieveQuizResultForStudent)

export {quizRoute as default}