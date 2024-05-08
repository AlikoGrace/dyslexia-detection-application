const User = require('../models/User');
const crypt = require('crypto')
// Create a new user (unchanged)
const createUser = async (req, res) => {
  try {
    const {username,email,password} = req.body;
    let salt = crypt.randomBytes(16)
    let hashcode
    crypt.pbkdf2(password,salt,45,16,'sha-256',(err,hashcode)=>{
      hashcode = hashcode
    })
    let userDetails = {username:username,email:email,salt:salt,password:hashcode}
    console.log(userDetails)
    const user = await User.create(userDetails);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (unchanged)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Extracted User ID:", userId); // Log the extracted ID

    const objectId = mongoose.Types.ObjectId(userId); // Convert to ObjectId (if applicable)

    const user = await User.findById(objectId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error
    res.status(500).json({ error: "Error fetching user" }); // Generic error message
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user (assuming PUT request)
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body; // The update data will be in the request body

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }); // Update and return the updated user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controller functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
