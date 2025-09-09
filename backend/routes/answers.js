const express = require("express");
const router = express.Router();
const {
  postAnswer,
  voteAnswer,
  acceptAnswer,
  getAnswersByQuestion,
} = require("../controller/answerController");
const { protect } = require("../middlewares/auth");

router.get("/:questionId/answers", getAnswersByQuestion);
router.post("/:questionId/answers", protect, postAnswer);
router.post("/:questionId/accept", protect, acceptAnswer);

// ✅ Standalone for voting
router.post("/vote/:id", protect, voteAnswer);


module.exports = router;
