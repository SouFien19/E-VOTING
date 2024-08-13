const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (user) => {
    const payload = { id: user.id, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken. Please choose another username.'
            });
        }

        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email is already registered. Please use a different email.'
            });
        }

        // Create new user
        user = new User({ username, email, password, role });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                username: user.username,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials. Please check your username and password.'
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                username: user.username,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};
