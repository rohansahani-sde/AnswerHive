const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


const generateToken = (user) => jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


// Register
// const register = asyncHandler(async (req, res) => {
// const { username, email, password } = req.body;
// if (!username || !email) return res.status(400).json({ message: 'Missing fields' });
// const existing = await User.findOne({ $or: [{ email }, { username }] });
// if (existing) return res.status(400).json({ message: 'User already exists' });
// const user = await User.create({ username, email, password });
// res.status(201).json({ user: { id: user._id, username: user.username, email: user.email }, token: generateToken(user) });
// });
const register =  (async (req, res) => {
  const { username, email, password } = req.body;

  console.log("REQ BODY:", req.body); // 🟢 Debug print

  // Validate fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create user
  const user = await User.create({ username, email, password });

  res.status(201).json({
    user: { id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id),
  });
});



// Login
const login = asyncHandler(async (req, res) => {
const { emailOrUsername, password } = req.body;
const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const match = await user.comparePassword(password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });
res.json({ user: { id: user._id, username: user.username, email: user.email }, token: generateToken(user) });
});


module.exports = { register, login };