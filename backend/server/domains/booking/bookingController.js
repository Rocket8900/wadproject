




import Logging from "../../utils/loggings.js";
import StudentService from "../student/studentService.js";
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
            let bookingData = req.body;

            if (bookingData['lesson']) {
                // update student's lesson by instructor
                const currBooking = await BookingService.getBookingById(id)
                let pastLessons = currBooking["lesson"]
                pastLessons.push(bookingData["lesson"])
                bookingData = {"lesson":pastLessons}
            }


            if (bookingData["status"] && bookingData["status"] == "ACCEPTED") {
                // update student's instructor
                const currBooking = await BookingService.getBookingById(id)
                const studentId = currBooking["studentId"]
                const instructorId = currBooking["instructorId"]
                const student = await StudentService.updateStudent(studentId, {"instructorId": instructorId})
                if (student) {
                    Logging.info(`${instructorId} accepted booking of ${studentId}`)
                } else {
                    Logging.error("error tagging student to instructor")
                }
            }

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
            const studentId = req.user.id
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
            const instructorId = req.user.id
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