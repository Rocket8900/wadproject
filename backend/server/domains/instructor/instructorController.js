import InstructorService from "./instructorService.js"
import bcrypt from "bcryptjs";
import AuthService from "../auth/authService.js";
import Logging from "../../utils/loggings.js";
export default class InstructorController {
    
    static makeInstructorAccount = async (req, res) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "all fields are mandatory" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword
            const instructor = await InstructorService.createInstructor(req.body);
            if (instructor) {
                Logging.info(`new instructor created [${instructor.id}]`)
            } else {
                Logging.warn(`unable to create instructor`)
                return res.status(400).json({ error: "unable to create instructor object"})
            }
            return res.status(201).json({data: instructor})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }

    }

    static updateInstructorProfile = async (req, res) => {
        try {
            const instructorId = req.params
            const instructorData = req.body
            const instructor = await InstructorService.updateInstructor(instructorId, instructorData);
            if (instructor) {
                Logging.info(`new update for instructor [${instructor.id}]`)
            } else {
                Logging.warn(`unable to update instructor`)
                return res.status(400).json({ error: "unable to update instructor object"})
            }
            return res.status(201).json({data: instructor})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static loginInstructor = async (req, res) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
				res.status(400).json({ message: "all fields are needed" });
			}
            const instructor = await InstructorService.getInstructorByEmail(email);
            if (instructor && (await bcrypt.compare(password, instructor.password))) {
                const accessToken = AuthService.getAccessToken("instructor", instructor.id)
				const refreshToken = AuthService.getRefreshToken("instructor",instructor.id)
				res.cookie('refresh_token', refreshToken, {
                    maxAge: 3 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
					httpOnly: true, // Cookie can only be accessed on the server
				});
				res.cookie("access_token",accessToken, {
					maxAge: 50 * 60 * 1000, // Expires in 50 minutes
					httpOnly: true, // Cookie can only be accessed on the server
				})
                Logging.info(`login by instructor ${instructor.id}`)
				return res.status(201).json({
					message: "successful login",
				});
			} else {
                Logging.info(`attempted login for instructor ${instructor.id}`)
				return res.status(401).json({ message: "incorrect pasword/email" });
			}
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static listAllAvailableInstructor = async (req, res) => {
        try {
            const instructors = await InstructorService.getAllInstructors();
            Logging.info("retrieved all available instructors")
            return res.status(200).json({data: instructors})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewSpecificInstructor = async (req, res) => {
        try {
            const instructor = await InstructorService.getInstructorById(req.params);
            Logging.info(`retrieved information for instructor ${instructor.id}`)
            return res.status(200).json({data: instructor})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static listInstructorsByFilter = async (req, res) => {
        try {
            const instructors = await InstructorService.getInstructorsByFilters(req.body);
            Logging.info("retrieving filtered instructors")
            return res.status(200).json({data: instructors});
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });

        }

    }



}