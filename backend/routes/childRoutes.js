// routes/childRoutes.js

const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');

// Create a new child
router.post('/children', childController.createChild);

// Get all children
router.get('/children', childController.getAllChildren);

// Other routes for updating, deleting, etc.

module.exports = router;
