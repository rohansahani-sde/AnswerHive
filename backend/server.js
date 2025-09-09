require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db/db');
const cors = require('cors');


const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const notificationRoutes = require('./routes/notifications');


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


// simple socket setup to broadcast notifications (optional)
io.on('connection', (socket) => {
console.log('socket connected', socket.id);
socket.on('join', (userId) => {
socket.join(userId); // join room by user id
});
});


// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // must be true if frontend sends cookies
}));

app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/questions', answerRoutes);   // ✅ answers nested under /api/questions

app.use('/api/notifications', notificationRoutes);



// connect DB and start
const PORT = process.env.PORT || 5000;
connectDB();
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = { app, io };