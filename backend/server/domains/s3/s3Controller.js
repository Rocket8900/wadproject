import S3Service from "./s3Service.js"
import Logging from "../../utils/loggings.js"
import InstructorService from "../instructor/instructorService.js"
import StudentService from "../student/studentService.js"


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
            const studentId = req.user.id
            const urlId = (await StudentService.getStudentById(studentId)).selfie
            const signedUrl = await S3Service.getSignedUrl(urlId)
            if (signedUrl) {
                return res.status(200).json({data: signedUrl})
            }
            return res.status(400).json({data: "unable to retrieve image"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }       
    }

    static singleRetrieveSignedUrlsBasedOnInstructorId = async (req, res) => {
        try {
            const instructorId = req.user.id
            const urlId = (await InstructorService.getInstructorById(instructorId)).dp
            const signedUrl = await S3Service.getSignedUrl(urlId)
            if (signedUrl) {
                return res.status(200).json({data: signedUrl})
            }
            return res.status(400).json({data: "unable to retrieve image"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }       
    }
}