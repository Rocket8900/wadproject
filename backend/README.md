## API Endpoints & Routes

### Student Endpoints

**Base Endpoint:** `/v1/api/student`

1. `/login` (POST)
   - Description: Login student
   - Body: 
     ```json
     {
       "email": "student@example.com",
       "password": "password123"
     }
     ```
   - Unauthenticated path

2. `/register` (POST)
   - Description: Register student
   - Body:
     ```json
     {
       "selfie": "image_url",
       "age": 25,
       "name": "Student Name",
       "email": "student@example.com",
       "password": "password123",
       "gender": "Male",
       "type": "auto",
       "language": "English",
       "instructorId": null
     }
     ```
   - Unauthenticated path

3. `/profile/:id` (GET)
   - Description: Get student profile
   - Params: student's ID
   - Authenticated path

4. `/profile` (PATCH)
   - Description: Update student profile
   - Body:
     ```json
     {
       "selfie": "updated_image_url",
       "age": 26,
       "name": "Updated Student Name",
       "email": "updated_student@example.com",
       "gender": "Female",
       "type": "manual",
       "language": "Spanish"
     }
     ```
   - Authenticated path (Just pass in JWT token)

### Instructor Endpoints

**Base Endpoint:** `/v1/api/instructor`

1. `/login` (POST)
   - Description: Login instructor
   - Body:
     ```json
     {
       "email": "instructor@example.com",
       "password": "password123"
     }
     ```
   - Unauthenticated path

2. `/register` (POST)
   - Description: Register instructor
   - Body:
     ```json
     {
       "picture": ["image_url1", "image_url2"],
       "name": "Instructor Name",
       "age": 30,
       "affiliation": "SSDC",
       "gender": "Male",
       "email": "instructor@example.com",
       "password": "password123",
       "language": "English",
       "experience": 5,
       "type": "auto",
       "carModel": "Toyota"
     }
     ```
   - Unauthenticated path

3. `/list` (GET)
   - Description: Get instructors based on specific queries
   - Query:
     - `filterField1`: "value1"
     - `filterField2`: "value2"
   - Authenticated path

4. `/profile/:id` (GET)
   - Description: Get instructor's profile
   - Params: instructor's ID
   - Authenticated path

5. `/profile` (PATCH)
   - Description: Update instructor's profile
   - Body:
     ```json
     {
       "picture": ["updated_image_url1", "updated_image_url2"],
       "name": "Updated Instructor Name",
       "age": 31,
       "affiliation": "CDC",
       "gender": "Female",
       "experience": 6,
       "type": "both",
       "carModel": "Honda"
     }
     ```
   - Authenticated path (Just pass in JWT token)

### Booking Endpoints

**Base Endpoint:** `/v1/api/booking`

1. `/` (POST)
   - Description: Create a booking instance
   - Body:
     ```json
     {
       "studentId": "student_id",
       "instructorId": "instructor_id",
       "lesson": [{}]
     }
     ```
   - Authenticated path

2. `/:id` (GET)
   - Description: Get a specific booking by ID
   - Params: Booking ID
   - Authenticated path

3. `/:id` (PATCH)
   - Description: Update the booking details of that ID
   - Params: Booking ID
   - Body:
     ```json
     {
       "lesson": [{}]
     }
     ```
   - Authenticated path

4. `/student` (GET)
   - Description: Get all bookings of a student
   - Authenticated path (Just pass in JWT token)


5. `/instructor` (GET)
   - Description: Get all bookings of a Instructor
   - Authenticated path (Just pass in JWT token)


### Review Endpoint

**Base Endpoint:** `/v1/api/review`

1. `/` (POST)
   - Description: Create a new review
   - Body:
     ```json
     {
       "studentId": "student_id",
       "instructorId": "instructor_id",
       "rating": 4.5
     }
     ```
   - Authenticated path

2. `/:id` (GET)
   - Description: Get a specific review by ID
   - Params: Review ID
   - Authenticated path

3. `/:id` (PATCH)
   - Description: Update a specific review by ID
   - Params: Review ID
   - Body:
     ```json
     {
       "rating": 4.8
     }
     ```
   - Authenticated path

4. `/instructor/:id` (GET)
   - Description: Get all reviews of an instructor
   - Params: Instructor ID
   - Authenticated path



To start the backend: 

1. get the `.env` file (in telegram) and keep it on the level as the `server` folder
2. cd into `server` folder
3. run `npm install`
4. run `npm start`


To have the `.env` file
1. in your terminal `touch .env`
2. copy-paste the .env content from telegram

