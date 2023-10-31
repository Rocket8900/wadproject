import Logging from "../../utils/loggings.js";
import { prisma_db } from "../../utils/prismaConnection.js";



export default class BookingService {

    static createBooking = async (bookingData) => {
        try {  

            const booking = await prisma_db.booking.create({
                data: {
                    ...bookingData
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while making the booking."
            };
        }
    } 

    static updateBooking = async (bookingId, bookingData) => {
        try {

            const booking = await prisma_db.booking.update({
                where: {
                    id : bookingId
                },
                data: {
                    ...bookingData
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while updating the booking."
            };
        }
    }

    static getBookingById = async (bookingId) => {
        try {

            const booking = await prisma_db.booking.findUnique({
                where: {
                    id: bookingId
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }

    static getBookingsByStudent = async (studentId) => {
        try {
            const booking = await prisma_db.booking.findMany({
                where: {
                    studentId: studentId
                },
                include: {
                    lessons: true
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }





    static getBookingOfInstructor = async (instructorId) => {
        try {
            const booking = await prisma_db.booking.findMany({
                where: {
                    instructorId: instructorId
                }, 
                include: {
                    lessons: true
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }


    static getBookingByStudentUsingFilter = async (studentId, filter) => {
        try { 
            const booking = await prisma_db.booking.findMany({
                where: {
                    studentId: studentId
                },
                data: {
                    ...filter
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }

    static getBookingByInstructorUsingFilter = async (instructorId, filter) => {
        try { 

            const booking = await prisma_db.booking.findMany({
                where: {
                    instructorId: instructorId
                },
                data: {
                    ...filter
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }

    static getBookingBasedOnStudentIdAndInstructorId = async (instructorId, studentId) => {
        try {
            const booking = await prisma_db.booking.findUnique({
                where: {
                    instructorId: instructorId,
                    studentId: studentId
                }
            })
            return booking
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the booking."
            };
        }
    }
    


}