const performances = require("../data/performance-data.json");
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


// Get all performance reviews
const getAllPerformances = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...performances];

    const ignoredFields = [
      "page",
      "limit",
      "sort",
      "fields",
    ];

    // Simple exact-match filtering
    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((performance) => {
          const performanceValue =
            key === "employee" &&
            typeof performance.employee === "object"
              ? performance.employee._id
              : performance[key];

          if (performanceValue === undefined) {
            return false;
          }

          return (
            String(performanceValue).toLowerCase() ===
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

    const paginatedPerformances = result
      .slice(start, start + limit)
      .map(populateEmployee);

    res.status(200).json({
      status: "success",
      count: paginatedPerformances.length,
      page,
      results: paginatedPerformances.length,
      data: {
        performances: paginatedPerformances,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch performance reviews: ${error.message}`,
    });
  }
};


// Create performance review
const createPerformance = async (req, res) => {
  try {
    const performance = {
      _id: `performance-${randomUUID()}`,
      ...req.body,
    };

    performances.push(performance);

    res.status(201).json({
      status: "success",
      message: "Performance review created successfully",
      data: {
        performance: populateEmployee(performance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create performance review: ${error.message}`,
    });
  }
};


// Get performance by ID
const getPerformanceById = async (req, res) => {
  try {
    const performance = performances.find(
      (performance) => performance._id === req.params.id
    );

    if (!performance) {
      return res.status(404).json({
        status: "error",
        message: "Performance review not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        performance: populateEmployee(performance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch performance review: ${error.message}`,
    });
  }
};


// Update performance
const updatePerformance = async (req, res) => {
  try {
    const performance = performances.find(
      (performance) => performance._id === req.params.id
    );

    if (!performance) {
      return res.status(404).json({
        status: "error",
        message: "Performance review not found",
      });
    }

    Object.assign(performance, req.body);

    res.status(200).json({
      status: "success",
      message: "Performance updated successfully",
      data: {
        performance: populateEmployee(performance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update performance: ${error.message}`,
    });
  }
};


// Delete performance
const deletePerformance = async (req, res) => {
  try {
    const index = performances.findIndex(
      (performance) => performance._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Performance review not found",
      });
    }

    const [performance] = performances.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Performance deleted successfully",
      data: {
        performance: populateEmployee(performance),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete performance: ${error.message}`,
    });
  }
};


module.exports = {
  getAllPerformances,
  createPerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
};
