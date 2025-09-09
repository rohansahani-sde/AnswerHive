const asyncHandler = require("express-async-handler");
const Answer = require("../model/answer");
const Question = require("../model/question");
const Notification = require("../model/notification");

// Get all answers for a question
const getAnswersByQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const answers = await Answer.find({ question: questionId })
    .populate("author", "username email");
  res.json(answers);
});

// Post a new answer
const postAnswer = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { questionId } = req.params;  // 👈 params se id lo

  if (!content) return res.status(400).json({ message: "Content is required" });

  const q = await Question.findById(questionId);
  if (!q) return res.status(404).json({ message: "Question not found" });

  const a = await Answer.create({
    question: questionId,
    author: req.user._id,
    content,
  });

  // Notification
  if (q.author.toString() !== req.user._id.toString()) {
    await Notification.create({
      user: q.author,
      actor: req.user._id,
      type: "answer",
      data: { questionId: q._id, answerId: a._id },
    });
  }

  res.status(201).json(a);
});

// Vote answer
const voteAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // frontend se { type: "up" } ya { type: "down" } aayega

  const a = await Answer.findById(id);
  if (!a) return res.status(404).json({ message: "Answer not found" });

  const userId = req.user._id.toString();
  a.upvotes = a.upvotes.filter((u) => u.toString() !== userId);
  a.downvotes = a.downvotes.filter((u) => u.toString() !== userId);

  if (type === "up") a.upvotes.push(userId);
  if (type === "down") a.downvotes.push(userId);

  await a.save();
  res.json(a);
});

// Accept answer
const acceptAnswer = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { answerId } = req.body;

  const q = await Question.findById(questionId);
  if (!q) return res.status(404).json({ message: "Question not found" });

  if (q.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only owner can accept" });
  }

  q.acceptedAnswer = answerId;
  await q.save();

  res.json(q);
});

module.exports = {
  getAnswersByQuestion,
  postAnswer,
  voteAnswer,
  acceptAnswer,
};
