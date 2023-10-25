


import express from "express";
import BookingController from "./bookingController.js";
import AuthController from "../auth/authController.js"

const bookingRoute = express.Router()

bookingRoute.use(AuthController.validateUser)
bookingRoute.post("/", BookingController.makeABooking)
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.patch("/:id", BookingController.updateBookingById)
bookingRoute.get("/student/:id", BookingController.viewAllBookingOfStudent)
bookingRoute.get("/instructor/:id", BookingController.viewAllBookingsOfInstructor)


export {bookingRoute as default};