const Vote = require('../models/Vote');
const Candidacy = require('../models/Candidacy');

exports.voteForCandidate = async (req, res) => {
    try {
        const { candidateId } = req.body;

        // Check if the candidate exists
        const candidateCandidacy = await Candidacy.findOne({ candidate: candidateId });
        if (!candidateCandidacy) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found',
            });
        }

        // Create a new vote
        const vote = new Vote({
            voter: req.user.id,
            candidate: candidateId,
        });

        await vote.save();

        res.status(201).json({
            success: true,
            message: 'Vote cast successfully',
            data: vote,
        });
    } catch (err) {
        console.error('Error casting vote:', err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
};
