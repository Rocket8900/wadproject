import Logging from "../../utils/loggings.js";
import { redis_cache } from "../../utils/redisConnection.js";
import QuizSevice from "./quizService.js";

export default class QuizController {
    static storeQuizResultForStudent = async (req, res) =>{
        try {
            const studentId = req.user.id
            let quizData = req.body
            quizData["studentId"] = studentId
            const quiz = await QuizSevice.createQuizEntry(quizData);
            if (!quiz) {
                Logging.warn("failed to save quiz");
                return res.status(400).json({ data: "failed to save quiz data" });
            } 

            Logging.info(`added ${studentId}'s quiz result into db`)
            return res.status(201).json({data: "mistakes stored"})

        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static retrieveQuizResultForStudent = async (req, res) => {
        try {
            const studentId = req.user.id
            const quizzes = await QuizSevice.getQuizEntriesByStudentId(studentId)
            if (!quizzes) {
                Logging.warn("failed to past quizzes");
                return res.status(400).json({ data: "failed to retrieve past quiz data" });
            }
            Logging.info(`retrieved all ${studentId}'s quiz results`)
            return res.status(200).json({data: quizzes})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }
}