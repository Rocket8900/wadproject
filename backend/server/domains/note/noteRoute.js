import express from "express"
import AuthController from "../auth/authController.js"
import NoteController from "./noteController.js"



const noteRoute = express.Router();


noteRoute.use(AuthController.validateUser)
noteRoute.use(AuthController.validateStudent)


noteRoute.post("/", NoteController.saveNewNote)
noteRoute.get("/list", NoteController.retrieveAllNotesByStudent)
noteRoute.get("/:id", NoteController.retrieveSingleNote)
noteRoute.patch("/:id", NoteController.changeSpecificNote)
noteRoute.delete("/:id", NoteController.deleteNote)

export { noteRoute as default }