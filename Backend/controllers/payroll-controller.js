const payrolls = require("../data/payroll-data.json");
const employees = require("../data/employee-data.json");
const { randomUUID } = require("crypto");


function populateEmployee(record) {
  const employeeId =
    typeof record.employee === "object"
      ? record.employee._id
      : record.employee;

  const employee = employees.find(
    (employee) => employee._id === employeeId
  );

  return {
    ...record,
    employee: employee
      ? {
          _id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          department: employee.department,
        }
      : null,
  };
}


// Get all payrolls
const getAllPayrolls = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...payrolls];

    const ignoredFields = [
      "page",
      "limit",
      "sort",
      "fields",
    ];

    // Simple exact-match filtering
    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((payroll) => {
          const payrollValue =
            key === "employee" &&
            typeof payroll.employee === "object"
              ? payroll.employee._id
              : payroll[key];

          if (payrollValue === undefined) {
            return false;
          }

          return (
            String(payrollValue).toLowerCase() ===
            String(value).toLowerCase()
          );
        });
      }
    }

    // Simple sorting
    if (req.query.sort) {
      const field = req.query.sort.replace("-", "");
      const descending = req.query.sort.startsWith("-");

      result.sort((a, b) => {
        if (a[field] === b[field]) {
          return 0;
        }

        if (descending) {
          return a[field] < b[field] ? 1 : -1;
        }

        return a[field] > b[field] ? 1 : -1;
      });
    }

    // Pagination
    const start = (page - 1) * limit;

    const paginatedPayrolls = result
      .slice(start, start + limit)
      .map(populateEmployee);

    res.status(200).json({
      status: "success",
      count: paginatedPayrolls.length,
      page,
      results: paginatedPayrolls.length,
      data: {
        payrolls: paginatedPayrolls,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch payrolls: ${error.message}`,
    });
  }
};


// Create payroll
const createPayroll = async (req, res) => {
  try {
    const payroll = {
      _id: `payroll-${randomUUID()}`,
      ...req.body,
    };

    payrolls.push(payroll);

    res.status(201).json({
      status: "success",
      message: "Payroll created successfully",
      data: {
        payroll: populateEmployee(payroll),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create payroll: ${error.message}`,
    });
  }
};


// Get payroll by ID
const getPayrollById = async (req, res) => {
  try {
    const payroll = payrolls.find(
      (payroll) => payroll._id === req.params.id
    );

    if (!payroll) {
      return res.status(404).json({
        status: "error",
        message: "Payroll not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        payroll: populateEmployee(payroll),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch payroll: ${error.message}`,
    });
  }
};


// Update payroll
const updatePayroll = async (req, res) => {
  try {
    const payroll = payrolls.find(
      (payroll) => payroll._id === req.params.id
    );

    if (!payroll) {
      return res.status(404).json({
        status: "error",
        message: "Payroll not found",
      });
    }

    Object.assign(payroll, req.body);

    res.status(200).json({
      status: "success",
      message: "Payroll updated successfully",
      data: {
        payroll: populateEmployee(payroll),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update payroll: ${error.message}`,
    });
  }
};


// Delete payroll
const deletePayroll = async (req, res) => {
  try {
    const index = payrolls.findIndex(
      (payroll) => payroll._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Payroll not found",
      });
    }

    const [payroll] = payrolls.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Payroll deleted successfully",
      data: {
        payroll: populateEmployee(payroll),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete payroll: ${error.message}`,
    });
  }
};


module.exports = {
  getAllPayrolls,
  createPayroll,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
