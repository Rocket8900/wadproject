


import express from "express";
import BookingController from "./bookingController.js";
import AuthController from "../auth/authController.js"

const bookingRoute = express.Router()

bookingRoute.use(AuthController.validateUser)
bookingRoute.post("/", BookingController.makeABooking)


bookingRoute.get("/student", AuthController.validateStudent, BookingController.viewAllBookingOfStudent)


bookingRoute.get("/instructor", AuthController.validateInstructor, BookingController.viewAllBookingsOfInstructor)

// Now place the generic /:id route
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.patch("/:id", BookingController.updateBookingById)


export {bookingRoute as default};