




import Logging from "../../utils/loggings.js";
import BookingService from "./bookingService.js";


export default class BookingController {

    static makeABooking = async (req, res) => {
        try {
            const bookingData  = req.body
            const booking = await BookingService.createBooking(bookingData);
            if (booking) {
                Logging.info("new booking created")
            } else {
                Logging.info("failed to create booking")
            }
            return res.status(201).json({data: booking})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }   
    }

    static updateBookingById = async (req, res) => {
        try {   
            const id = req.params.id
            const bookingData = req.body;
            const booking  = await BookingService.updateBooking(id, bookingData)
            if (booking) {
                Logging.info("updated booking status")
            } else {
                Logging.info("failed to update booking status")
            }
            return res.status(201).json({data: booking})
        } catch (error) {
            Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static getBookingById = async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await BookingService.getBookingById(bookingId)
            if (booking) {
                Logging.info("get booking specific booking")
            } else{ 
                Logging.info("failed to get specific booking")
            }
            return res.status(201).json({data: booking})
        } catch (error) {
            Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewAllBookingOfStudent = async (req, res) => {
        try {
            const studentId = req.params.id
            const bookings = await BookingService.getBookingsByStudent(studentId);
            if (bookings) {
                Logging.info(`get bookings for ${studentId}`)
            } else{ 
                Logging.info("failed to get bookings")
            }
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewAllBookingsOfInstructor= async (req, res) => {
        try {
            const instructorId = req.params.id
            const bookings = await BookingService.getBookingOfInstructor(instructorId);
            if (bookings) {
                Logging.info(`get bookings for ${instructorId}`)
            } else{ 
                Logging.info("failed to get bookings")
            }
            return res.status(200).json({data: bookings})
        } catch (error) {
            Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    
    static viewFilteredBookingsForStudent = async (req,res) => {
        try {
            const studentId = req.params.id
            const filters = req.body
            const bookings = await BookingService.getBookingByStudentUsingFilter(studentId, filters)
            if (bookings) {
                Logging.info(`get bookings for ${studentId}`)
            } else{ 
                Logging.info("failed to get bookings")
            }
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewFilteredBookingsForInstructor = async (req, res) => {
        try {
            const instructorId = req.params.id
            const filters = req.body;
            const bookings = await BookingService.getBookingByInstructorUsingFilter(instructorId, filters)
            if (bookings) {
                Logging.info(`get bookings for ${instructorId}`)
            } else{ 
                Logging.info("failed to get bookings")
            }
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

}