// controllers/childController.js

const Child = require('../models/child');

// Create a new child
const createChild = async (req, res) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all children
const getAllChildren = async (req, res) => {
  try {
    const children = await Child.find();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other controller functions for updating, deleting, etc.

module.exports = {
  createChild,
  getAllChildren,
  // Other exported functions
};
