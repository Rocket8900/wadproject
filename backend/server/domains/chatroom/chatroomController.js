import { Server } from "socket.io"
import ChatroomService from "./chatroomService.js"
import { startServerSocket } from "./chatRoomConnection.js"
import Logging from "../../utils/loggings.js"
import StudentService from "../student/studentService.js"
import InstructorService from "../instructor/instructorService.js"

export default class ChatroomController {
    
    static startChatting = async (req, res) => {
        try {
            const senderId = req.user.id
            const receiverId = req.params.id
            let instructorId; 
            let studentId;
            const { sender, receiver } = await ChatroomService.whoIsWho(senderId, receiverId)
            if (sender.type == "student") {
                studentId = sender.id
                instructorId = receiver.id
            } else {
                studentId = receiver.id
                instructorId = sender.id
            }
            console.log(receiver, sender)
            const chatHistory = await ChatroomService.getChatHistory(instructorId, studentId);
            return res.status(200).json({data: chatHistory})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({error: "internal server error"})
        }
    }

    static saveMessage = async (senderId, receiverId, entry) => {
        try {
            const { sender, receiver } = await ChatroomService.whoIsWho(senderId, receiverId)
            let instructorId; 
            let studentId;
            if (sender.type == "student") {
                studentId = sender.id
                instructorId = receiver.id
            } else {
                studentId = receiver.id
                instructorId = sender.id
            }
            const chat = await ChatroomService.getChatHistory
            (instructorId, studentId)
            entry["sender"] = sender
            entry["receiver"] = receiver
            if (chat) {
                let currentChat = chat.message
                currentChat.push(entry)
                console.log(entry)
                const updatedChat = await ChatroomService.updateChatHistory(studentId, instructorId, currentChat)
                if (updatedChat) {
                    Logging.info("*chat history controller* saved new message")
                } else {
                    Logging.warn("*chat history controller* failed to save new message")
                }
            } else {
                const chat = await ChatroomService.createChatHistory(instructorId, studentId, [entry])
                if (chat) {
                    Logging.info("*chat history controller* saved new message")
                } else{
                    Logging.warn("*chat history controller* failed to save new message")
                }
            }
            console.log(entry)
            return entry
        } catch (error) {
            return null
        }
    }


}