const express = require('express');
const router = express.Router();
const { createCandidacy } = require('../controllers/candidateController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Use both authMiddleware and roleMiddleware
router.post('/create-candidacy', authMiddleware, roleMiddleware('candidate'), createCandidacy);

module.exports = router;
