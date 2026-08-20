const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Department name must be at least 2 characters"],
      maxlength: [50, "Department name must be at most 50 characters"],
    },

    description: {
      type: String,
      required: [true, "Department description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [300, "Description must be at most 300 characters"],
    },

    manager: {
      type: String,
      required: [true, "Manager name is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Department location is required"],
      trim: true,
    },

    employeesCount: {
      type: Number,
      default: 0,
      min: [0, "Employees count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;