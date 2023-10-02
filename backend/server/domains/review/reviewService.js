import { prisma_db } from "../../utils/prismaConnection.js";


export default class ReviewService {
    
    static createReview = (reviewData) => {
        try {
            const review = prisma_db.review.create({
                data: {
                    ...reviewData
                }
            })
            return review
        } catch (error) {

        }
    }
    static updateReview = (reviewId, reviewData) => {
        try {
            const review = prisma_db.review.update({
                where: {
                    id: reviewId
                },
                data: {
                    ...reviewData
                }
            })
            return review
        } catch (error) {
            
        }
    }

    static deleteReview = (reviewId) => {
        try {
            const review = prisma_db.review.delete({
                where: {
                    id: reviewId
                }
            })
            return review
        } catch (error) {
            
        }
    }

    static viewReviewById = (reviewId) => {
        try {
            const review = prisma_db.review.findUnique({
                where: {
                    id: reviewId
                }
            })
            return review
        } catch (error) {
            
        }
    }
    static viewAllReviewByStudentId = (studentId) => {
        try {
            const reviews = prisma_db.review.findMany({
                where: {
                    studentId: studentId
                }
            })
            return reviews
        } catch (error) {

        }
    }

    static viewReviewsOnInstructorId = (instructorId) => {
        try {
            const reviews = prisma_db.review.findMany({
                where: {
                    instructorId: instructorId
                }
            })
            return reviews
        } catch (error) {

        }
    }
    
}