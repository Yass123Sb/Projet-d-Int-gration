const express = require("express");
const {
  createJobPost,
  getAllJobPosts,
  getJobPostsByDepartment,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
} = require("../controllers/job.controller");

const router = express.Router();

router.post("/", createJobPost);

router.get("/", getAllJobPosts);

router.get("/department/:department", getJobPostsByDepartment);

router.get("/:id", getJobPostById);

router.put("/:id", updateJobPost);

router.delete("/:id", deleteJobPost);

module.exports = router;