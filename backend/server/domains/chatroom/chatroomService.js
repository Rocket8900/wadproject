import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";
import StudentService from "../student/studentService.js";
import InstructorService from "../instructor/instructorService.js";

export default class ChatroomService {


    
    static getChatHistory = async (instructorId, studentId) => {
        try { 
            const chatHistory = await prisma_db.chatHistory.findUnique({
                where: {
                    studentId_instructorId: {
                        studentId: studentId,
                        instructorId: instructorId
                    }     
                }
            })
            Logging.info("*chat history service* db query for chat history")
            return chatHistory
        } catch (error) {
            Logging.error(error)
            return null
        }
    }

    static getStudentChatHistory = async (studentId) => {
        try {
            const chatHistories = await prisma_db.chatHistory.findMany({
                where: {
                    studentId: studentId
                }
            })
            Logging.info("*chat history* db query for all chat history for student")
            return chatHistories
        } catch (error) {
            Logging.error(error)
            return null
        }
    } 

    static getInstructorChatHistory = async (instructorId) => {
        try {
            const chatHistories = await prisma_db.chatHistory.findMany({
                where: {
                    instructorId: instructorId
                }
            })
            Logging.info("*chat history* db query for all chat history for instructor")
            return chatHistories
        } catch (error) {
            Logging.error(error)
            return null
        }
    } 

    static createChatHistory = async (instructorId, studentId, message) => {
        try {
            const chatHistory = await prisma_db.chatHistory.create({
                data: {
                    studentId: studentId,
                    instructorId: instructorId,
                    message: message
                }
            })
            Logging.info("*chat history service* db create new chat history")
            return chatHistory
        } catch (error) {
            Logging.error(error)
            return null
        }
    } 

    static updateChatHistory = async (studentId, instructorId, newHistory) => {
        try {
            const allMessage = await prisma_db.chatHistory.update({
                where: {
                    studentId_instructorId: {
                        studentId: studentId,
                        instructorId: instructorId
                    },
                },
                data : {
                    message: newHistory
                }
            })
            Logging.info("*chat history service* db updated chat history")
            return allMessage
        } catch (error) {
            Logging.error(error)
            return null
        }
    }


    static whoIsWho = async(senderId, receiverId) => {
        try {
            let studentId;
            let instructorId;
            let result;
            const isStudent = await StudentService.getStudentById(senderId)
            if (isStudent) {
                const isInstructor = await InstructorService.getInstructorById(receiverId)
                studentId = senderId
                instructorId = receiverId
                result = {
                    sender: {
                        type: "student",
                        id: studentId,
                        name: isStudent.name

                }, 
                    receiver: {
                        type: "instructor",
                        id: instructorId,
                        name: isInstructor.name
                }}
            } else {
                const student = await StudentService.getStudentById(receiverId)
                const instructor = await InstructorService.getInstructorById(senderId)
                studentId = receiverId
                instructorId = senderId
                result = {
                    receiver: {
                        type: "student",
                        id: studentId,
                        name: student.name

                }, 
                    sender: {
                        type: "instructor",
                        id: instructorId,
                        name: instructor.name
                }}
            }
            return result
        } catch (error) {
            Logging.error(error)
            return null;
        }
    }

}
