import { Server } from "socket.io"
import ChatroomService from "./chatroomService"

export default class ChatroomController {
    
    static startChatting = async (req, res) => {
        try {

            const senderId = req.user.id
            const { receiverId }  = req.params.id

            const chatHistory = await ChatroomService.getChatHistory(senderId, receiverId);

            return res.status(200).json({data: chatHistory})


        } catch (error) {

        }
    }



}