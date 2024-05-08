const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define route for creating a new user (unchanged)
router.post('/users', userController.createUser);

// Define route for fetching all users (unchanged)
router.get('/users', userController.getAllUsers);

// Define route for getting a single user by ID
router.get('/users/:id', userController.getUserById);

// Define route for deleting a user by ID
router.delete('/users/:id', userController.deleteUser);

// Define route for updating a user (assuming put request)
router.put('/users/:id', userController.updateUser);

// Export the router
module.exports = router;
