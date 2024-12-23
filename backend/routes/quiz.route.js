const express = require("express");
const {
createQuiz,getQuizByDepartment,getAllQuiz,deleteQuiz
} = require("../controllers/quiz.controller.js");

const router = express.Router();

router.get("/:department",getQuizByDepartment);

router.post("/", createQuiz);
router.get("/", getAllQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;