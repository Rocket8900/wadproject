
import Logging from "../../utils/loggings.js";
import ReviewService from "./reviewService.js";




export default class ReviewController {

    static leaveAReview = async (req, res) => {
        try {
            const reviewData = req.body;
            const review = await ReviewService.createReview(reviewData);
            if (review){
                Logging.info("new review created")
            } else {
                Logging.warn(`unable to create a review`)
                return res.status(400).json({ error: "unable to create review object"})
            }
            return res.status(201).json({data: review})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static viewSpecificReview = async (req,res) => {
        try {
            const {id}  = req.params
            const review = await ReviewService.viewReviewById(id);
            if (review){
                Logging.info("queried for specific review")
            } else {
                Logging.warn(`unable to query specific review`)
                return res.status(400).json({ error: "unable to get review object"})
            }
            return res.status(200).json({data: review})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }

    static makeChangesToReview = async(req, res) => {
        try {
            const {id}  = req.params
            const reviewData = req.body;
            const review = await ReviewService.updateReview(id, reviewData);
            if (review){
                Logging.info("updated details for specific review")
            } else {
                Logging.warn(`unable to update specific review`)
                return res.status(400).json({ error: "unable to update review object"})
            }
            return res.status(201).json({data: review})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static deleteSpecificReview = async (req, res) => {
        try {
            const {id}  = req.params
            const review = await ReviewService.deleteReview(id);
            return res.status(201).json({data: review})
        } catch (error) {   

        }
    }

    static viewInstructorReviews = async (req, res) => {
        try {
            const {id} = req.params 
            const reviews = await ReviewService.viewReviewsOnInstructorId(id);
            if (reviews){
                Logging.info(`queried for review on instructor: ${id}`)
            } else {
                Logging.warn(`unable to query for review on instructor: ${id}`)
                return res.status(400).json({ error: "unable to get review object for instructor"})
            }
            return res.status(200).json({data: reviews})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }

    static viewAllReviewByStudent = async (req, res) => {
        try {
            const {id} = req.params
            const reviews = await ReviewService.viewAllReviewByStudentId(id);
            if (reviews){
                Logging.info(`queried for review on student: ${id}`)
            } else {
                Logging.warn(`unable to query for review on student: ${id}`)
                return res.status(400).json({ error: "unable to get review object for student"})
            }
            return res.status(200).json({data: reviews})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }



}