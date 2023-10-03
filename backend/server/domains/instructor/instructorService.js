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
            return {
                error: "An error occurred while creating the instructor."
            };
        }
    };
    // other crud fields not needed. 

    static updateInstructor = async (instructorId, instructorData) => {
        try {
            const { id } = instructorId;

            const instructor = await prisma_db.instructor.update({
                where: {
                    id: id
                },
                data: {
                    ...instructorData
                }
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while updating the instructor."
            };
        }
    };

    static getInstructorById = async (instructorId) => {
        try {
            const { id } = instructorId;

            const instructor = await prisma_db.instructor.findUnique({
                where: {
                    id: id
                }
            });
            return instructor;
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the instructor."
            };
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
            return {
                error: "An error occurred while retrieving the instructor."
            };
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
            return {
                error: "An error occurred while retrieving the instructors."
            };
        }
    };

    static getAllInstructors = async () => {
        try {
            const instructors = await prisma_db.instructor.findMany({});
            return instructors;
        } catch (error) {
            Logging.error(error);
            return {
                error: "An error occurred while retrieving the instructors."
            };
        }
    };
}