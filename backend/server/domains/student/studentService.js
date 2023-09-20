

import { prisma_db } from "../../utils/prismaConnection.js";



export default class StudentService {
    static createStudent = async (studentData) => {
        try {
            const student = await prisma_db.student.create({
                data: {
                    ...studentData
                }
            })
            return student
        } catch (error) {

        }
    }

    static deleteStudent = async (studentId) => {
        try {
            const {id} = studentId
            const student =  await prisma_db.student.delete({
                where: {
                    id: Number(id)
                }
            })
            return student
        } catch (error) {

        }
    }

    static updateStudent = async (studentId, studentData) => {
        try {
            const {id} = studentId

            const student =  await prisma_db.student.create({
                where: {
                    id: Number(id)
                },
                data: {
                    ...studentData
                }
            })
            return student
        } catch (error) {

        }
    }

    static getStudentByUsername = async (username) => {
        try {

            const student = await prisma_db.student.findUnique({
                where: {
                    username: username
                }
            })
            return student
        } catch (error) {

        }
    }

    static getStudentById = async (studentId) => {
        try {
            const {id} = studentId

            const student = await prisma_db.student.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return student
        } catch (error) {

        }
    }






    
}
