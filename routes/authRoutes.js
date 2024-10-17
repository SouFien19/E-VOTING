const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes
router.post('/register', authController.register); // Register a new voter
router.post('/login', authController.login); // Log in a voter
router.post('/logout', authController.logout); // Optional logout functionality

module.exports = router;
