const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const employeeRoutes = require("./routes/employee-routes");
const departmentRoutes = require("./routes/department-routes");
const attendanceRoutes = require("./routes/attendance-routes");
const leaveRoutes = require("./routes/leave-routes");
const payrollRoutes = require("./routes/payroll-routes");
const notificationRoutes = require("./routes/notification-routes");
const performanceRoutes = require("./routes/performance-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());

// Serve uploaded employee images
app.use(
  "/api/v1/uploads",
  express.static(path.join(process.cwd(), "uploads", "employees"))
);

// Routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/leaves", leaveRoutes);
app.use("/api/v1/payroll", payrollRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/performance", performanceRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Employee Management System API is running",
  });
});

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});