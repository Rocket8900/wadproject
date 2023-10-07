import { Server } from "socket.io";
import app from "../../app.js"
import http from "http";
import jwt from "jsonwebtoken"
import { redis_cache } from "../../utils/redisConnection.js";
import InstructorService from "../instructor/instructorService.js";
import StudentService from "../student/studentService.js";





export const startServerSocket = (io) => {

    io.use( async (socket, next) => {

      const {query} = socket.handshake
      const token  = query.token;
      
      try {

        /* 
          todo: authentication for socket 
          // todo: save the userId into the socket
          // todo: save the socket id for user (can store in redis)
          todo: store messages on mongodb
        */

        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        const userId = decoded.user.id
        socket.userData = {userId : userId} // fake user data
        await redis_cache.set(userId, socket.id); // set socketid to userid
        console.log("private messaging function in use: " + socket.id + ": " + socket.userData.userId);
        next();

      } catch (error) {
        return new Error(error);
      }
      
  

    })



    io.on("connection",  (socket) => {


      socket.on("private_message", async ({receiverId, message}) => {

        const sender = socket.userData.userId
        console.log(`${sender} send "${message}" to ${receiverId}`); 

        const receiverSocketId = await redis_cache.get(receiverId) // get socketid of user

        if (receiverSocketId) {
          // send to socket 
          console.log(`found receiver socket ${receiverSocketId}`);
          io.to(receiverSocketId).emit("private_message", {text: message, sender: "shawn"});
        }
        
        const instructorExists = await InstructorService.getInstructorById(receiverId)
        const studentExists = await StudentService.getStudentById(receiverId)
        if (instructorExists || studentExists) {
          console.log("add message to db ~");
        }
        
        // save the message to chat history

      })

      // onunload from FE to emit a response back to remove socket key pair
      socket.on("disconnect", async () => {
        console.log(socket.userData.userId + " disconncted");
        await redis_cache.del(socket.userData.userId) // del user-socket pair
        socket.disconnect();
      })

  });

} 




