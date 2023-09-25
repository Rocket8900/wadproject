
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import StudentService from "./studentService.js";



export default class StudentController {

	static registerStudent = async (req, res) => {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				res.status(400).json({ message: "all fields are mandatory" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			req.body.password = hashedPassword

			const student =  await StudentService.createStudent(req.body) 

			if (student) {
				return res
					.status(201)
					.json({ message: "student successfully registered" });
			} else {
				return res.status(400).json({
					message: "database error: failed to create student account",
				});
			}
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ error: "an unexpected error occurred" });
		}
	};



	static loginStudent = async (req, res) => {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				res.status(400).json({ message: "all fields are needed" });
			}
			const student = await StudentService.getStudentByUsername(username)
			if (student && (await bcrypt.compare(password, student.password))) {
				const accessToken = jwt.sign(
					{
						student: {
							type: "student",
							student_id: student.id,
						},
					},
					process.env.SECRET_ACCESS_TOKEN,
					{ expiresIn: "50m" }
				);

				const refreshToken = jwt.sign(
					{
						student: {
							type: "student",
							student_id: student.id,
						},
					},
					process.env.SECRET_ACCESS_TOKEN,
					{ expiresIn: "7d" } // Set the expiration time for the refresh token
				);

				res.cookie('refresh_token', refreshToken, {
					maxAge: 50 * 60 * 1000, // Expires in 50 minutes
					httpOnly: true, // Cookie can only be accessed on the server
				});

				res.header("Authorization", `Bearer ${accessToken}`)

				return res.status(201).json({
					message: "successful login",
				});
			} else {
				return res.status(401).json({ message: "incorrect password/email" });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}


	static viewStudentProfile = async (req, res) => {
		try {
			const student = await StudentService.getStudentById(req.params);
			return res.status(200).json({data: student});
		} catch (error) {
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}

	static updateStudentProfile = async (req, res) => {
		try {
			const student = await StudentService.updateStudent(req.params, req.body)
			return res.status(201).json({data: student});
		} catch (error) {
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}


}