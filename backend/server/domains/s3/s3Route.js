// todo: endpoint to receive all the key and return their signed urls


import express from "express"
import S3Controller from "./s3Controller.js"
import AuthController from "../auth/authController.js"




const s3Route = express.Router()


s3Route.use(AuthController.validateUser)

s3Route.get("/instructor/bulk/:id", S3Controller.bulkRetrieveSignedUrlsBasedOnInstructorId)

s3Route.get("/student/single/:id", S3Controller.singleRetrieveSignedUrlsBasedOnStudentId)
s3Route.get("/instructor/single/:id", S3Controller.singleRetrieveSignedUrlsBasedOnInstructorId)
s3Route.get("/scene/single/:id", S3Controller.singleRetrieveSignedUrlsBasedOnSceneId)

export {s3Route as default}