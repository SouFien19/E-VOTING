const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/votes-count/:candidateId', authMiddleware, resultsController.getVotesCount);
router.get('/display/:candidateId', authMiddleware, resultsController.displayResults);

module.exports = router;