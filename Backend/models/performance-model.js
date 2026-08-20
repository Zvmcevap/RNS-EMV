const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    reviewDate: {
      type: Date,
      required: [true, "Review date is required"],
    },

    reviewer: {
      type: String,
      required: [true, "Reviewer is required"],
      trim: true,
    },

    score: {
      type: Number,
      required: [true, "Performance score is required"],
    },

    goals: {
      type: String,
      required: [true, "Goals are required"],
      trim: true,
      maxlength: [500, "Goals must not exceed 500 characters"],
    },

    comments: {
      type: String,
      trim: true,
      maxlength: [1000, "Comments must not exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Performance = mongoose.model("Performance", performanceSchema);

module.exports = Performance;