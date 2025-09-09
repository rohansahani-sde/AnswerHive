const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/user');


const protect = asyncHandler(async (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ message: 'Not authorized' });
}
const token = authHeader.split(' ')[1];
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.userId).select('-password');
if (!user) return res.status(401).json({ message: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Token invalid' });
}
});


module.exports = { protect };