

import { prisma_db } from "../../utils/prismaConnection.js";
import jwt from "jsonwebtoken";

export default class AuthService {

    
    static getAccessToken =  (type, userId) => {
        try {
            const token = jwt.sign({
                student: {
                    type: type,
                    id: userId
                }
            }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "50mins"})
            return token
        } catch (error) {

        }
    }

    static getRefreshToken = (type, userId) => {
        try {
            const token = jwt.sign({
                student: {
                    type: type,
                    id: userId
                }
            }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "7d"})
            return token
        } catch (error) {

        }
    }
    static saveStudentRefreshToken = async (studentId, refreshToken) => {
        try {
            const authEntry = await prisma_db.studentToken.create({
                data: {
                    studentId: studentId,
                    refreshToken: refreshToken
                }
            })
            return authEntry
        } catch (error) {

        }
    }

    static saveInstructorRefreshToken = async (instructorId, refreshToken) => {
        try {
            const authEntry = await prisma_db.instructorToken.create({
                data: {
                    instructorId: instructorId,
                    refreshToken: refreshToken
                }
            })
            return authEntry
        } catch (error) {

        }
    }

    static updateStudentRefreshToken = async (studentId, refreshToken) => {
        try {
            const authEntry = await prisma_db.studentToken.update({
                where: {
                    studentId: studentId
                },
                data: {
                    refreshToken: refreshToken
                }
            })
            return authEntry
        } catch (error) {

        }
    }


    static updateInstructorRefreshToken = async (instructorId, refreshToken) => {
        try {
            const authEntry = await prisma_db.instructorToken.update({
                where: {
                    instructorId: instructorId
                },
                data: {
                    refreshToken: refreshToken
                }
            })
            return authEntry
        } catch (error) {

        }
    }
    


}