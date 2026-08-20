const employees = require("../data/employee-data.json");
const { randomUUID } = require("crypto");


// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      count: employees.length,
      page: 1,
      data: {
        employees,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch employees: ${error.message}`,
    });
  }
};


// Create employee
const createEmployee = async (req, res) => {
  try {
    const employee = {
      _id: `emp-${randomUUID()}`,
      ...req.body,
      salary: req.body.salary ? Number(req.body.salary) : 0,
      department: req.body.department || "",
      status: req.body.status || "active",
      imageURL: req.file
        ? req.file.filename
        : "uploads/employees/default.jpg",
    };

    employees.push(employee);

    res.status(201).json({
      status: "success",
      message: "Employee created successfully",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create employee: ${error.message}`,
    });
  }
};


// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = employees.find(
      (employee) => employee._id === req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch employee: ${error.message}`,
    });
  }
};


// Update employee
const updateEmployee = async (req, res) => {
  try {
    const employee = employees.find(
      (employee) => employee._id === req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }

    Object.assign(employee, req.body);

    if (req.body.salary !== undefined) {
      employee.salary = Number(req.body.salary);
    }

    if (req.file) {
      employee.imageURL = req.file.filename;
    }

    res.status(200).json({
      status: "success",
      message: "Employee updated successfully",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update employee: ${error.message}`,
    });
  }
};


// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const index = employees.findIndex(
      (employee) => employee._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }

    const [employee] = employees.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Employee deleted successfully",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete employee: ${error.message}`,
    });
  }
};


module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};