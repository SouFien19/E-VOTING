const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    CIN: { type: Number, required: true },
    state: { type: String, required: true },
    role: { type: String, default: 'voter' } // Optional role field
});

module.exports = mongoose.model('Voter', VoterSchema);