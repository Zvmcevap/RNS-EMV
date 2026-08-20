const notifications = require("../data/notification-data.json");
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
        }
      : null,
  };
}


// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let result = [...notifications];

    const ignoredFields = [
      "page",
      "limit",
      "sort",
      "fields",
    ];

    // Simple exact-match filtering
    for (const [key, value] of Object.entries(req.query)) {
      if (!ignoredFields.includes(key)) {
        result = result.filter((notification) => {
          const notificationValue =
            key === "employee" &&
            typeof notification.employee === "object"
              ? notification.employee._id
              : notification[key];

          if (notificationValue === undefined) {
            return false;
          }

          return (
            String(notificationValue).toLowerCase() ===
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

    const paginatedNotifications = result
      .slice(start, start + limit)
      .map(populateEmployee);

    res.status(200).json({
      status: "success",
      count: paginatedNotifications.length,
      page,
      results: paginatedNotifications.length,
      data: {
        notifications: paginatedNotifications,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch notifications: ${error.message}`,
    });
  }
};


// Create notification
const createNotification = async (req, res) => {
  try {
    const notification = {
      _id: `notification-${randomUUID()}`,
      ...req.body,
    };

    notifications.push(notification);

    res.status(201).json({
      status: "success",
      message: "Notification created successfully",
      data: {
        notification: populateEmployee(notification),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create notification: ${error.message}`,
    });
  }
};


// Get notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = notifications.find(
      (notification) => notification._id === req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        notification: populateEmployee(notification),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch notification: ${error.message}`,
    });
  }
};


// Update notification
const updateNotification = async (req, res) => {
  try {
    const notification = notifications.find(
      (notification) => notification._id === req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found",
      });
    }

    Object.assign(notification, req.body);

    res.status(200).json({
      status: "success",
      message: "Notification updated successfully",
      data: {
        notification: populateEmployee(notification),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update notification: ${error.message}`,
    });
  }
};


// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const index = notifications.findIndex(
      (notification) => notification._id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found",
      });
    }

    const [notification] = notifications.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Notification deleted successfully",
      data: {
        notification: populateEmployee(notification),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete notification: ${error.message}`,
    });
  }
};


module.exports = {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
