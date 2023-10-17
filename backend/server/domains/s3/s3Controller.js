import S3Service from "./s3Service.js"
import Logging from "../../utils/loggings.js"

export default class S3Controller {
    static bulkRetrieveSignedUrls = async (req, res) => {
        try {
            const urls = req.body // [...urls]
            let result = []
            urls.forEach(async urlId => {
                const signedUrl = await S3Service.getSignedUrl("instructor", urlId)
                result.push(signedUrl)
            });
            return res.status(200).json({data: result}) 
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static singleRetrieveSignedUrls = async (req, res) => {
        try {
            const urlId = req.params.id
            const signedUrl = await S3Service.getSignedUrl("student", urlId)
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