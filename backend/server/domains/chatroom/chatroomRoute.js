import express from "express" 
import ChatroomController from "./chatroomController.js"

import AuthController from "../auth/authController.js"


const chatRoomRoute = express.Router()


// chatRoomRoute.get("/", AuthController.validateUser, ChatroomController.startChatting)



export {chatRoomRoute as default}