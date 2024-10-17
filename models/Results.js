const mongoose = require('mongoose');

const ResultsSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    candidateSymbol: { type: String, required: true }
});

module.exports = mongoose.model('Results', ResultsSchema);