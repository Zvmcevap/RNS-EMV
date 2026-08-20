const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },

    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters"],
      maxlength: [500, "Message must not exceed 500 characters"],
    },

    type: {
      type: String,
      required: [true, "Notification type is required"],
      enum: {
        values: [
          "announcement",
          "leave",
          "attendance",
          "payroll",
          "performance",
          "general",
        ],
        message:
          "Type must be one of: announcement, leave, attendance, payroll, performance, general",
      },
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;