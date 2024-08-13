const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const middleware = require('./middleware/auth');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(middleware.errorHandler);

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to the database');
    // Start the server only after the database connection is established
    app.listen(PORT, 'localhost', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
    // Optionally: Exit the process if the database connection fails
    process.exit(1);
});