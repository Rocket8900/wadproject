import { Server } from "socket.io";
import app from "../../app.js"
import http from "http";
import { redis_cache } from "../../utils/redisConnection.js";
import InstructorService from "../instructor/instructorService.js";





export const startServerSocket = (io) => {

    io.use( async (socket, next) => {

      const {query} = socket.handshake
      const {authToken} = query;



      try {

        /* 
          todo: authentication for socket 
          // todo: save the userId into the socket
          // todo: save the socket id for user (can store in redis)
          todo: store messages on mongodb
        */

        
        socket.userData = {userId : "shawn"} // fake user data
        const userId = socket.userData.userId; 
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
          io.to(receiverSocketId).emit("private_message", message);
        }

        const instructorExists = await InstructorService.getInstructorById(receiverId)
        if (instructorExists) {
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




