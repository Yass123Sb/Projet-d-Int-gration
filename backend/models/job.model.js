const mongoose = require("mongoose");

const departments = [
	"Informatique",
	"Télécommunications",
	"Électronique",
	"Génie Civil",
	"Mécanique",
	"Génie Industriel",
	"Énergétique",
	"Génie Biologique",
	"Automatique",
	"Mathématiques Appliquées",
];

const jobPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    department: {
      type: String,
      enum: departments,
      required: [true, "department is required"],
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    region: {
      type: String,
      required: [true, "Region is required"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
    },
    description: {
      type: String
    },
    salary: {
      type: String, 
    },
  },
  {
    timestamps: true,
  }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;