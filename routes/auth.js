const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { verifyTransaction } = require('../security/blockchain');

const router = express.Router();

// Register with blockchain verification
router.post('/register', async (req, res) => {
    const { username, email, password, address, transactionHash } = req.body;

    try {
        // Blockchain transaction verification
        const isValid = await verifyTransaction(address, transactionHash);
        if (!isValid) return res.status(400).send('Blockchain verification failed.');

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already registered.');

        // Create a new user
        user = new User({ username, email, password });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
        res.status(201).send({ token });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Login with blockchain verification
router.post('/login', async (req, res) => {
    const { email, password, address, transactionHash } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid email or password.');

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        // Blockchain transaction verification
        const isValid = await verifyTransaction(address, transactionHash);
        if (!isValid) return res.status(400).send('Blockchain verification failed.');

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
        res.send({ token });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Protected route: Welcome page
router.get('/welcome', auth, (req, res) => {
    res.send(`Welcome ${req.user._id}`);
});

module.exports = router;
