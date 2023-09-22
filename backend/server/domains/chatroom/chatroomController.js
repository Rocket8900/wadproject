import { Server } from "socket.io"
import http from "http";

export default class ChatroomController {
    
    static startChatting = async (req, res) => {
        try {
            const senderId = req.user.id
            const { receiverId }  = req.params.id

            
        
            /*
                1. start connnection


            
            
            */ 



        } catch (error) {

        }
    }



}