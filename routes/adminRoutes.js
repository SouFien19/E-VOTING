const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Admin routes
router.post('/register', (req, res, next) => {
    req.body.role = 'admin';
    next();
}, authController.register);

router.post('/login', (req, res, next) => {
    req.body.role = 'admin';
    next();
}, authController.login);

router.post('/logout', authMiddleware, authController.logout); // Protect logout if needed


// Protect these routes with authentication and role checks
router.post('/approve-candidate', authMiddleware, roleMiddleware('admin'), adminController.approveCandidate);

module.exports = router;
