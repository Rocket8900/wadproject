To start the backend: 

1. get the `.env` file (in telegram) and keep it on the level as the `server` folder
2. cd into `server` folder
3. run `npm install`
4. run `npm start`


To have the `.env` file
1. in your terminal `touch .env`
2. copy-paste the .env content from telegram



## API Endpoints & Routes


### Student Endpoints

**Base Endpoint:** `/v1/api/student`

**Additional Paths**
1. `/login` 
	- **POST** request
	- Description: Login student
	- Body: `{... details of students from schema}`
	- Unauthenticated path
2. `/register`
	- **POST** request
	- Description: Register student
	- Body: `{... details of student's login info}`
	- Unauthenticated path
3. `/profile/:id`
	- **GET** request 
	- Description: Get student profile
	- Params: student's ID
	- Authenticated path
4. `/profile/:id`
	- **PATCH** request
	- Description: Update student profile
	- Params: student's ID
	- Body: `{...updated fields for student}`
	- Authenticated path


### Instructor Endpoints

**Base Endpoint**: `/v1/api/instructor`

**Additional Paths**
1. `/login` 
	- **POST** request
	- Description: Login student
	- Body: `{... details of instructor from schema}`
	- Unauthenticated path
2. `/register`
	- **POST** request
	- Description: Register instructor
	- Body: `{... details of instructor's login info}`
	- Unauthenticated path
3.  `/list`
	- **GET** request
	- Description: Get all instructors
	- Authenticated path
4. `/list`
	- **POST** request
	- Description: Get instructor based on specific queries
	- Params: `{... specfic filters}`
	- Authenticated path
5. `/profile/:id`
	- **GET** request
	- Description: Get instructor's profile
	- Params: instructor's ID
	- Authenticated path
6.  `/profile/:id`
	 - **PATCH** request
	 - Description: Update instructor's profile
	 - Params:  instructor's ID
	 - Body: `{...updated fields for instructor}`
	 - Authenticated path


### Booking Endpoints

**Base Endpoint**: `/v1/api/booking`

**Additional Paths**
1.  `/`
	- **POST** request
	- Description: Create a booking instance
	- Body: `{...details of the booking}`
	- Authenticated path
2.  `/:id`
	- **GET** request
	- Description: Get a specific booking by ID
	- Params: Booking ID
	- Authenticated path
3. `/:id`
	- **PATCH** request
	- Description: Update the booking details of that ID
	- Params: Booking ID
	- Body: `{...updated details of booking}`
	- Authenticated path
4. `/student/:id`
	- **GET** request
	- Description: Get all booking of student
	- Params: Student ID
	- Authenticated path


### Review Endpoint

**Base Endpoint**: `/v1/api/review`

**Additional Paths**
1. `/`
	- **POST** request
	- Description:  Create an new review
	- Body: `{...details of review}`
	- Authenticated path
2. `/:id`
	- **GET** request
	- Description: Get specific review by ID
	- Params: Review ID
	- Authenticated path
3. `/:id`
	- **PATCH** request
	- Description: Update specific review by ID
	- Params: Review ID
	- Body: `{...updated details of review}`
	- Authenticated path
4. `/instructor/:id`
	- **GET** request
	- Description: Get all reviews of instructor
	- Params: Instructor ID
	- Authenticated path