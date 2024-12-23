const Offer = require("../models/offer.model");
const JobPost = require("../models/job.model");
// Create a new offer
const createOffer = async (req, res) => {
  const { userId, JobPostId, status,recruterId } = req.body;

  try {
    const offer = new Offer({
      userId,
      JobPostId,
      status,
      recruterId
    });

    await offer.save();

    res.status(201).json({
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.log("Error in creating offer", error.message);
    res.status(500).json({ message: "Error creating offer" });
  }
};

// Get all offers
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("userId").populate("JobPostId");

    if (!offers.length) {
      return res.status(404).json({ message: "No offers found" });
    }

    res.status(200).json({
      offers,
    });
  } catch (error) {
    console.log("Error in getting all offers", error.message);
    res.status(500).json({ message: "Error retrieving offers" });
  }
};

// Get offers by JobPost ID
const getOffersByJobPostId = async (req, res) => {
  const { JobPostId } = req.params;

  try {
    const offers = await Offer.find({ JobPostId }).populate("userId");

    if (!offers.length) {
      return res.status(404).json({ message: `No offers found for JobPost ID: ${JobPostId}` });
    }

    res.status(200).json({
      offers,
    });
  } catch (error) {
    console.log("Error in getting offers by JobPost ID", error.message);
    res.status(500).json({ message: "Error retrieving offers by JobPost ID" });
  }
};

// Get offer by ID
const getOfferById = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offer.findById(id).populate("userId").populate("JobPostId");

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      offer,
    });
  } catch (error) {
    console.log("Error in getting offer by ID", error.message);
    res.status(500).json({ message: "Error retrieving offer by ID" });
  }
};

// Update an offer
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.status = status || offer.status;

    await offer.save();

    res.status(200).json({
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    console.log("Error in updating offer", error.message);
    res.status(500).json({ message: "Error updating offer" });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      message: "Offer deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting offer", error.message);
    res.status(500).json({ message: "Error deleting offer" });
  }
};

const getJobOffersByRecruiter = async (req, res) => {
  const { recruterId } = req.params;

  try {
    // Find all offers for this recruiter by the correct field 'recruterId'
    const offers = await Offer.find({ recruterId: recruterId })
      .populate("userId", "name email")  // Candidate details
      .populate("JobPostId", "title department");  // Job post details

    if (!offers.length) {
      return res.status(404).json({ message: "No job offers found for this Recruiter" });
    }

    res.status(200).json({
      message: "Job offers retrieved successfully",
      offers,
    });
  } catch (error) {
    console.log("Error in getting job offers by Recruiter", error.message);
    res.status(500).json({ message: "Error retrieving job offers by Recruiter" });
  }
};

// Get job offers by candidate (by userId in Offer)
const getJobOffersByCandidate = async (req, res) => {
  const { candidateId } = req.params;

  try {
    // Find all offers created by the candidate
    const offers = await Offer.find({ userId: candidateId })
      .populate("JobPostId", "title department userId")
      .populate(
"recruterId"
      );

    if (!offers.length) {
      return res.status(200).json({ message: "No job offers found for this candidate" });
    }

    res.status(200).json({
      message: "Job offers retrieved successfully",
      offers,
    });
  } catch (error) {
    console.log("Error in getting job offers by candidate", error.message);
    res.status(500).json({ message: "Error retrieving job offers by candidate" });
  }
};


module.exports = {
  createOffer,
  getAllOffers,
  getOffersByJobPostId,
  getOfferById,
  updateOffer,
  deleteOffer,
  getJobOffersByRecruiter,
  getJobOffersByCandidate,
};