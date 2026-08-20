const leaves = require("../data/leave-data.json");
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


// Get all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...leaves];

    const ignoredFields = [
      "page",
      "limit",
      "sort",
      "fields",
    ];

    // Simple exact-match filtering
    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((leave) => {
          const leaveValue =
            key === "employee" &&
            typeof leave.employee === "object"
              ? leave.employee._id
              : leave[key];

          if (leaveValue === undefined) {
            return false;
          }

          return (
            String(leaveValue).toLowerCase() ===
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

    const paginatedLeaves = result
      .slice(start, start + limit)
      .map(populateEmployee);

    res.status(200).json({
      status: "success",
      count: paginatedLeaves.length,
      page,
      results: paginatedLeaves.length,
      data: {
        leaves: paginatedLeaves,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch leave requests: ${error.message}`,
    });
  }
};


// Create leave request
const createLeave = async (req, res) => {
  try {
    const leave = {
      _id: `leave-${randomUUID()}`,
      ...req.body,
      leaveType: req.body.leaveType
        ? req.body.leaveType.toLowerCase()
        : "",
      status: req.body.status
        ? req.body.status.toLowerCase()
        : "pending",
    };

    leaves.push(leave);

    res.status(201).json({
      status: "success",
      message: "Leave request created successfully",
      data: {
        leave: populateEmployee(leave),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create leave request: ${error.message}`,
    });
  }
};


// Get leave by ID
const getLeaveById = async (req, res) => {
  try {
    const leave = leaves.find(
      (leave) => leave._id === req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        status: "error",
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        leave: populateEmployee(leave),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch leave request: ${error.message}`,
    });
  }
};


// Update leave request
const updateLeave = async (req, res) => {
  try {
    const leave = leaves.find(
      (leave) => leave._id === req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        status: "error",
        message: "Leave request not found",
      });
    }

    Object.assign(leave, req.body);

    if (req.body.leaveType) {
      leave.leaveType = req.body.leaveType.toLowerCase();
    }

    if (req.body.status) {
      leave.status = req.body.status.toLowerCase();
    }

    res.status(200).json({
      status: "success",
      message: "Leave request updated successfully",
      data: {
        leave: populateEmployee(leave),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update leave request: ${error.message}`,
    });
  }
};


// Delete leave request
const deleteLeave = async (req, res) => {
  try {
    const index = leaves.findIndex(
      (leave) => leave._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Leave request not found",
      });
    }

    const [leave] = leaves.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Leave request deleted successfully",
      data: {
        leave: populateEmployee(leave),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete leave request: ${error.message}`,
    });
  }
};


module.exports = {
  getAllLeaves,
  createLeave,
  getLeaveById,
  updateLeave,
  deleteLeave,
};