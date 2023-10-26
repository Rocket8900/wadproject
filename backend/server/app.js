import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from "http";
import studentRoute from './domains/student/studentRoute.js';
import instructorRoute from './domains/instructor/instructorRoute.js';
import bookingRoute from './domains/booking/bookingRoute.js';
import reviewRoute from './domains/review/reviewRoute.js';
import { startServerSocket } from './domains/chatroom/chatRoomConnection.js';
import { Server } from "socket.io";
import Logging from './utils/loggings.js';
import chatRoomRoute from './domains/chatroom/chatroomRoute.js';
import s3Route from './domains/s3/s3Route.js';
import quizRoute from './domains/quiz/quizRoute.js';




dotenv.config()

const PORT = process.env.PORT
export const app = express()
const httpServer = http.createServer(app);  
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",  // Allow this origin
        methods: ["GET", "POST", "DELETE", "PATCH"]  // Allow these HTTP methods
    }
});

app.use(cors({
    origin: 'http://localhost:3000', // replace with your frontend's origin
    credentials: true
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    req.io = io;
    next();
})


app.use("/v1/api/student", studentRoute)
app.use("/v1/api/instructor", instructorRoute)
app.use("/v1/api/booking", bookingRoute)
app.use("/v1/api/review", reviewRoute)
app.use("/v1/api/chat", chatRoomRoute)
app.use("/v1/api/s3", s3Route)
app.use("/v1/api/quiz", quizRoute)


startServerSocket(io)


httpServer.listen(PORT, () => {  // Make sure to call listen on the httpServer, not the Express app
    Logging.log('socket & server is running on port 3001');
})



app.get("/", async (req, res) => {
    res.send("api is working...")
})


export default app
