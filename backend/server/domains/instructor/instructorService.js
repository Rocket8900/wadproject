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
            const instructor = await prisma_db.instructor.update({
                where: {
                    id: instructorId
                },
                data: {
                    ...instructorData
                }
            })
            return instructor
        } catch (error) {

        }
    }

    static getInstructorByEmail = async (instructorEmail) => {
        try {
            const instructor = prisma_db.instructor.findUnique({
                where: {
                    email : instructorEmail
                }
            })
            return instructor;
        } catch (error) {

        }
    }

}