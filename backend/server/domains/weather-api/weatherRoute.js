import express from "express"
import AuthController from "../auth/authController.js"
import axios from "axios";
import Logging from "../../utils/loggings.js";

export const weatherRoute = express.Router();

weatherRoute.use(AuthController.validateUser)
weatherRoute.post("/", async (req, res) => {
    try {
        const {lat, lon, dt, apiKey} = req.body
        const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${apiKey}`)
        Logging.info('get weather details')
        console.log(result.data);
        res.status(200).json({data: result.data})
    } catch (error) {
        Logging.error(error.message)
        res.status(500).json({data:"internal server error"});
    }
})

export {weatherRoute as default}