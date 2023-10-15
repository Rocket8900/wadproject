

import Logging from "../../utils/loggings.js";
import { prisma_db } from "../../utils/prismaConnection.js";
import jwt from "jsonwebtoken";

export default class AuthService {

    
    static getAccessToken =  (type, userId) => {
        try {
            const token = jwt.sign({
                user: {
                    type: type,
                    id: userId
                }
            }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "50mins"})
            return token
        } catch (error) {
            Logging.error(error);
            return null;
        }
    }

    static getRefreshToken = (type, userId) => {
        try {
            const token = jwt.sign({
                user: {
                    type: type,
                    id: userId
                }
            }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "7d"})
            return token
        } catch (error) {
            Logging.error(error);
            return null;
        }
    }
}