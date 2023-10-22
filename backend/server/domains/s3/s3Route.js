// todo: endpoint to receive all the key and return their signed urls


import express from "express"
import S3Controller from "./s3Controller.js"



const s3Route = express.Router()

s3Route.get("/bulk/:id", S3Controller.bulkRetrieveSignedUrlsBasedOnInstructorId)
s3Route.get("/single/:id", S3Controller.singleRetrieveSignedUrlsBasedOnStudentId)


export {s3Route as default}