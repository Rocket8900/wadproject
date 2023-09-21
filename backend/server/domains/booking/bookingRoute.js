


import express from "express";
import BookingController from "./bookingController.js";


const bookingRoute = express.Router()


bookingRoute.post("/create", BookingController.makeABooking)
bookingRoute.get("/:id", BookingController.getBookingById)
bookingRoute.post("/:id/update", BookingController.updateBookingById)
bookingRoute.get("/student/:id/filtered", BookingController.viewFilteredBookingsForStudent)
bookingRoute.get("/student/:id", BookingController.viewAllBookingForStudent)