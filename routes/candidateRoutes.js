const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const candidateController = require('../controllers/candidateController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Candidate registration
router.post('/register', (req, res, next) => {
    req.body.role = 'candidate'; // Set role for candidate registration
    next();
}, authController.register);

// Candidate login
router.post('/login', (req, res, next) => {
    req.body.role = 'candidate'; // Set role for candidate login
    next();
}, authController.login);
router.post('/logout', authMiddleware, authController.logout); // Protect logout if needed

// Protect these routes with authentication
router.post('/submit', authMiddleware, candidateController.submitCandidate);
router.get('/', authMiddleware, candidateController.getCandidates); // Get all candidates

module.exports = router;
