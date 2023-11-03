import S3Service from "./s3Service.js"
import Logging from "../../utils/loggings.js"
import InstructorService from "../instructor/instructorService.js"
import StudentService from "../student/studentService.js"
import SceneService from "../scene/sceneService.js"


export default class S3Controller {
    static bulkRetrieveSignedUrlsBasedOnInstructorId = async (req, res) => {
        try {
            const instructorId = req.params.id
            const keys = (await InstructorService.getInstructorById(instructorId)).picture 
            let result = []
            for (const key of keys) {
                const signedUrl = await S3Service.getSignedUrl(key);
                result.push(signedUrl);
            }
            return res.status(200).json({data: result}) 
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static singleRetrieveSignedUrlsBasedOnStudentId = async (req, res) => {
        try {
            const studentId = req.params.id
            const student = await StudentService.getStudentById(studentId)
            if (student && student.selfie !== null) {
                const signedUrl = await S3Service.getSignedUrl(student.selfie)
                if (signedUrl) {
                    Logging.info(`get ${studentId} signed url`)
                    return res.status(200).json({data: signedUrl})
                }
            }
            Logging.info(`${studentId} doesnt exist or has no dp`)
            return res.status(200).json({data: "unable to retrieve image"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }       
    }

    static singleRetrieveSignedUrlsBasedOnInstructorId = async (req, res) => {
        try {
            const instructorId = req.params.id
            const instructor = await InstructorService.getInstructorById(instructorId)
            if (instructor && instructor.dp !== null) {
                const signedUrl = await S3Service.getSignedUrl(instructor.dp)
                if (signedUrl) {
                    Logging.info(`get ${instructorId} signed url`)
                    return res.status(200).json({data: signedUrl})
                }
            }
            Logging.info(`${instructorId} doesnt exist or has no dp`)
            return res.status(200).json({data: "unable to retrieve image"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }       
    }

    static singleRetrieveSignedUrlsBasedOnSceneId = async (req, res) => {
        try {
            const sceneId = req.params.id
            const urlId = (await SceneService.getScene(sceneId)).key
            if (urlId !== null) {
                const signedUrl = await S3Service.getSignedUrl(urlId)
                if (signedUrl) {
                    return res.status(200).json({data: signedUrl})
                }
            }
            return res.status(200).json({data: "unable to retrieve scene"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }       
    }


}