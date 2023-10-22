


import express from "express";
import SceneController from "./sceneController.js";
import AuthController from "../auth/authController.js";
import multer from "multer";

const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); 

const sceneRoute = express.Router()

sceneRoute.get("/", SceneController.retrieveOriginScenes)
sceneRoute.get("/:id", SceneController.startScene)
sceneRoute.post("/new", upload.single('photo'), SceneController.makeScene)

export {sceneRoute as default}

