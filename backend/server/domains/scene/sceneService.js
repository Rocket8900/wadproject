import { prisma_db } from "../../utils/prismaConnection.js";
import Logging from "../../utils/loggings.js";

export default class SceneService {


    static getScene = async (sceneId) => {
        try {   
            const scene = await prisma_db.scene.findUnique({
                where: {
                    id: sceneId
                }
            })
            Logging.info("db query for scene")
            return scene
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }

    static createScene = async (sceneData) => {
        try {   
            const scene = await prisma_db.scene.create({
                data: {
                    ...sceneData
                }
            })
            Logging.info("db create scene")
            return scene
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }


    static getAllOriginScenes = async () => {
        try {   
            const scenes = await prisma_db.scene.findMany({
                where: {
                    origin: true
                }
            })
            Logging.info("db query for scene")
            return scenes
        } catch (error) {
            Logging.error(error.message)
            return null
        }
    }


}