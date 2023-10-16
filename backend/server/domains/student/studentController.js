
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import StudentService from "./studentService.js";
import AuthService from "../auth/authService.js";
import Logging from "../../utils/loggings.js";



export default class StudentController {

	static registerStudent = async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				res.status(400).json({ message: "all fields are mandatory" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			req.body.password = hashedPassword

			const student =  await StudentService.createStudent(req.body)

			if (student) {
				Logging.info("new student created")
				return res
					.status(201)
					.json({ message: "student successfully registered" });
			} else {
				Logging.warn("fail to create student")
				return res.status(400).json({
					message: "database error: failed to create student account",
				});
			}
		} catch (error) {
			Logging.error(error);
			return res
				.status(500)
				.json({ error: "an unexpected error occurred" });
		}
	};



	static loginStudent = async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ message: "all fields are needed" });
			}
			const student = await StudentService.getStudentByEmail(email)
			if (student && (await bcrypt.compare(password, student.password))) {

				const accessToken = AuthService.getAccessToken("student", student.id)
				const refreshToken = AuthService.getRefreshToken("student",student.id)

				res.cookie('refresh_token', refreshToken, {
					maxAge: 3 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
					// Cookie can only be accessed on the server
				});

				res.cookie("access_token",accessToken, {
					maxAge: 50 * 60 * 1000, // Expires in 50 minutes
					// Cookie can only be accessed on the server
				})

				Logging.info(`student ${student.id} logged in`)
				return res.status(201).json({
					message: "successful login",
				});
			} else {
				Logging.warn("failed login attempt")
				return res.status(401).json({ message: "incorrect password/email" });
			}
		} catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}


	static viewStudentProfile = async (req, res) => {
		try {
			const studentId = req.params.id
			const student = await StudentService.getStudentById(studentId);
			Logging.info(`retrieved student ${student.id}`)
			return res.status(200).json({data: student});
		} catch (error) {
			Logging.error(error)
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}

	static updateStudentProfile = async (req, res) => {
		try {
			const studentId = req.params.id
			const student = await StudentService.updateStudent(studentId, req.body)
			Logging.info(`updated details for student ${student.id}`)
			return res.status(201).json({data: student});
		} catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}

	static viewAllStudent = async (req, res) => {
		try {
			const students = await StudentService.getAllStudents();
			Logging.info("retrieved all students")
			return res.status(200).json({data: students})
		} catch (error) {
			Logging.error(error);
			return res.status(500).json({ error: "an unexpected error occurred" });
		}
	}






}