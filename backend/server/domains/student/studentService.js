

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

            const student = await prisma_db.student.delete({
                where: {
                    id: studentId
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

            const student = await prisma_db.student.update({
                where: {
                    id: studentId
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

    static getStudentByEmail = async (email) => {
        try {
            const student = await prisma_db.student.findUnique({
                where: {
                    email: email
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

            const student = await prisma_db.student.findUnique({
                where: {
                    id: studentId
                }
            });
            return student;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };


    static getAllStudents = async () => {
        try {
            const students = await prisma_db.student.findMany({});
            return students;
        } catch (error) {
            Logging.error(error);
            return null;
        }
    };
}





    