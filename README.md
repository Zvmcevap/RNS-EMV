# Employee Management System

Employee Management System is an Angular-based web application for managing employees and common HR processes such as departments, attendance, time off, payroll, and performance reviews.

The project was created for the course **Razvoj naprednih spletnih uporabniških vmesnikov** and is primarily focused on demonstrating the main Angular mechanisms covered during the course.

The application consists of:

* an **Angular 22 frontend**,
* a small **Node.js / Express backend**,
* JSON/JavaScript fixture data used as the application's data source,
* JWT-based authentication and role-based authorization.

The backend is intentionally simple. Its purpose is to provide REST endpoints and authentication while the main focus of the project is the Angular frontend.

---

# Main Features

The application contains the following modules:

* Dashboard
* Employees
* Departments
* Attendance
* Time Off / Leaves
* Payroll
* Performance
* Notifications
* Users
* Login and registration

Administrators can create, edit, and delete HR records. Regular employees can log in and view the available information without access to administrator-only operations.

The Dashboard loads data from several backend endpoints and displays a current overview of the number of employees, departments, attendance records, leave records, payroll records, and performance reviews.

---

# Technologies

## Frontend

* Angular 22
* TypeScript
* Angular standalone components
* Angular Router
* Angular Template-Driven Forms
* Angular HttpClient
* RxJS
* HTTP Interceptors
* HTML
* CSS

## Backend

* Node.js
* Express.js
* JSON Web Tokens
* bcryptjs
* Multer
* CORS
* dotenv
* Nodemon

The backend uses data files stored under `Backend/data/` instead of requiring a database.

---

# Installation and Running the Project

## Requirements

Before running the application, install:

* Node.js
* npm
* Git

Angular CLI does not have to be installed globally because it is included in the frontend project's development dependencies.

---

## 1. Clone the repository

```bash
git clone https://github.com/Zvmcevap/RNS-EMV.git
cd RNS-EMV
```

---

## 2. Configure and start the backend

Open a terminal and enter the backend directory:

```bash
cd Backend
```

Install the backend dependencies:

```bash
npm install
```

The project contains a `createenv.sh` script for creating the backend environment configuration.

If necessary, make it executable:

```bash
chmod +x createenv.sh
```

Run it:

```bash
./createenv.sh
```

The resulting `.env` file must contain the JWT configuration required by the authentication system. The important values are:

```env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

`JWT_SECRET` can be any sufficiently long development secret.

No database installation is required because this version of the project uses the data under `Backend/data/`.

Start the backend:

```bash
npm start
```

The backend runs at:

```text
http://localhost:5000
```

The REST API is available under:

```text
http://localhost:5000/api/v1
```

Keep this terminal running.

---

## 3. Start the Angular frontend

Open another terminal.

From the repository root:

```bash
cd Frontend
```

Install the Angular dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
npm start
```

Open:

```text
http://localhost:4200
```

The Angular development server automatically rebuilds the frontend when source files are changed.

---

# Test Accounts

The backend contains two predefined users.

## Administrator

```text
Email:    admin@example.com
Password: Password123
```

The administrator can perform protected create, update, and delete operations.

## Employee

```text
Email:    employee@example.com
Password: Password123
```

The employee account represents a normal non-administrator user.

---

# Data Storage

The backend is intentionally lightweight and uses fixture data rather than a database.

The data can be found under:

```text
Backend/data/
```

This includes data for employees, departments, attendance, leave requests, payroll, performance, users, and other application modules.

The Express controllers expose this data through REST endpoints such as:

```text
GET /api/v1/employees
GET /api/v1/departments
GET /api/v1/attendance
GET /api/v1/leaves
GET /api/v1/payroll
GET /api/v1/performance
```

Create, update, and delete operations modify the in-memory data used by the running Node.js process.

Because the backend is intended only as a simple backend for demonstrating the Angular frontend, these changes are not permanently written back to the original fixture files. Restarting the backend therefore restores the original fixture data.

---

# Angular Requirements

The assignment requires the application to demonstrate the main Angular mechanisms covered during the course.

