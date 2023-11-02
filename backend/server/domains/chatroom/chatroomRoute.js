import express from "express" 
import ChatroomController from "./chatroomController.js"
import AuthController from "../auth/authController.js"


const chatRoomRoute = express.Router()

chatRoomRoute.use(AuthController.validateUser)
chatRoomRoute.get("/:id", ChatroomController.startChatting)
chatRoomRoute.post("/:id", ChatroomController.createEmptyChatHistory)
chatRoomRoute.get("/student/list", AuthController.validateStudent, ChatroomController.retrieveAllStudentChatHistory)
chatRoomRoute.get("/instructor/list", AuthController.validateInstructor, ChatroomController.retrieveAllInstructorChatHistory)


export {chatRoomRoute as default}