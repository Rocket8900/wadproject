import Logging from "../../utils/loggings.js";
import jwt from "jsonwebtoken";

export default class AuthController {

    static getAccessTokenFromHeaders(req) {
        const authHeaders = req.headers.authorization || req.headers.Authorization;
        if (authHeaders && authHeaders.startsWith("Bearer ")) {
            return authHeaders.split(" ")[1];
        }
        return null;
    }

    static verifyAccessToken(accessToken, req, res, next) {
        jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                AuthController.verifyRefreshToken(req, res, next);
            } else if (err) {
                return res.status(401).json({ message: "unauthorized access" });
            } else {


                req.user = decoded.user;

                next();
            }
        });
    }

    static verifyRefreshToken(req, res, next) {
        const refreshToken = req.cookies.refreshToken; // Adjust based on where you store the refresh token
        jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, decodedRefresh) => {
            if (err) {
                return res.status(401).json({ message: "please log in again" });
            } else {
                const newAccessToken = jwt.sign({ user: decodedRefresh.user }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1h' }); // Adjust expiration time as needed
                res.cookie('accessToken', newAccessToken); // Adjust based on how you want to send the token
                req.user = decodedRefresh.user;
                Logging.info("regenerating access token");
                next();
            }
        });
    }

    static async validateUser(req, res, next) {
        try {
            const accessToken = AuthController.getAccessTokenFromHeaders(req);
            if (accessToken) {
                Logging.info("verifying access token");
                AuthController.verifyAccessToken(accessToken, req, res, next);
            } else {
                return res.status(401).json({ message: "unauthorized access" });
            }
        } catch (error) {
            res.status(500).json({ error: "an unexpected error occurred" });
        }
    }
}

