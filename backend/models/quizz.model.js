const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  marks: { type: Number, required: true },
  negativeMarks: { type: Number, required: true },
  options: [optionSchema], 
});

const quizSchema = new mongoose.Schema({
  department: { type: String, required: true },
  questions: [questionSchema], 
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;