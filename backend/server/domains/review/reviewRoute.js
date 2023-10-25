import express from "express" 
import ReviewController from "./reviewController.js"
import AuthController from "../auth/authController.js"

const reviewRoute = express.Router();

reviewRoute.use(AuthController.validateUser)
reviewRoute.post("/", ReviewController.leaveAReview);
reviewRoute.get("/:id", ReviewController.viewSpecificReview)
reviewRoute.patch("/:id", ReviewController.makeChangesToReview)
reviewRoute.delete("/delete/:id", ReviewController.deleteSpecificReview)
reviewRoute.get("/instructor/:id", ReviewController.viewInstructorReviews)


export {reviewRoute as default}