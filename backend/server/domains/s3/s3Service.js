import Logging from "../../utils/loggings.js";
import s3 from "./s3Connection.js";

export default class S3Service {
  static putObject = async (bucketName, folderName, file) => {
    try {
      let params = {
        Bucket: bucketName,
        Key: `${folderName}/${file.userId}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      };

      if (folderName == "instructor") {
        params = {
          Bucket: bucketName,
          Key: `${folderName}/${file.userId}_${Date.now()}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentLength: file.size,
        };
      }
      const data = await s3.upload(params).promise();
      if (data) {
        Logging.info("uploaded new photo to s3 bucket");
        return data;
      } else {
        Logging.warn("failed to upload photo onto s3 bucket");
        return null;
      }
    } catch (error) {
      Logging.error(error);
      return null;
    }
  };
  

  static getSignedUrl = async (objectKey) => {
    try {
      Logging.info("getting s3 signed url");
      const params = { Bucket: "afterzoom", Key: objectKey, Expires: 60 * 100 }; // URL expires in 5 minutes
      return s3.getSignedUrl("getObject", params);
    } catch (error) {
      Logging.error(error);
      return null;
    }
  };
}
