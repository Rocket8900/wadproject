import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";

export default class InstructorService {

    static createInstructor = async (instructorData) => {
        try {
            const instructor = await prisma_db.instructor.create({
                data: {
                    ...instructorData
                }
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return null

        }
    };
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
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return null

        }
    };

    static getInstructorById = async (instructorId) => {
        try {

            const instructor = await prisma_db.instructor.findUnique({
                where: {
                    id: instructorId
                }
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return null
;
        }
    };

    static getInstructorByEmail = async (instructorEmail) => {
        try {
            const instructor = await prisma_db.instructor.findUnique({
                where: {
                    email: instructorEmail
                }
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return null
        }
    };

    static getInstructorsByFilters = async (filters) => {
        try {
            const instructors = await prisma_db.instructor.findMany({
                where: {
                    ...filters
                }
            });
            return instructors;
        } catch (error) {
            Logging.error(error);
            return null

        }
    };

    static getAllInstructors = async () => {
        try {
            const instructors = await prisma_db.instructor.findMany({});
            return instructors;
        } catch (error) {
            Logging.error(error);
            return null

        }
    };
}