const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Voter = require('../models/Voter');
const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');

// Register user based on role
exports.register = async (req, res) => {
    const { username, password, firstname, lastname, CIN, state, role, symbol, flag } = req.body;
    let Model;

    switch (role) {
        case 'voter':
            Model = Voter;
            break;
        case 'admin':
            Model = Admin;
            break;
        case 'candidate':
            Model = Candidate;
            break;
        default:
            return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const existingUser = await Model.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: `${role} already exists` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Model({ username, password: hashedPassword, firstname, lastname, CIN, state, symbol, flag });
        await user.save();

        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login user
// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username across all roles
        const voter = await Voter.findOne({ username });
        const admin = await Admin.findOne({ username });
        const candidate = await Candidate.findOne({ username });

        // Combine all users into one variable for easier processing
        const user = voter || admin || candidate;

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with user role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with user details and token
        res.json({
            message: 'Login successful',
            token,
            role: user.role, // Include the user's role in the response
            user: {          // Optionally include more user details
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                CIN: user.CIN,
                state: user.state
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


// Logout (optional)
exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};
