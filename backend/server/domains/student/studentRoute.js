
// import express from "express"
// import Admin from "./auth-controllers.js"
// import { validateUser } from "../../utils/authenticate.js"

// const auth = express.Router()

// auth.post("/register", Admin.registerAdmin) // no validation
 
// auth.post("/login", Admin.loginAdmin) // no validation




// export {auth as default}

import express from "express"
import StudentController from "./studentController.js"


const studentRoute = express.Router()

studentRoute.post("/register", StudentController.registerStudent)
studentRoute.post("/login", StudentController.loginStudent)

export { studentRoute as default }