const departments = require("../data/department-data.json");
const { randomUUID } = require("crypto");


// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...departments];

    // Simple exact-match filtering
    const ignoredFields = ["page", "limit", "sort", "fields"];

    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((department) => {
          if (department[key] === undefined) {
            return false;
          }

          return String(department[key]).toLowerCase() ===
            String(value).toLowerCase();
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
    const paginatedDepartments = result.slice(start, start + limit);

    res.status(200).json({
      status: "success",
      count: paginatedDepartments.length,
      page,
      data: {
        departments: paginatedDepartments,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch departments: ${error.message}`,
    });
  }
};


// Create department
const createDepartment = async (req, res) => {
  try {
    const department = {
      _id: `dept-${randomUUID()}`,
      ...req.body,
      name: req.body.name
        ? req.body.name.toLowerCase()
        : "",
    };

    departments.push(department);

    res.status(201).json({
      status: "success",
      message: "Department created successfully",
      data: {
        department,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create department: ${error.message}`,
    });
  }
};


// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = departments.find(
      (department) => department._id === req.params.id
    );

    if (!department) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        department,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch department: ${error.message}`,
    });
  }
};


// Update department
const updateDepartment = async (req, res) => {
  try {
    const department = departments.find(
      (department) => department._id === req.params.id
    );

    if (!department) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    Object.assign(department, req.body);

    if (req.body.name) {
      department.name = req.body.name.toLowerCase();
    }

    res.status(200).json({
      status: "success",
      message: "Department updated successfully",
      data: {
        department,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update department: ${error.message}`,
    });
  }
};


// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const index = departments.findIndex(
      (department) => department._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    const [department] = departments.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Department deleted successfully",
      data: {
        department,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete department: ${error.message}`,
    });
  }
};


module.exports = {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