The following sections describe where each mechanism is implemented and how it is used.

---

# 1. Data Binding

Angular data binding is used throughout the application to connect component state with the HTML templates.

There are several forms of binding used in the project.

## Interpolation

Interpolation displays TypeScript values inside HTML.

Example:

```html
<h3>
  {{ employee.firstName }} {{ employee.lastName }}
</h3>
```

Location:

```text
Frontend/src/app/employees/employee-card/employee-card.html
```

The `employee` object exists in the TypeScript component and Angular automatically displays its current values in the template.

The Dashboard uses the same mechanism:

```html
<h3>{{ card.title }}</h3>
<h2>{{ card.value }}</h2>
```

Location:

```text
Frontend/src/app/dashboard/dashboard.html
```

When data is received from the backend and the card values change, the displayed values also change.

---

## Property Binding

Property binding is used to pass values from TypeScript to HTML element or component properties.

For example:

```html
<img [src]="imagePreview">
```

and:

```html
<button [disabled]="!employeeForm.valid || loading">
```

Location:

```text
Frontend/src/app/employees/employee-form/employee-form.html
```

The value between the brackets is evaluated by Angular and assigned to the corresponding DOM property.

Property binding is also used extensively with Angular Router:

```html
<button [routerLink]="['/employees/edit', employee._id]">
  Edit
</button>
```

---

## Event Binding

Events produced by HTML elements are connected to component methods.

Examples include:

```html
<form (ngSubmit)="onSubmit()">
```

```html
<button (click)="onDelete()">
```

```html
<input (input)="search()">
```

```html
<input type="file" (change)="onFileSelected($event)">
```

Angular calls the corresponding TypeScript method when the event occurs.

---

## Two-Way Binding

Two-way binding is implemented with `[(ngModel)]`.

For example:

```html
<input
  name="firstName"
  [(ngModel)]="employee.firstName"
>
```

This means that:

1. the current value of `employee.firstName` is displayed in the input;
2. when the user changes the input, `employee.firstName` is automatically updated.

Two-way binding is used in the login form and all create/edit forms.

Important locations include:

```text
Frontend/src/app/login/login.html
Frontend/src/app/employees/employee-form/employee-form.html
Frontend/src/app/departments/department-form/
Frontend/src/app/attendance/attendance-form/
Frontend/src/app/leaves/leave-form/
Frontend/src/app/payroll/payroll-form/
Frontend/src/app/performance/performance-form/
```

---

# 2. Input and Output

Angular `@Input()` and `@Output()` are demonstrated by the employee card component.

Location:

```text
Frontend/src/app/employees/employee-card/employee-card.ts
```

The component declares:

```ts
@Input() employee: any;
@Input() isAdmin = false;

@Output()
deleteEmployee = new EventEmitter<string>();
```

`@Input()` allows the parent component to send information into the child component.

The Employees template does this with:

```html
<app-employee-card
  [employee]="employee"
  [isAdmin]="isAdmin"
  (deleteEmployee)="deleteEmployee($event)">
</app-employee-card>
```

Location:

```text
Frontend/src/app/employees/employees.html
```

The parent sends two values into the child:

```text
employee
isAdmin
```

When the Delete button is pressed inside the child component, the child emits the employee ID:

```ts
this.deleteEmployee.emit(this.employee._id);
```

The parent receives the output event using:

```html
(deleteEmployee)="deleteEmployee($event)"
```

This demonstrates normal Angular parent-to-child communication through `@Input()` and child-to-parent communication through `@Output()` and `EventEmitter`.

---

# 3. Structural and Attribute Directives

## Structural directives / template control flow

The Dashboard uses the traditional Angular structural directive `*ngFor`:

```html
<a
  class="card"
  *ngFor="let card of cards"
  [routerLink]="card.route">
```

Location:

```text
Frontend/src/app/dashboard/dashboard.html
```

`*ngFor` creates one dashboard card for every object in the `cards` array.

The project also uses Angular's newer built-in template control-flow syntax.

Examples:

