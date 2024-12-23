const express = require("express");
const {
  createResult,
  getAllResults,
  getResultsByUserId,
  getResultsByQuizId,
  updateResult,
  deleteResult,
} = require("../controllers/result.controller");

const router = express.Router();

router.post("/", createResult);

router.get("/", getAllResults);

router.get("/user/:userId", getResultsByUserId);

router.get("/quiz/:quizId", getResultsByQuizId);

router.put("/:resultId", updateResult);

router.delete("/:resultId", deleteResult);

module.exports = router;
