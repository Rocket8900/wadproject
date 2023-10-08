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

        }
    }

    static getBookingsByStudent = async (studentId) => {
        try {
            const booking = await prisma_db.booking.findMany({
                where: {
                    studentId: studentId
                }
            })
            return booking
        } catch (error) {

        }
    }





    static getBookingOfInstructor = async (instructorId) => {
        try {
            const booking = await prisma_db.booking.findMany({
                where: {
                    instructorId: instructorId
                }
            })
            return booking
        } catch (error) {
            
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

        }
    }

    


}