


import express from "express";
import BookingController from "./bookingController.js";


const bookingRoute = express.Router()


bookingRoute.post("/create", BookingController.makeABooking)
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.post("/:id", BookingController.updateBookingById)
bookingRoute.get("/student/:id", BookingController.viewAllBookingOfStudent)
bookingRoute.get("/student/:id/filtered", BookingController.viewFilteredBookingsForStudent)


export {bookingRoute as default};