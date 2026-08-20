# 💼 Employee Management System

A modern **full-stack Employee Management System** that streamlines HR operations by providing secure employee management, authentication, profile handling, and responsive dashboards.

Built with **Angular (SSR)**, **Node.js**, **Express.js** the application focuses on performance, scalability, and clean architecture.

---

# 📸 Preview

<img width="1904" height="966" alt="image" src="https://github.com/user-attachments/assets/0ff71b00-3209-4f9b-adf9-39e2c4122bf6" />


<img width="1904" height="870" alt="image" src="https://github.com/user-attachments/assets/f12bebb1-7f43-4ae3-b63c-43dfd47f6120" />


<img width="1909" height="877" alt="image" src="https://github.com/user-attachments/assets/8aa3ddca-d173-437a-9cba-db1b29cd217a" />



```
```
## ✨ Features

### 🔐 Authentication & Authorization

* Secure user registration and login
* JWT-based authentication and authorization
* Protected routes using Angular Route Guards
* Automatic token injection with an HTTP Interceptor
* Persistent authentication across page refreshes
* Secure logout functionality

### 👨‍💼 Employee Management

* View all employees
* Add new employees
* Update employee information
* Delete employee records
* View detailed employee profiles
* Real-time employee search
* Upload employee profile pictures
* Responsive employee cards and table views

### 📷 Image Upload

* Upload employee profile images
* Live image preview before submission
* Secure file handling with Multer
* Multipart/Form-Data support

### ✅ Validation

#### Frontend

* Required field validation
* Email format validation
* Phone number validation
* Salary validation
* Instant validation feedback

#### Backend

* Duplicate email detection
* Request validation
* Centralized error handling

### ⚡ Performance

* Angular Server-Side Rendering (SSR)
* Full hydration support
* Smooth page refresh with no UI flickering
* Optimized HTTP requests
* Fast initial page load

---

# 🛠️ Tech Stack

## Frontend

* Angular 18+
* TypeScript
* Angular Router
* Standalone Components
* Angular SSR (Server-Side Rendering)
* HttpClient
* HTTP Interceptors
* Template-Driven Forms
* HTML5
* CSS3

## Backend

* Node.js
* Express.js
* Multer
* JSON Web Tokens (JWT)
* bcrypt
* CORS
* dotenv


---

# 📂 Project Structure

```text
Employee-Management-System
│
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── employees/
│   │   │   │   ├── add-employee/
│   │   │   │   ├── edit-employee/
│   │   │   │   ├── employee-card/
│   │   │   │   ├── employee-details/
│   │   │   │   └── employees/
│   │   │   ├── core/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   └── services/
│   │   │   ├── shared/
│   │   │   ├── models/
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   ├── environments/
│   │   ├── assets/
│   │   ├── main.ts
│   │   ├── main.server.ts
│   │   └── server.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```


---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Angular CLI

---

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Employee-Management-System.git

cd Employee-Management-System
```

---

# 📦 Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

or

```bash
nodemon index.js
```

Server runs on:

```
http://localhost:5000
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install
```

Run Angular:

```bash
ng serve
```

or

```bash
npm start
```

Application:

```
http://localhost:4200
```

---

# 🔗 REST API

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| POST   | `/api/v1/auth/signup`   | Register        |
| POST   | `/api/v1/auth/signin`   | Login           |
| GET    | `/api/v1/employees`     | Get Employees   |
| GET    | `/api/v1/employees/:id` | Get Employee    |
| POST   | `/api/v1/employees`     | Create Employee |
| PATCH  | `/api/v1/employees/:id` | Update Employee |
| DELETE | `/api/v1/employees/:id` | Delete Employee |

---

# 🔒 Security

* JWT Authentication
* Password hashing with bcrypt
* Protected API routes
* CORS configuration
* Environment variables
* Secure file uploads

---

# 📱 Responsive Design

The application is fully responsive and works seamlessly on:

* 💻 Desktop
* 💼 Laptop
* 📱 Tablet
* 📱 Mobile

---

# 🎯 Future Improvements

* Dashboard analytics
* Department management
* Attendance tracking
* Payroll management
* Leave management
* Employee filtering and sorting
* Pagination
* Role-Based Access Control (RBAC)
* Email notifications
* Dark Mode
* Unit & Integration Testing
* Docker support
* CI/CD pipeline

---

# 📄 License

This project is licensed under the **MIT License**.fix project structure
