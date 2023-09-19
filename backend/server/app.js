import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import studentRoute from './domains/student/studentRoute.js';
import instructorRoute from './domains/instructor/instructorRoute.js';




dotenv.config()

const PORT = process.env.PORT
export const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));
app.use("/v1/api/student", studentRoute)
app.use("/v1/api/instructor", instructorRoute)
app.listen(PORT, async () => {
	console.log(`Listening on port: ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("api is working...")
})

export default app
