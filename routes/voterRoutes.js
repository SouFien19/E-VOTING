const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Protect these routes with authentication
router.post('/cast-vote', authMiddleware, voterController.castVote);
router.get('/view-results', authMiddleware, voterController.viewResults);

module.exports = router;