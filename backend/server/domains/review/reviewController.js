
import ReviewService from "./reviewService";




export default class ReviewController {

    static leaveAReview = async (req, res) => {
        try {
            const reviewData = req.body;
            const review = await ReviewService.createReview(reviewData);
            return res.status(201).json({data: review})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }


    static viewSpecificReview = async (req,res) => {
        try {
            const {id}  = req.params
            const review = await ReviewService.viewReviewById(id);
            return res.status(200).json({data: review})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }

    static makeChangesToReview = async(req, res) => {
        try {
            const {id}  = req.params
            const reviewData = req.body;
            const review = await ReviewService.makeChangesToReview(id, reviewData);
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
            return res.status(200).json({data: reviews})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }

    static viewAllReviewByStudent = async (req, res) => {
        try {
            const {id} = req.params
            const reviews = await ReviewService.viewAllReviewByStudentId(id);
            return res.status(200).json({data: reviews})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }



}