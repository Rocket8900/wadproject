import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";


export default class NoteService {
    static createNote = async (noteData) => {
        try {
            const note = await prisma_db.note.create({
                data: {
                    ...noteData
                }
            })
            return note
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }

    static updateSpecificNote = async (noteId, noteData) => {
        try {
            const note = await prisma_db.note.update({
                where: {
                    id: noteId
                },
                data: {
                    ...noteData
                }
            })
            return note
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }

    static deleteSpecificNote = async (noteId) => {
        try {
            const note = await prisma_db.note.delete({
                where: {
                    id: noteId
                },
            })
            return note
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }

    static readSpecificNote = async (noteId) => {
        try {
            const note = await prisma_db.note.findUnique({
                where: {
                    id: noteId
                }
            })
            return note
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }

    static readAllNotesByStudentId = async (studentId) => {
        try {
            const notes = await prisma_db.note.findMany({
                where: {
                    studentId: studentId
                }
            })
            return notes
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }
}


