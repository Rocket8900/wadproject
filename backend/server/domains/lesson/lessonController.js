import LessonService from "./lessonService.js";
import Logging from "../../utils/loggings.js";



export default class LessonController {
 
    static scheduleLesson = async (req, res) => {
        try {
            const lessonData = req.body
            const lesson  = await LessonService.createLesson(lessonData)
            if (!lesson) {
                Logging.warn(`error creating lesson`)
                return res.status(400).json({ error: "unable to schedule lesson"})
            }
            Logging.info("scheduled lesson for student")
            return res.status(201).json({data: lesson})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static modifyLessonDetails = async (req, res) => {
        try {
            const lessonId = req.params.id
            const lessonData = req.body
            const lesson = await LessonService.updateLesson(lessonId, lessonData)
            if (!lesson) {
                Logging.warn(`error updating lesson`)
                return res.status(400).json({ error: "unable to update lesson"})
            }
            Logging.info("updated lesson for student")
            return res.status(201).json({data: lesson})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static viewLessonDetails = async (req, res) => {
        try {
            const lessonId = req.params.id
            const lesson = await LessonService.getLesson(lessonId)
            if (!lesson) {
                Logging.warn(`error getting lesson`)
                return res.status(400).json({ error: "unable to get lesson"})
            }
            Logging.info("get lesson for student")
            return res.status(201).json({data: lesson})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

}