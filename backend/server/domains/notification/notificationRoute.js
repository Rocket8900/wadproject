import NotificationController from "./notificationController.js";
import AuthController from "../auth/authController.js";
import express from "express"

const notificationRoute = express.Router()

notificationRoute.use(AuthController.validateUser)


notificationRoute.get("/latest", NotificationController.getUserNotificationStatus)
notificationRoute.patch("/latest", NotificationController.userReadsNotification)


export {notificationRoute as default}