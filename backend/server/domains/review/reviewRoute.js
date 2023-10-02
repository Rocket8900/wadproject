import express from "express" 
import ReviewController from "./reviewController.js"


const reviewRoute = express.Router();


reviewRoute.post("/write", ReviewController.leaveAReview);
reviewRoute.get("/view/:id", ReviewController.viewSpecificReview)
reviewRoute.post("/update/:id", ReviewController.makeChangesToReview)
reviewRoute.delete("/delete/:id", ReviewController.deleteSpecificReview)
reviewRoute.get("/instructor/received/:id", ReviewController.viewInstructorReviews)
reviewRoute.get("/student/:id/written", ReviewController.viewAllReviewByStudent)

export {reviewRoute as default}