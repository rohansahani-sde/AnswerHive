const asyncHandler = require('express-async-handler');
const question = require('../model/question');
const Tag = require('../model/tag');
const answer = require('../model/answer');


// Create question
const createQuestion = asyncHandler(async (req, res) => {
const { title, description, tags = [] } = req.body;
if (!title || !description) return res.status(400).json({ message: 'Missing fields' });
// Ensure tags exist or create them
const tagIds = [];
for (const t of tags) {
let tag = await Tag.findOne({ name: t });
if (!tag) tag = await Tag.create({ name: t });
tagIds.push(tag._id);
}
const q = await question.create({ 
  title, 
  description, 
  tags: tagIds, 
  author: req.user._id });
res.status(201).json(q);
});


const getQuestion = asyncHandler(async (req, res) => {
const q = await question.findById(req.params.id)
.populate('author', 'username')
.populate('tags', 'name');
// .populate({ path: 'acceptedAnswer' });

if (!q) return res.status(404).json({ message: 'Not found' });
q.views += 1;
await q.save();
res.json(q);
});


const getMyQuestions = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 🔹 Fetch questions of current user
  const questions = await question.find({ author: userId })
    .populate("tags", "name")
    .populate("author", "username");

  // 🔹 For each question, fetch its answers
  const formatted = await Promise.all(
    questions.map(async (q) => {
      const answers = await answer.find({ question: q._id })
        .populate("author", "username");

      return {
        _id: q._id,
        title: q.title,
        description: q.description,
        tags: q.tags.map((t) => t.name),
        author: q.author?.username || "Unknown",
        views: q.views,
        createdAt: q.createdAt,
        answersCount: answers.length,
        answers: answers.map((a) => ({
          _id: a._id,
          content: a.content,
          author: a.author?.username || "Unknown",
          upvotes: a.upvotes?.length || 0,
          downvotes: a.downvotes?.length || 0,
          createdAt: a.createdAt,
        })),
      };
    })
  );

  res.status(200).json({
    success: true,
    count: formatted.length,
    questions: formatted,
  });
});

// GET /api/questions?search=keyword
//  for search 
const searchQuestions = asyncHandler(async (req, res) => {
  const search = req.query.search || "";

  const questions = await question.find({
    title: { $regex: search, $options: "i" } // case-insensitive search
  })
  .populate("author", "username")
  .sort({ createdAt: -1 })
  .limit(50);
  res.json(questions);
});


// GET single question with answers
// const getQuestion = asyncHandler( async (req, res) => {
//   try {
//     const question = await question.findById(req.params.id)
//       .populate("answers")  // agar answers ek alag model hai
//       .populate("author", "username email avatarUrl"); 

//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     res.json(question.answers); // sirf answers bhejna hai
//   } catch (err) {
//     console.error("Error fetching question:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


const listQuestions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tag } = req.query;
  const filter = {};

  // 🔹 Agar tag diya ho to uske id find karo
  if (tag) {
    const t = await Tag.findOne({ name: tag });
    if (t) filter.tags = t._id;
    else return res.json({ results: [], page, total: 0 });
  }

  // 🔹 Questions find karo
  const results = await question.find(filter)
    .populate("author", "username")
    .populate("tags", "name");

  const total = await question.countDocuments(filter);

  // 🔹 Har question ka answers fetch karo
  const formatted = await Promise.all(
    results.map(async (q) => {
      const answers = await answer.find({ question: q._id })
        .populate("author", "username"); // ✅ sirf author populate karo

      return {
        _id: q._id,
        title: q.title,
        description: q.description,
        askedBy: q.author?.username || "Unknown",
        upvotes: q.upvotes ? q.upvotes.length : 0,
        downvotes: q.downvotes ? q.downvotes.length : 0,
        answersCount: answers.length,
        views: q.views,
        answers: answers.map((a) => ({
          _id: a._id,
          content: a.content,  // ✅ direct content return karo
          author: a.author?.username || "Unknown",
          upvotes: a.upvotes ? a.upvotes.length : 0,
          downvotes: a.downvotes ? a.downvotes.length : 0,
          createdAt: a.createdAt,
        })),
        tags: q.tags.map((t) => t.name),
        createdAt: q.createdAt,
      };
    })
  );

  res.json({
    results: formatted,
    page: Number(page),
    total,
  });
});





module.exports = { createQuestion, getQuestion, listQuestions, getMyQuestions, searchQuestions };