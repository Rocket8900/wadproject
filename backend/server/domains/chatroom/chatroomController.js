import ChatroomService from "./chatroomService.js"
import Logging from "../../utils/loggings.js"


export default class ChatroomController {
    
    static startChatting = async (req, res) => {
        try {
            const senderId = req.user.id
            const receiverId = req.params.id

            let instructorId; 
            let studentId;
            const { sender, receiver } = await ChatroomService.whoIsWho(senderId, receiverId)
            console.log(sender, receiver)

            if (sender.type == "student") {
                studentId = sender.id
                instructorId = receiver.id
            } else {
                studentId = receiver.id
                instructorId = sender.id
            }
            console.log(instructorId, studentId)
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

    static retrieveAllStudentChatHistory = async (req,res) => {
        try {
            const studentId = req.user.id
            const chatHistories = await ChatroomService.getStudentChatHistory(studentId)
            if (!chatHistories) {
                Logging.error("error returning returning chat histories")
                return res.status(400).json({ error: "unable to return chat histories"})
            }
            Logging.info(`retrieved all chat history for student ${studentId}`)
            let recipients = []

            for (let chat in chatHistories) {
                recipients.push(chatHistories[chat].instructorId)
            }
            return res.status(200).json({data: recipients})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static retrieveAllInstructorChatHistory = async (req,res) => {
        try {
            const instructorId = req.user.id
            const chatHistories = await ChatroomService.getInstructorChatHistory(instructorId)
            if (!chatHistories) {
                Logging.error("error returning returning chat histories")
                return res.status(400).json({ error: "unable to return chat histories"})
            }
            let recipients = []
            for (let chat in chatHistories) {
                recipients.push(chatHistories[chat].studentId)
            }
            Logging.info(`retrieved all chat history for student ${instructorId}`)
            return res.status(200).json({data: recipients})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static createEmptyChatHistory = async (req, res) => {
        try {
            const receiverId = req.params.id
            const senderId = req.user.id

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
            const chat = await ChatroomService.createChatHistory(instructorId, studentId, []);
            if (chat) {
                Logging.info("*chat history controller* saved new message")
            } else{
                Logging.warn("*chat history controller* failed to save new message")
            }
            return res.status(201).json({data: "new chat started"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

}