```html
@if (isAdmin) {
  ...
}
```

and:

```html
@for (employee of filteredEmployees; track employee._id) {
  ...
}
```

These are used throughout the employee and HR module templates to conditionally display elements and repeat elements based on arrays.

For example, the administrator-only Add/Edit/Delete controls are displayed conditionally using `@if (isAdmin)`.

---

## Attribute directives

The application uses `ngClass` to dynamically assign CSS classes.

For example:

```html
<span
  class="status-badge"
  [ngClass]="employee.status === 'active'
    ? 'active'
    : 'inactive'">
```

Location:

```text
Frontend/src/app/employees/employee-card/employee-card.html
```

If the employee is active, Angular applies the `active` CSS class. Otherwise it applies `inactive`.

This allows visual styling to change according to application data.

---

# 4. Template-Driven Forms — TDF

Template-Driven Forms are used for login, registration, and CRUD forms.

Angular's `FormsModule` is imported into the standalone components that contain forms.

For example:

```ts
imports: [
  CommonModule,
  FormsModule,
  RouterLink
]
```

The employee form defines a template form:

```html
<form
  (ngSubmit)="onSubmit()"
  #employeeForm="ngForm">
```

Individual controls use `ngModel`:

```html
<input
  type="email"
  name="email"
  [(ngModel)]="employee.email"
  required>
```

Angular automatically creates form-control state from the template.

Validation is also performed directly in the template:

```html
<button
  type="submit"
  [disabled]="!employeeForm.valid || loading">
  Save Employee
</button>
```

The Save button therefore remains disabled while required fields are invalid.

TDF is used in:

```text
Frontend/src/app/login/
Frontend/src/app/register/
Frontend/src/app/employees/employee-form/
Frontend/src/app/departments/department-form/
Frontend/src/app/attendance/attendance-form/
Frontend/src/app/leaves/leave-form/
Frontend/src/app/payroll/payroll-form/
Frontend/src/app/performance/performance-form/
```

These forms demonstrate:

* `FormsModule`
* `ngForm`
* `ngModel`
* two-way binding
* required fields
* HTML validation
* `(ngSubmit)`
* form validity
* create/edit forms using the same component

---

# 5. Angular Services

Communication between components and the REST backend is separated into Angular services.

The services are located in:

```text
Frontend/src/app/services/
```

Examples include:

```text
auth.ts
employee.service.ts
department.service.ts
attendance.service.ts
leave.service.ts
payroll.service.ts
performance.service.ts
```

Instead of performing HTTP requests directly inside UI components, a component injects the appropriate service.

For example:

```ts
private employeeService = inject(EmployeeService);
```

The service uses Angular `HttpClient`:

```ts
getEmployees(): Observable<any> {
  return this.http.get<any>(this.api);
}
```

The employee service provides operations such as:

```text
getEmployees()
getEmployee(id)
createEmployee(...)
updateEmployee(...)
deleteEmployee(id)
```

The same architecture is used for the Department, Attendance, Leave, Payroll, and Performance modules.

This separates responsibilities:

```text
Component
    |
    | calls
    v
Angular Service
    |
    | HTTP
    v
Express REST API
    |
    v
Fixture data
```

Components are responsible for presentation and user interaction, while services are responsible for API communication.

---

# 6. Observables

HTTP operations in Angular return RxJS `Observable` objects.

For example:

```ts
getEmployees(): Observable<any> {
  return this.http.get<any>(this.api);
}
```

The component subscribes to the Observable:

```ts
this.employeeService.getEmployees().subscribe({
  next: (res) => {
    this.employees = res?.data?.employees ?? [];
  },

  error: (err) => {
    this.error = 'Could not load employees';
  }
});
```

This asynchronous pattern is used throughout the application for loading, creating, editing, and deleting records.

A more advanced Observable example is implemented in:

```text
Frontend/src/app/dashboard/dashboard.ts
```

The Dashboard combines several API requests using RxJS `forkJoin()`:

