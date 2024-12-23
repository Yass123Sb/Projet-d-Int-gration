const JobPost = require("../models/job.model");  

const createJobPost = async (req, res) => {
  const { userId, department, title, region, degree, description, salary } = req.body;

  try {
    const jobPost = new JobPost({
      userId,
      department,
      title,
      region,
      degree,
      description,
      salary,
    });

    await jobPost.save();

    res.status(201).json({
      message: "Job post created successfully",
      jobPost,
    });
  } catch (error) {
    console.log("Error in creating job post", error.message);
    res.status(500).json({ message: "Error creating job post" });
  }
};

const getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find().populate("userId"); 

    if (!jobPosts.length) {
      return res.status(404).json({ message: "No job posts found" });
    }

    res.status(200).json({
      jobPosts,
    });
  } catch (error) {
    console.log("Error in getting all job posts", error.message);
    res.status(500).json({ message: "Error retrieving job posts" });
  }
};

const getJobPostsByDepartment = async (req, res) => {
  const { department } = req.params;

  try {
    const jobPosts = await JobPost.find({ department }).populate("userId");

    if (!jobPosts.length) {
      return res.status(404).json({ message: `No job posts found for department: ${department}` });
    }

    res.status(200).json({
      jobPosts,
    });
  } catch (error) {
    console.log("Error in getting job posts by department", error.message);
    res.status(500).json({ message: "Error retrieving job posts by department" });
  }
};

const getJobPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobPost = await JobPost.findById(id).populate("userId");

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json({
      jobPost,
    });
  } catch (error) {
    console.log("Error in getting job post by ID", error.message);
    res.status(500).json({ message: "Error retrieving job post by ID" });
  }
};

const updateJobPost = async (req, res) => {
  const { jobPostId } = req.params;
  const { department, title, region, degree, description, salary } = req.body;

  try {
    const jobPost = await JobPost.findById(jobPostId);

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    jobPost.department = department || jobPost.department;
    jobPost.title = title || jobPost.title;
    jobPost.region = region || jobPost.region;
    jobPost.degree = degree || jobPost.degree;
    jobPost.description = description || jobPost.description;
    jobPost.salary = salary || jobPost.salary;

    await jobPost.save();

    res.status(200).json({
      message: "Job post updated successfully",
      jobPost,
    });
  } catch (error) {
    console.log("Error in updating job post", error.message);
    res.status(500).json({ message: "Error updating job post" });
  }
};

const deleteJobPost = async (req, res) => {
  const { id } = req.params;

  try {
    const jobPost = await JobPost.findByIdAndDelete(id);


    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json({
      message: "Job post deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting job post", error.message);
    res.status(500).json({ message: "Error deleting job post" });
  }
};

module.exports = {
  createJobPost,
  getAllJobPosts,
  getJobPostsByDepartment,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
};
