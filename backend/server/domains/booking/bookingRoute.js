


import express from "express";
import BookingController from "./bookingController.js";
import AuthController from "../auth/authController.js"

const bookingRoute = express.Router()

bookingRoute.use(AuthController.validateUser)
bookingRoute.post("/", BookingController.makeABooking)
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.patch("/:id", BookingController.updateBookingById)

bookingRoute.use(AuthController.validateStudent)
bookingRoute.get("/student", BookingController.viewAllBookingOfStudent)

bookingRoute.use(AuthController.validateInstructor)
bookingRoute.get("/instructor", BookingController.viewAllBookingsOfInstructor)


export {bookingRoute as default};