// Import necessary modules
const express = require('express');
require('dotenv').config()
const session = require('express-session'); // Import express-session
const crypt = require('crypto')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const userController = require('./controllers/userController')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Middleware for managing sessions (required for passport.session())
app.use(session({
  secret: 'your_secret_key', // Replace with a strong, random secret key for session encryption
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/dyslexia-detection-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Route to add a new user (remains unchanged)
app.post('/api/users', async (req, res) => {
  try {
    const {username,email,password} = req.body;
    let salt = crypt.randomBytes(16)
    crypt.pbkdf2(password,salt,45,16,'sha-256', async (err,hashcode)=>{
      let userDetails = {username:username,email:email,salt:salt,password:hashcode}
      const user = await User.create(userDetails);

    })
    return res.status(201).json({username:username,email:email});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all users (remains unchanged)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an existing user (remains unchanged)
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a user (remains unchanged)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

app.get('/api/users/:id', async (req,res)=>{
  try {
      const userId = req.params.id;
      console.log("Extracted User ID:", userId); // Log the extracted ID

      const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId (if applicable)

      const user = await User.findById(objectId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error
    res.status(500).json({ error: "Error fetching user" }); // Generic error message
  }
});

// Import and mount auth routes (assuming the structure)
const authRoutes = require('./routes/authRoutes'); // Assuming authRoutes.js is in the routes folder
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
