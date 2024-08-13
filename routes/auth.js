const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/me', authMiddleware, userController.getCurrentUser);

// Admin-specific routes
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});

module.exports = router;
