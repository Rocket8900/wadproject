import Logging from "../../utils/loggings.js";
import { redis_cache } from "../../utils/redisConnection.js";


export default class QuizController {
    static storeQuizResultForStudent = async (req, res) =>{
        try {
            const studentId = req.user.id
            const mistakes = req.body.mistakes
            /*
                {
                    mistakes: [1,2,3,4....]
                }
            */
            const serializedMistakes = JSON.stringify(mistakes);
            await redis_cache.set(`${studentId}_quiz`, serializedMistakes)
            Logging.info(`added ${studentId}'s quiz result into redis`)
            return res.status(201).json({data: "mistakes stored"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static retrieveQuizResultForStudent = async (req, res) => {
        try {
            const studentId = req.user.id
            const mistakes = await redis_cache.get(`${studentId}_quiz`)
            Logging.info(`retrieved ${studentId}'s last quiz result from redis`)
            return res.status(200).json({data: mistakes})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }
}