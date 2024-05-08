// routes/mlRoutes.js

const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');

// Route to analyze test results
router.post('/analyze', mlController.analyzeTestResults);

module.exports = router;
