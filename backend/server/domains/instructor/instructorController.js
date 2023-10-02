import InstructorService from "./instructorService.js"
import bcrypt from "bcryptjs";
import AuthService from "../auth/authService.js";

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


            return res.status(201).json({data: instructor})

        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }

    }

    static updateInstructorProfile = async (req, res) => {
        try {
            const instructorId = req.params
            const instructorData = req.body
            const instructor = await InstructorService.updateInstructor(instructorId, instructorData);
            return res.status(201).json({data: instructor})
        } catch (error) {
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
				const saveToken = await AuthService.saveIntructorRefreshToken(instructor.id, refreshToken)

                if (saveToken) {
					console.log("refresh token saved")	
				}

				res.cookie('refresh_token', refreshToken, {
					maxAge: 50 * 60 * 1000, // Expires in 50 minutes
					httpOnly: true, // Cookie can only be accessed on the server
				});

				res.header("Authorization", `Bearer ${accessToken}`)

				return res.status(201).json({
					message: "successful login",
				});

			} else {
				return res.status(401).json({ message: "incorrect pasword/email" });
			}
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static listAllAvailableInstructor = async (req, res) => {
        try {
            const instructors = await InstructorService.getAllInstructors();
            return res.status(200).json({data: instructors})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static viewSpecificInstructor = async (req, res) => {
        try {
            const instructor = await InstructorService.getInstructorById(req.params);
            return res.status(200).json({data: instructor})
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


    static listInstructorsByFilter = async (req, res) => {
        try {
            const instructors = await InstructorService.getInstructorsByFilters(req.body);
            return res.status(200).json({data: instructors});
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });

        }

    }



}