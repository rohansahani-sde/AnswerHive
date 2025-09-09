const mongoose = require('mongoose');

const uri = process.env.MONGO_URI

const connectDB = async () => {
try {
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('✅ MongoDB connected');
} catch (err) {
console.error(err);
process.exit(1);
}
};


module.exports = connectDB;