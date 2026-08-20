const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    leaveType: {
      type: String,
      required: [true, "Leave type is required"],
      enum: {
        values: ["annual", "sick", "unpaid", "maternity"],
        message:
          "Leave type must be one of: annual, sick, unpaid, maternity",
      },
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Status must be pending, approved or rejected",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;