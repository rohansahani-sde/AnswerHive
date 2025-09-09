const asyncHandler = require('express-async-handler');
const Notification = require('../model/notification');


const listNotifications = asyncHandler(async (req, res) => {
const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50).populate('actor', 'username');
res.json(notifications);
});


const markRead = asyncHandler(async (req, res) => {
await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
res.json({ ok: true });
});


module.exports = { listNotifications, markRead };