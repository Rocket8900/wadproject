import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";


export default class QuizSevice {
    static createQuizEntry = async (quizData) => {
        try {
            const quizEntry = prisma_db.quiz.create({
                data: {
                    ...quizData
                }
            })
            return quizEntry
        } catch (error) {
            Logging.error(error);
            return null
        }
    }

    static getQuizEntriesByStudentId = async (studentId) => {
        try {
            const quizEntries = prisma_db.quiz.findMany({
                where: {
                    studentId: studentId
                }
            })
            return quizEntries
        } catch (error) {
            Logging.error(error);
            return null
        }
    }
}