# CourseSellingApp-Backend
A backend API for managing and selling courses, built with Node.js, Express, MongoDB, JWT, bcrypt, and Zod.
This project demonstrates authentication, role-based access control, input validation, and secure password handling — essential skills for backend development.
### 🚀 Backend-Course-Selling-App Features

#### 👩‍🏫 Admin

- Sign up and login with secure password hashing (bcrypt)
- Create new courses
- View all created courses

#### 👩‍🎓 User

- Sign up and login with JWT authentication
- View all available courses
- Purchase courses
- View purchased courses

#### 🔒 Security & Validation

- Passwords stored as bcrypt hashes
- JWT-based authentication middleware for protected routes
- Zod validation for request body inputs

#### 🛠 Tech Stack

- Node.js – Backend runtime
- Express.js – Web framework
- MongoDB & Mongoose – Database & ODM
- bcrypt – Password hashing
- jsonwebtoken (JWT) – Authentication
- zod – Input validation

#### 📂 Folder Structure
course-selling-backend/
<br/>
│── models/
<br/>
│   ├── Admin.js
<br/>
│   ├── User.js
<br/>
│   ├── Course.js
<br/>
│
<br/>
│── routes/
<br/>
│   ├── admin.js
<br/>
│   ├── user.js
<br/>
│
<br/>
│── middlewares/
<br/>
│   ├── auth.js
<br/>
│
<br/>
│── app.js
<br/>
│── package.json
<br/>
│── README.md


### 📌API Endpoints

#### 🔹 Admin Routes

- POST /admin/signup → Register new admin
- POST /admin/signin → Login as admin
- POST /admin/course → Create a new course
- PUT /admin/updateCourse → Update a course
- GET /admin/courses → View all created courses

#### 🔹 User Routes

- POST /users/signup → Register new user
- POST /users/signin → Login as user
- POST /users/courses/:courseId → Purchase a course

#### 🔹 Course Routes

- POST /course/purchase → Courses that are being purchase by the user, that user info being added into it too
- GET /course/preview → View all courses on the platform

<br/>
# Learnings  # Debugging  # BrainstormAsFirstBugsResolved  # HappyDevelopment
