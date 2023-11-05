import jwt from "jsonwebtoken"
import { redis_cache } from "../../utils/redisConnection.js";
import InstructorService from "../instructor/instructorService.js";
import StudentService from "../student/studentService.js";
import ChatroomController from "./chatroomController.js";
import Logging from "../../utils/loggings.js";
import NotificationController from "../notification/notificationController.js";





export const startServerSocket = (io) => {

    io.use( async (socket, next) => {
      const {query} = socket.handshake
      const token  = query.token;
      try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        const userId = decoded.user.id
        socket.userData = {userId : userId}
        await redis_cache.set(userId, socket.id); // set socketid to userid
        Logging.info("private messaging function in use: " + socket.id + ": " + socket.userData.userId);
        next();
      } catch (error) {
        return new Error(error);
      }
    })

    io.on("connection",  (socket) => {
      socket.on("private_message", async ({receiverId, message}) => {
        const senderId = socket.userData.userId
        console.log(`${senderId} send "${message}" to ${receiverId}`); 
        const receiverSocketId = await redis_cache.get(receiverId) // get socketid of user
        const instructorExists = await InstructorService.getInstructorById(receiverId)
        const studentExists = await StudentService.getStudentById(receiverId)
        if (instructorExists || studentExists) {
          let entry = {
            text: message,
            timestamp: Date.now()
          }
          const content = await ChatroomController.saveMessage(senderId, receiverId, entry) // save message
          Logging.info("add message to db ~");
          if (receiverSocketId) {
            // send to socket 
            console.log(`found receiver socket ${receiverSocketId}`);
            io.to(receiverSocketId).emit("private_message", content);
            io.to(socket.id).emit("private_message", content);
          } else {
            // add a notification for the receiver (using receiverId)
            await NotificationController.createNewNotification(receiverId)
            Logging.info("created new notifs")
          }
        }
      })

      // onunload from FE to emit a response back to remove socket key pair
      socket.on("disconnect", async () => {
        Logging.info(socket.userData.userId + " disconncted");
        await redis_cache.del(socket.userData.userId) // del user-socket pair
        socket.disconnect();
      })

  });

} 




