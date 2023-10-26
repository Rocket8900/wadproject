import SceneService from "./sceneService.js";
import Logging from "../../utils/loggings";
import S3Service from "../s3/s3Service.js";

export default class SceneController {
  static startScene = async (req, res) => {
    try {
      const sceneId = req.params.id;
      const scene = await SceneService.getScene(sceneId);

      if (!scene) {
        Logging.warn("failed to retrieved scene");
        return res.status(400).json({ data: "scene does not exist" });
      }

      Logging.info("retrieving scene");
      return res.status(200).json({ data: scene });
    } catch (error) {
      Logging.error(error.message);
      return res.status(500).json({ error: "an unexpected error occurred" });
    }
  };

  static makeScene = async (req, res) => {
    try {
      const { body: sceneData, file: imgData } = req;
      const key = await S3Service.putObject("afterzoom", "scenes", imgData);

      if (!key) {
        Logging.warn("failed to save s3 key");
        return res.status(400).json({ data: "failed to save in s3" });
      }

      sceneData["key"] = key;
      const scene = await SceneService.createScene(sceneData);

      if (!scene) {
        Logging.warn("failed to create scene");
        return res.status(400).json({ data: "failed to create scene" });
      }

      Logging.info("creating scene");
      return res.status(200).json({ data: scene });
    } catch (error) {
      Logging.error(error.message);
      return res.status(500).json({ error: "an unexpected error occurred" });
    }
  };

  static retrieveOriginScenes = async (req, res) => {
    try {
      const scenes = await SceneService.getAllOriginScenes();

      if (!scenes) {
        Logging.warn("failed to get origin scenes");
        return res.status(400).json({ data: "failed to get scenes" });
      }

      Logging.info("retrieving origin scene");
      return res.status(200).json({ data: scenes });
    } catch (error) {
      Logging.error(error.message);
      return res.status(500).json({ error: "an unexpected error occurred" });
    }
  };
}
