const mongoose = require("mongoose");

const statuses = ["pending", "rejected", "accepted"];

const offerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    JobPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: [true, "JobPost ID is required"],
    },
    recruterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    status: {
      type: String,
      enum: statuses,
      default: "pending",
      required: [true, "Status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;