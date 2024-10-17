const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, default: 'candidate' },
    symbol: { type: String, required: true },
    flag: { type: String, required: true }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
