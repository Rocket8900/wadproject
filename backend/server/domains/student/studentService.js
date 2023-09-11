

import { prisma_db } from "../../utils/prismaConnection.js";



export default class StudentService {
    static createStudent = (studentData) => {
        try {
            const student =  prisma_db.student.create({
                data: {
                    ...studentData
                }
            })
            return student
        } catch (error) {

        }
    }

    static deleteStudent = (studentId) => {
        try {
            const student =  prisma_db.student.delete({
                where: {
                    id: studentId
                }
            })
            return student
        } catch (error) {

        }
    }

    static updateStudent = (studentId, studentData) => {
        try {
            const student =  prisma_db.student.create({
                where: {
                    id: studentId
                },
                data: {
                    ...studentData
                }
            })
            return student
        } catch (error) {

        }
    }

    static getStudentByUsername = (username) => {
        try {
            const student =  prisma_db.student.findUnique({
                where: {
                    username: username
                }
            })
            return student
        } catch (error) {

        }
    }



    
}
