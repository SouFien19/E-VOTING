const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');

    const server = app.listen(PORT, 'localhost', () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

