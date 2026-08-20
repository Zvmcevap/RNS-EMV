const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    date: {
      type: Date,
      required: [true, "Attendance date is required"],
    },

    checkIn: {
      type: String,
      required: [true, "Check in time is required"],
    },

    checkOut: {
      type: String,
      required: [true, "Check out time is required"],
    },

    status: {
      type: String,
      required: [true, "Attendance status is required"],
      enum: {
        values: ["present", "absent", "late", "leave"],
        message:
          "Status must be one of: present, absent, late, leave",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;