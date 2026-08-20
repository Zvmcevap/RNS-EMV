const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    month: {
      type: Number,
      required: [true, "Month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"],
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2020, "Year is invalid"],
    },

    basicSalary: {
      type: Number,
      required: [true, "Basic salary is required"],
      min: [0, "Basic salary cannot be negative"],
    },

    bonus: {
      type: Number,
      default: 0,
      min: [0, "Bonus cannot be negative"],
    },

    deductions: {
      type: Number,
      default: 0,
      min: [0, "Deductions cannot be negative"],
    },

    totalSalary: {
      type: Number,
      required: [true, "Total salary is required"],
      min: [0, "Total salary cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

module.exports = Payroll;