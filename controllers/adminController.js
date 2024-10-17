const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');

// Approve candidate
exports.approveCandidate = async (req, res) => {
    const { candidateId } = req.body;

    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.approved = true;
        await candidate.save();

        res.status(200).json({ message: 'Candidate approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving candidate', error });
    }
};
