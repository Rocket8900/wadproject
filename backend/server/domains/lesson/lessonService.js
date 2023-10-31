import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";






export default class LessonService {

    static createLesson = async (lessonData) => {
        try {
            const lesson = await prisma_db.lesson.create({
                data: {
                    ...lessonData
                }
            })
            Logging.info("db create lesson")
            return lesson
        } catch (error) {
            Logging.error(error);
            return null
        }
    }

    static updateLesson = async (lessonId, lessonData) => {
        try {
            const lesson = await prisma_db.lesson.update({
                where: {
                    id: lessonId
                },
                data: {
                    ...lessonData
                }
            })
            Logging.info("db update lesson")
            return lesson
        } catch (error) {
            Logging.error(error);
            return null
        }
    }

    static getLesson = async (lessonId) => {
        try {
            const lesson = await prisma_db.lesson.findUnique({
                where: {
                    id: lessonId
                },
            })
            Logging.info("db get lesson")
            return lesson
        } catch (error) {
            Logging.error(error);
            return null
        }
    }



}