const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  correct: { type: Number, required: true },
  inCorrect: { type: Number, required: true },
  unAttempt: { type: Number, required: true },

});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;