const Result = require("../models/result.model"); 
const User = require("../models/user.model"); 


const createResult = async (req, res) => {
  const { quizId, userId, score, percentage, correct, inCorrect, unAttempt } = req.body;

  try {
    const result = new Result({
      quizId,
      userId,
      score,
      percentage,
      correct,
      inCorrect,
      unAttempt,
    });
    await User.findByIdAndUpdate(
      userId, 
      { result: result.score },
      { new: true } 
    );
    await result.save();

    res.status(201).json({
      message: "Result created successfully",
      result,
    });
  } catch (error) {
    console.log("Error in creating result", error.message);
    res.status(500).json({ message: "Error creating result" });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();

    if (!results.length) {
      return res.status(404).json({ message: "No results found" });
    }

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.log("Error in getting all results", error.message);
    res.status(500).json({ message: "Error retrieving results" });
  }
};

const getResultsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await Result.find({ userId }).populate('userId');;

    if (!results.length) {
      return res.status(404).json({ message: `No results found for user: ${userId}` });
    }

    res.status(200).json({
      results, 
    });
  } catch (error) {
    console.log("Error in getting results by user ID", error.message);
    res.status(500).json({ message: "Error retrieving results" });
  }
};

const getResultsByQuizId = async (req, res) => {
  const { quizId } = req.params;

  try {
    const results = await Result.find({ quizId });

    if (!results.length) {
      return res.status(404).json({ message: `No results found for quiz: ${quizId}` });
    }

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.log("Error in getting results by quiz ID", error.message);
    res.status(500).json({ message: "Error retrieving results" });
  }
};

const updateResult = async (req, res) => {
  const { resultId } = req.params;
  const { score, percentage, correct, inCorrect, unAttempt } = req.body;

  try {
    const result = await Result.findById(resultId);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    result.score = score || result.score;
    result.percentage = percentage || result.percentage;
    result.correct = correct || result.correct;
    result.inCorrect = inCorrect || result.inCorrect;
    result.unAttempt = unAttempt || result.unAttempt;

    await result.save();

    res.status(200).json({
      message: "Result updated successfully",
      result,
    });
  } catch (error) {
    console.log("Error in updating result", error.message);
    res.status(500).json({ message: "Error updating result" });
  }
};


const deleteResult = async (req, res) => {
  const { resultId } = req.params;

  try {
    const result = await Result.findById(resultId);
console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Delete the result
    await result.d;

    res.status(200).json({
      message: "Result deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting result", error.message);
    res.status(500).json({ message: "Error deleting result" });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultsByUserId,
  getResultsByQuizId,
  updateResult,
  deleteResult,
};
