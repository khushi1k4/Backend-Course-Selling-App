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
```bash
course-selling-backend/
│── models/
│   ├── Admin.js
│   ├── User.js
│   ├── Course.js
│
│── routes/
│   ├── admin.js
│   ├── user.js
│
│── middlewares/
│   ├── auth.js
│
│── app.js
│── package.json
│── README.md
```

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

### ⚙️ Installation & Setup
1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/course-selling-backend.git
cd course-selling-backend
```
2️⃣ Install dependencies
```bash
npm install
```
3️⃣ Set up environment variables
```bash
Create a .env file in the root directory:

touch .env
```

Add the following variables:
```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=3000
```
4️⃣ Run the server
```bash
npm start
```
Or for development with nodemon:
```bash
npm run dev
```

<br/>
# Learnings  # Debugging  # BrainstormAsFirstBugsResolved  # HappyDevelopment

