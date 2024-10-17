const Candidate = require('../models/Candidate');

// Submit a new candidate
exports.submitCandidate = async (req, res) => {
    const { username, symbol, flag } = req.body;

    try {
        const candidate = await Candidate.findOne({ username });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update only the symbol and flag
        if (symbol) candidate.symbol = symbol;
        if (flag) candidate.flag = flag;

        await candidate.save();

        res.status(201).json({ message: 'Candidate details updated successfully', candidate });
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
