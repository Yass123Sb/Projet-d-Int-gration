const Quiz = require("../models/quizz.model");

const createQuiz = async (req, res) => {
  const { department, questions } = req.body;

  try {

    if (!department || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Department and questions are required" });
    }

    for (let question of questions) {
      if (!question.content || !question.marks || !question.negativeMarks || !Array.isArray(question.options) || question.options.length === 0) {
        return res.status(400).json({ message: "Each question must have content, marks, negativeMarks, and options" });
      }

      for (let option of question.options) {
        if (!option.content || option.isCorrect === undefined) {
          return res.status(400).json({ message: "Each option must have content and a correct answer status" });
        }
      }
    }

    const quiz = new Quiz({
      department,
      questions,
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: {
        department: quiz.department,
        questions: quiz.questions.length,
      },
    });
  } catch (error) {
    console.log("Error in creating quiz", error.message);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

const getQuizByDepartment = async (req, res) => {
  const { department } = req.params;  

  try {
    const quiz = await Quiz.findOne({ department });

    if (!quiz) {
      return res.status(404).json({ message: `No quiz found for department: ${department}` });
    }

    res.status(200).json({
      department: quiz.department,
      questions: quiz.questions,
    });
  } catch (error) {
    console.log("Error in getting quiz by department", error.message);
    res.status(500).json({ message: "Error retrieving quiz" });
  }
};

const getAllQuiz = async (req, res) => {
 

  try {
    const quizs = await Quiz.find();
    res.status(200).json({
      quizs
    });
  } catch (error) {
    console.log("Error in getting quizs", error.message);
    res.status(500).json({ message: "Error retrieving quizs" });
  }
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting Quiz", error.message);
    res.status(500).json({ message: "Error deleting Quiz" });
  }
};

module.exports = {
  createQuiz,
  getQuizByDepartment,getAllQuiz,deleteQuiz
};