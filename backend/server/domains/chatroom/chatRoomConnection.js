import { Server } from "socket.io";
import app from "../../app.js"
import http from "http";





export const startServerSocket = (io) => {

    io.use( async (socket, next) => {

      const {query} = socket.handshake
      const {authToken} = query;



      try {
        /* 
          todo:  authentication for socket 
          todo: save the userId into the socket
          todo:  save the socket id for user (can store in redis)
        */

        socket.userData = {userId : "shawn"}

        console.log("private messaging function in use: " + socket.id + ": " + socket.userData.userId);
        next();

      } catch (error) {
        return new Error(error);
      }
  

    })



    io.on("connection", (socket) => {

      // onload of the chat page, client socket emits  "entry" 

      socket.on("private_message", ({receiverId, message}) => {

        const sender = socket.userData.userId
        console.log(`${sender} send "${message}" to ${receiverId}`); 

      })

      // onunload?? from FE to emit a response back 
      socket.on("disconnect", () => {

        socket.disconnect();

      })

  });

} 