```ts
forkJoin({
  employees: this.employeeService.getEmployees(),
  departments: this.departmentService.getDepartments(),
  attendance: this.attendanceService.getAttendance(),
  leaves: this.leaveService.getLeaves(),
  payroll: this.payrollService.getAll(),
  performance: this.performanceService.getAll()
})
```

This allows the Dashboard to request several independent data sets and process them together when the requests finish.

The Dashboard additionally uses:

```ts
catchError(...)
of(...)
```

to handle an error in one data source without making the entire Dashboard fail.

This demonstrates both basic Observable subscriptions and Observable composition using RxJS.

---

# 7. Routing

Angular routing is configured in:

```text
Frontend/src/app/app.routes.ts
```

The project contains routes for the main application pages.

Examples include:

```text
/
 /register
 /dashboard

 /employees
 /employees/add
 /employees/edit/:id

 /departments
 /departments/add
 /departments/edit/:id

 /attendance
 /attendance/add
 /attendance/edit/:id

 /leaves
 /leaves/add
 /leaves/edit/:id

 /payroll
 /payroll/add
 /payroll/edit/:id

 /performance
 /performance/add
 /performance/edit/:id

 /notifications
 /users
```

Navigation from templates is implemented with `routerLink`.

For example:

```html
<a routerLink="/employees">
  Employees
</a>
```

Routes can also contain parameters.

For example:

```text
/employees/edit/:id
```

When an edit page is opened, the component reads the parameter with `ActivatedRoute`:

```ts
this.employeeId =
  this.route.snapshot.paramMap.get('id') || '';
```

The ID is then passed to the service:

```ts
this.employeeService.getEmployee(this.employeeId)
```

After successfully saving a record, programmatic navigation is performed with Angular `Router`:

```ts
this.router.navigate(['/employees']);
```

The same pattern is used by the other create/edit form components.

The wildcard route:

```ts
{
  path: '**',
  redirectTo: 'dashboard'
}
```

must remain the final route because Angular evaluates routes from top to bottom.

---

# 8. JWT and HTTP Interceptors

Authentication is implemented with JSON Web Tokens.

The authentication process crosses both the backend and frontend.

## Step 1 — Login request

The Angular authentication service sends credentials to:

```text
POST /api/v1/auth/signin
```

Location:

```text
Frontend/src/app/services/auth.ts
```

The backend verifies the user's email and password.

Location:

```text
Backend/controllers/auth-controller.js
```

Passwords are compared using `bcryptjs`.

---

## Step 2 — Backend creates a JWT

After successful authentication, the backend generates a JWT.

Location:

```text
Backend/utils/get-jwt.js
```

The JWT contains information such as:

```text
user ID
user role
```

and is signed using:

```text
JWT_SECRET
```

from the backend `.env` file.

The token expiration is configured with:

```text
JWT_EXPIRES_IN
```

---

## Step 3 — Angular stores the token

After successful login, the Login component stores authentication information in browser `localStorage`.

Location:

```text
Frontend/src/app/login/login.ts
```

Values include:

```text
token
role
user
```

The role is also used by the frontend to decide whether administrator controls should be visible.

For example, the Employees page checks:

```ts
const role = localStorage.getItem('role');

this.isAdmin =
  role?.toLowerCase() === 'admin';
```

The template can then conditionally display administrator controls.

---

## Step 4 — HTTP interceptor adds the JWT

The interceptor is located at:

```text
Frontend/src/app/interceptors/auth.interceptor.ts
```

For browser requests it checks:

```ts
const token = localStorage.getItem('token');
```

If a JWT exists, the outgoing request is cloned and receives:

```http
Authorization: Bearer <token>
```

The important interceptor code is conceptually:

```ts
const clonedReq = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`
  }
});

