const Candidate = require('../models/Candidate');

// Submit a new candidate
exports.submitCandidate = async (req, res) => {
    const { name, symbol, flag } = req.body;

    try {
        const candidate = new Candidate({ name, symbol, flag });
        await candidate.save();

        res.status(201).json({ message: 'Candidate submitted successfully', candidate });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting candidate', error });
    }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving candidates', error });
    }
};
