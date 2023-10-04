

import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";


export default class StudentService {
    static createStudent = async (studentData) => {
        try {
            const student = await prisma_db.student.create({
                data: {
                    ...studentData
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };

    static deleteStudent = async (studentId) => {
        try {
            const { id } = studentId;
            const student = await prisma_db.student.delete({
                where: {
                    id: id
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };

    static updateStudent = async (studentId, studentData) => {
        try {
            const { id } = studentId;
            const student = await prisma_db.student.update({
                where: {
                    id: id
                },
                data: {
                    ...studentData
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };

    static getStudentByUsername = async (username) => {
        try {
            const student = await prisma_db.student.findUnique({
                where: {
                    username: username
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };

    static getStudentById = async (studentId) => {
        try {
            const { id } = studentId;

            const student = await prisma_db.student.findUnique({
                where: {
                    id: id
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };
}



    