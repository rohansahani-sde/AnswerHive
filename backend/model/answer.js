const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
content: { type: String, required: true }, // html
upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


module.exports = mongoose.model('Answer', answerSchema);