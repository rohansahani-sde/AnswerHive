const express = require('express');
const router = express.Router();
const { createQuestion, getQuestion, listQuestions, getMyQuestions, searchQuestions } = require('../controller/questionController');
const { protect } = require('../middlewares/auth');


router.get('/', listQuestions);
router.get('/search', protect, searchQuestions);
router.get('/me', protect, getMyQuestions);

router.get('/:id', getQuestion);
router.post('/', protect, createQuestion);


module.exports = router;