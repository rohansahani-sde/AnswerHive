const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String, required: true }, // save html from editor
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
views: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model('Question', questionSchema);