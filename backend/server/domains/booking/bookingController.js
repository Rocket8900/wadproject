




import Logging from "../../utils/loggings.js";
import BookingService from "./bookingService.js";


export default class BookingController {

    static makeABooking = async (req, res) => {
        try {
            const { bookingData } = req.body
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
            const { id } = req.params.id
            const { bookingData } = req.body;
            if (booking) {
                Logging.info("updated booking status")
            } else {
                Logging.info("failed to update booking status")
            }
            const booking  = await BookingService.updateBooking(id, bookingData)
            return res.status(201).json({data: booking})
        } catch (error) {
            Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });

        }
    }

    static getBookingById = async (req, res) => {
        try {
            const {id} = req.params.id;
            const booking = await BookingService.getBookingById(id)
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

    static viewAllBookingForStudent = async (req, res) => {
        try {
            const {id} = req.params.id
            const bookings = await BookingService.getBookingsByStudent(id);
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewAllBookingsOfInstructor= async (req, res) => {
        try {
            const {id} = req.params.id
            const bookings = await BookingService.getBookingOfInstructor(id);
            return res.status(200).json({data: bookings})
        } catch (error) {
            Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    
    static viewFilteredBookingsForStudent = async (req,res) => {
        try {
            const {id} = req.params.id
            const filters = req.body
            const bookings = await BookingService.getBookingByStudentUsingFilter(id, filters)
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewFilteredBookingsForInstructor = async (req, res) => {
        try {
            const {id} = req.params.id
            const filters = req.body;
            const bookings = await BookingService.getBookingByInstructorUsingFilter(id, filters)
            return res.status(200).json({data: bookings})
        } catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

}