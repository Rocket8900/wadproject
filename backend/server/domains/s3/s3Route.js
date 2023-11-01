// todo: endpoint to receive all the key and return their signed urls


import express from "express"
import S3Controller from "./s3Controller.js"
import AuthController from "../auth/authController.js"




const s3Route = express.Router()


s3Route.use(AuthController.validateUser)

s3Route.get("/instructor/bulk", S3Controller.bulkRetrieveSignedUrlsBasedOnInstructorId)
s3Route.get("/instructor/single", S3Controller.singleRetrieveSignedUrlsBasedOnInstructorId)

s3Route.get("/student/single", S3Controller.singleRetrieveSignedUrlsBasedOnStudentId)
s3Route.get("/instructor/single", S3Controller.singleRetrieveSignedUrlsBasedOnInstructorId)


export {s3Route as default}