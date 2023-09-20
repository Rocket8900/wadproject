import { prisma_db } from "../../utils/prismaConnection.js";

export default class InstructorService {

    static createInstructor = async (instructorData) => {
        try {
            const instructor = await prisma_db.instructor.create({
                data: {
                    ...instructorData
                }
            })
            return instructor
        } catch (error) {

        }
    }


    // other crud fields not needed. 

    static updateInstructor = async (instructorId, instructorData) => {

        try {
            const {id} = instructorId;

            const instructor = await prisma_db.instructor.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...instructorData
                }
            })
            return instructor
        } catch (error) {

        }
    }

    static getInstructorById = async (instructorId) => {
        try {
            const {id} = instructorId;

            const instructor = await prisma_db.instructor.findUnique({
                where: {
                    id:  Number(id)
                }
            })
            return instructor
        } catch (error) {

        }
    }

    static getInstructorByEmail = async (instructorEmail) => {
        try {
            const instructor = await prisma_db.instructor.findUnique({
                where: {
                    email : instructorEmail
                }
            })
            return instructor;
        } catch (error) {

        }
    }


    static getInstructorsByFilters = async (filters) => {
        try {
            const instructors = await prisma_db.instructor.findMany({
                where: {
                    ...filters
                }
            })
            return instructors;
        } catch (error) {
            
        }
    }

    static getAllInstructors = async () => {
        try {
            const instructors = await prisma_db.instructor.findMany({})
            return instructors;
        } catch (error) {

        }
    }

}