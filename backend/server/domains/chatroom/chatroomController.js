import { Server } from "socket.io"

export default class ChatroomController {
    
    static startChatting = async (req, res) => {
        try {

            const senderId = req.user.id
            const { receiverId }  = req.params.id
            const senderSocketId = 1;
            const receiverSocketId = 3;
            

            


            
        
            /*
                sender can either a instructor or student 
                open chat -> regenerate chat history

                save sender's socket id 
                save 

                1. start connnection
                2. client gets a connection


            
            
            */ 



        } catch (error) {

        }
    }



}