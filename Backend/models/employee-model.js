const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    department: {
  type: String,
  required: [true, "Department is required"],
  trim: true,
},

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },

    hireDate: {
      type: Date,
      required: [true, "Hire date is required"],
    },

    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive"],
        message: "Status must be active or inactive",
      },
    },

    imageURL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;