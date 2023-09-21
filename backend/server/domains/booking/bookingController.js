




import BookingService from "./bookingService";


export default class BookingController {

    static makeABooking = async (req, res) => {
        try {
            const { bookingData } = req.body
            const booking = await BookingService.createBooking(bookingData);
            return res.status(201).json({data: booking})
        } catch (error) {

        }   
    }

    static updateBookingById = async (req, res) => {
        try {   
            const { id } = req.params.id
            const { bookingData } = req.body;
            const booking  = await BookingService.updateBooking(id, bookingData)
            return res.status(201).json({data: booking})
        } catch (error) {

        }
    }

    static getBookingById = async (req, res) => {
        try {
            const {id} = req.params.id;
            const booking = await BookingService.getBookingById(id)
            return res.status(201).json({data: booking})
        } catch (error) {
            
        }
    }

    static viewAllBookingForStudent = async (req, res) => {
        try {
            const {id} = req.params.id
            const bookings = await BookingService.getBookingsByStudent(id);
            return res.status(200).json({data: bookings})
        } catch (error) {

        }
    }

    
    static viewFilteredBookingsForStudent = async (req,res) => {
        try {
            const {id} = req.params.id
            const filters = req.body
            const bookings = await BookingService.getBookingByStudentUsingFilter(id, filters)
            return res.status(200).json({data: bookings})
        } catch (error) {

        }
    }

    static viewFilteredBookingsForInstructor = async (req, res) => {
        try {
            const {id} = req.params.id
            const filters = req.body;
            const bookings = await BookingService.getBookingByInstructorUsingFilter(id, filters)
            return res.status(200).json({data: bookings})
        } catch (error) {

        }
    }

}