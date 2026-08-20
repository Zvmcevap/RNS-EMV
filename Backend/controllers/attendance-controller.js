const attendanceRecords = require("../data/attendance-data.json");
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


// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...attendanceRecords];

    // Simple exact-match filtering
    const ignoredFields = ["page", "limit", "sort", "fields"];

    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((record) => {
          const recordValue =
            key === "employee" &&
            typeof record.employee === "object"
              ? record.employee._id
              : record[key];

          if (recordValue === undefined) {
            return false;
          }

          return (
            String(recordValue).toLowerCase() ===
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
    const paginatedAttendance = result
      .slice(start, start + limit)
      .map(populateEmployee);

    res.status(200).json({
      status: "success",
      count: paginatedAttendance.length,
      page,
      data: {
        attendance: paginatedAttendance,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch attendance records: ${error.message}`,
    });
  }
};


// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const attendance = {
      _id: `attendance-${randomUUID()}`,
      ...req.body,
      status: req.body.status
        ? req.body.status.toLowerCase()
        : "present",
    };

    attendanceRecords.push(attendance);

    res.status(201).json({
      status: "success",
      message: "Attendance record created successfully",
      data: {
        attendance: populateEmployee(attendance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create attendance record: ${error.message}`,
    });
  }
};


// Get attendance by ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = attendanceRecords.find(
      (record) => record._id === req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        attendance: populateEmployee(attendance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch attendance record: ${error.message}`,
    });
  }
};


// Update attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = attendanceRecords.find(
      (record) => record._id === req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "Attendance record not found",
      });
    }

    Object.assign(attendance, req.body);

    if (req.body.status) {
      attendance.status = req.body.status.toLowerCase();
    }

    res.status(200).json({
      status: "success",
      message: "Attendance updated successfully",
      data: {
        attendance: populateEmployee(attendance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update attendance: ${error.message}`,
    });
  }
};


// Delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const index = attendanceRecords.findIndex(
      (record) => record._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Attendance record not found",
      });
    }

    const [attendance] = attendanceRecords.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Attendance deleted successfully",
      data: {
        attendance: populateEmployee(attendance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete attendance: ${error.message}`,
    });
  }
};


module.exports = {
  getAllAttendance,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};