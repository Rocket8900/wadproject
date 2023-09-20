import InstructorService from "./instructorService.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
                const accessToken = jwt.sign(
					{
						instructor: {
							type: "instructor",
							instructor_id: instructor.id,
						},
					},
					process.env.SECRET_ACCESS_TOKEN,
					{ expiresIn: "50m" }
				);
				return res.status(201).json({
					message: "successful login",
					access_token: accessToken,
				});
			} else {
				return res.status(401).json({ message: "incorrect pasword/email" });
			}
        } catch (error) {
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }





}