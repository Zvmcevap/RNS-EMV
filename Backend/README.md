# Employee Management System

A RESTful API built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, **JWT**, **bcryptjs**, and **Multer** for managing employees and HR operations.

---

# 📌 Project Overview

The Employee Management System is a backend REST API that manages employee records and HR-related operations. It provides CRUD functionality for employees along with additional modules for departments, attendance, leave management, payroll, performance, and notifications.

The project also includes a complete authentication and authorization system that allows users to register, log in securely, access protected routes using JWT, and restrict actions based on user roles.

The Employee module has been enhanced with professional backend features including filtering, pagination, sorting, and image upload.

---

# 🚀 Features

## Authentication Module

- User Registration (Signup)
- User Login (Signin)
- Password Hashing using bcryptjs
- JWT Authentication
- Protected Routes
- Role-Based Authorization (Admin / Employee)
- View Logged-in User Profile
- Update Logged-in User Profile

## Employee Module

- Create Employee
- Get All Employees
- Get Employee by ID
- Update Employee
- Delete Employee

## Advanced API Features

- Filtering employees using query parameters
- Advanced filtering (`gt`, `gte`, `lt`, `lte`)
- Pagination
- Sorting (ascending & descending)
- Default sorting by newest employees
- Upload employee profile images using Multer
- Store uploaded image filename in MongoDB
- Serve uploaded images as static files

---

# 🛠 Technologies Used

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- Dotenv
- Nodemon
- Postman

---

# 📂 Project Structure

```text
employee-management-system/
│
├── config/
│   └── db-connect.js
│
├── controllers/
│   ├── auth-controller.js
│   ├── user-controller.js
│   ├── employee-controller.js
│   ├── department-controller.js
│   ├── attendance-controller.js
│   ├── leave-controller.js
│   ├── payroll-controller.js
│   ├── performance-controller.js
│   └── notification-controller.js
│
├── middlewares/
│   ├── authentication-middleware.js
│   ├── authorization-middleware.js
│   └── multer-middleware.js
│
├── models/
│   ├── user-model.js
│   ├── employee-model.js
│   ├── department-model.js
│   ├── attendance-model.js
│   ├── leave-model.js
│   ├── payroll-model.js
│   ├── performance-model.js
│   └── notification-model.js
│
├── routes/
│   ├── auth-routes.js
│   ├── user-routes.js
│   ├── employee-routes.js
│   ├── department-routes.js
│   ├── attendance-routes.js
│   ├── leave-routes.js
│   ├── payroll-routes.js
│   ├── performance-routes.js
│   └── notification-routes.js
│
├── uploads/
│   ├── employees/
│   └── users/
│
├── utils/
│   ├── get-jwt.js
│   └── delete-uploaded-file.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── index.js
└── README.md
```

---

# 🎯 Chosen Entities

## User

The User entity is responsible for authentication and authorization.

Each user contains:

- First Name
- Last Name
- Email
- Password
- Phone Number
- Role
- Profile Image

### User Roles

- Admin
- Employee

---

## Employee

The Employee entity is the core entity of the Employee Management System.

Each employee contains:

- First Name
- Last Name
- Email
- Phone Number
- Job Title
- Department
- Salary
- Hire Date
- Status
- Profile Image

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Navigate to the project

```bash
cd employee-management-system
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create a `.env` file

```env
PORT=5000

DB_NAME=employee_management_system

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d
```

## 5. Start the server

```bash
npm start
```

The server will run on:

```
http://localhost:5000
```

---

# 🧪 API Usage Examples

## User Signup

Register a new user and receive a JWT token.

---

## User Signin

Authenticate an existing user and receive a JWT token.

---

## User Profile

Access the authenticated user's profile.

Authorization Header:

```
Bearer <JWT_TOKEN>
```

---

## Update Profile

Update the authenticated user's profile information.

---

## Create Employee

Create a new employee with a profile image using **multipart/form-data**.

---

## Get All Employees

Retrieve all employees.

---

## Filtering

Filter employees by fields such as:

- Department
- Status
- Salary

Example query parameters:

- department
- status
- salary[gt]
- salary[gte]
- salary[lt]
- salary[lte]

---

## Pagination

Retrieve employees page by page using:

- page
- limit

The response includes:

- Current Page
- Items Per Page
- Total Items
- Total Pages

---

## Sorting

Sort employees by any field.

Examples include:

- Salary (Ascending)
- Salary (Descending)
- Hire Date
- Newest Employees (Default)

---

## Get Employee by ID

Retrieve a single employee using its MongoDB ID.

---

## Update Employee

Update employee information and optionally replace the profile image.

---

## Delete Employee

Delete an employee and remove the associated profile image from storage.

---

# 📮 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register User |
| POST | `/api/v1/auth/signin` | Login User |
| GET | `/api/v1/users/profile` | Get Logged-in User Profile |
| PATCH | `/api/v1/users/profile` | Update Logged-in User Profile |
| POST | `/api/v1/employees` | Create Employee |
| GET | `/api/v1/employees` | Get All Employees |
| GET | `/api/v1/employees/:id` | Get Employee by ID |
| PATCH | `/api/v1/employees/:id` | Update Employee |
| DELETE | `/api/v1/employees/:id` | Delete Employee |

---
