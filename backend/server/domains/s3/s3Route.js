// todo: endpoint to receive all the key and return their signed urls


import express from "express"
import S3Controller from "./s3Controller"



const s3Route = express.Router()

s3Route.post("/bulk", S3Controller.bulkRetrieveSignedUrls)
s3Route.post("/single", S3Controller.singleRetrieveSignedUrls)


export {s3Route as default}