const mongoose = require('mongoose');

// Database connection URL
const DB_URL = 'mongodb://127.0.0.1:27017/dyslexia-detection-app';

// Establish MongoDB connection
mongoose.connect(DB_URL)
.then(() => console.log('Connected to MongoDB database'))
.catch((error) => console.error('MongoDB connection error:', error));

// Export mongoose instance
module.exports = mongoose;
