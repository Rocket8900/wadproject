


import express from "express";
import BookingController from "./bookingController.js";


const bookingRoute = express.Router()


bookingRoute.post("/", BookingController.makeABooking)
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.patch("/:id", BookingController.updateBookingById)
bookingRoute.get("/student/:id", BookingController.viewAllBookingOfStudent)
bookingRoute.get("/instructor/:id", BookingController.viewAllBookingsOfInstructor)


export {bookingRoute as default};