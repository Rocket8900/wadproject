import NotesService from "./noteService.js";
import Logging from "../../utils/loggings.js";


export default class NoteController {

    static saveNewNote = async (req, res) => {
        try {
            const studentId = req.user.id
            let noteData = req.body
            noteData["studentId"] = studentId

            const note = await NotesService.createNote(noteData);

            if (!note) {
                Logging.warn("failed to save note")
                return res.status(400).json({data: "failed to save note"})
            }

            Logging.info(`new note created and saved for ${studentId}`)
            return res.status(201).json({data: note, message: "saved new note"})

        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }
    static changeSpecificNote = async (req, res) => {
        try {

            const noteId = req.params.id
            const noteData = req.body
            const note = await NotesService.updateSpecificNote(noteId, noteData);
            if (!note) {
                Logging.warn("failed to update note")
                return res.status(400).json({data: "failed to update note"})
            }
            Logging.info(`updated note and saved`)
            return res.status(201).json({data: note, message: "updated note"})
            
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static deleteNote = async (req, res) => {
        try {
            const noteId = req.params.id
            const note = await NotesService.deleteSpecificNote(noteId);
            if (!note) {
                Logging.warn("failed to delete note")
                return res.status(400).json({data: "failed to delete note"})
            }
            Logging.info(`deleted note`)
            return res.status(201).json({data: note, message: "deleted note"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static retrieveSingleNote = async (req, res) => {
        try {
            const noteId = req.params.id
            const note = await NotesService.readSpecificNote(noteId);
            if (!note) {
                Logging.warn("failed to retrieve note")
                return res.status(400).json({data: "failed to retrieve note"})
            }
            Logging.info(`deleted note`)
            return res.status(201).json({data: note, message: "retrieved note"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    
    static retrieveAllNotesByStudent = async (req, res) => {
        try {
            const studentId = req.user.id

            const notes = await NotesService.readAllNotesByStudentId(studentId);

            if (!notes) {
                Logging.warn("failed to retrieve notes")
                return res.status(400).json({data: "failed to retrieve notes"})
            }

            Logging.info(`retrieved notes for ${studentId}`)
            return res.status(201).json({data: notes, message: "retrieved notes"})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }
}