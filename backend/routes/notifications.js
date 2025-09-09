const express = require('express');
const router = express.Router();
const { listNotifications, markRead } = require('../controller/notificationController');
const { protect } = require('../middlewares/auth');


router.get('/', protect, listNotifications);
router.post('/mark-read', protect, markRead);


module.exports = router;