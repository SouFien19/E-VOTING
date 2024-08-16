const express = require('express');
const router = express.Router();
const { voteForCandidate } = require('../controllers/voterController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.post('/vote', authMiddleware, roleMiddleware('voter'), voteForCandidate);

module.exports = router;