return next(clonedReq);
```

This means components do not have to manually add the JWT every time an authenticated API endpoint is called.

The interceptor is registered globally in:

```text
Frontend/src/app/app.config.ts
```

using:

```ts
provideHttpClient(
  withInterceptors([authInterceptor])
)
```

---

## Step 5 — Backend verifies the token

Protected backend routes first use:

```text
Backend/middlewares/authentication-middleware.js
```

The middleware reads:

```http
Authorization: Bearer <token>
```

and verifies the token using:

```js
jwt.verify(token, process.env.JWT_SECRET)
```

The decoded information is assigned to:

```js
req.user
```

---

## Step 6 — Role authorization

Administrator-only operations also use:

```text
Backend/middlewares/authorization-middleware.js
```

For example, creating, editing, and deleting employees requires:

```js
authorizationMiddleware("admin")
```

If a user has no valid JWT, the API returns HTTP `401 Unauthorized`.

If the user is authenticated but does not have the required role, the API returns HTTP `403 Forbidden`.

This completes the JWT flow:

```text
Login form
    |
    v
AuthService
    |
    v
POST /auth/signin
    |
    v
Backend validates password
    |
    v
Backend creates JWT
    |
    v
Angular stores JWT
    |
    v
HTTP Interceptor
    |
    v
Authorization: Bearer <JWT>
    |
    v
Authentication middleware
    |
    v
Authorization middleware
    |
    v
Protected operation
```

---

# Example: Complete Employee Data Flow

The Employees module demonstrates many of the required concepts together.

The component requests employee data through:

```text
EmployeeService
```

The service returns an Observable containing the backend response.

`Employees` subscribes to the Observable and stores the returned array.

The template iterates over the array and creates an `EmployeeCardComponent` for every employee.

The employee object enters the card through `@Input()`.

Administrator state is also passed using `@Input()`.

When Delete is pressed, `EmployeeCardComponent` emits an event through `@Output()`.

The parent receives the employee ID and calls `EmployeeService.deleteEmployee()`.

The JWT interceptor attaches the current authentication token.

The Express backend verifies the JWT and confirms that the user has the `admin` role before deleting the record.

This single feature therefore demonstrates:

```text
Angular services
Observables
data binding
Input / Output
template control flow
attribute directives
routing
JWT
interceptors
role authorization
```

---

# Project Structure

A simplified overview of the most relevant directories is:

```text
RNS-EMV/
│
├── Backend/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── createenv.sh
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   └── app/
    │       ├── attendance/
    │       │   └── attendance-form/
    │       ├── dashboard/
    │       ├── departments/
    │       │   └── department-form/
    │       ├── employees/
    │       │   ├── employee-card/
    │       │   └── employee-form/
    │       ├── interceptors/
    │       ├── leaves/
    │       │   └── leave-form/
    │       ├── login/
    │       ├── notifications/
    │       ├── payroll/
    │       │   └── payroll-form/
    │       ├── performance/
    │       │   └── performance-form/
    │       ├── register/
    │       ├── services/
    │       ├── users/
    │       ├── app.config.ts
    │       └── app.routes.ts
    │
    ├── package.json
    └── angular.json
```

---

# Building the Frontend

To create a production build:

```bash
cd Frontend
npm run build
```

Angular creates the build output under the project's `dist/` directory.

---

# Summary of Assignment Requirements

| Requirement                          | Main example                                                   |
| ------------------------------------ | -------------------------------------------------------------- |
| Data binding                         | `employee-form.html`, `employee-card.html`, `dashboard.html`   |
| Input / Output                       | `employee-card.ts` and `employees.html`                        |
| Structural directives / control flow | `*ngFor`, `@for`, `@if`                                        |
| Attribute directives                 | `[ngClass]` in `employee-card.html`                            |
| TDF                                  | Login and all create/edit forms                                |
| Angular services                     | `Frontend/src/app/services/`                                   |
| Observables                          | HTTP services, component subscriptions, Dashboard `forkJoin()` |
| Routing                              | `app.routes.ts`, `routerLink`, `ActivatedRoute`, `Router`      |
| JWT                                  | Backend authentication and token generation                    |
| Interceptors                         | `auth.interceptor.ts`, registered in `app.config.ts`           |

The application therefore demonstrates all Angular mechanisms required by the project assignment while keeping the backend deliberately simple and focused on providing data and authentication to the Angular frontend.
