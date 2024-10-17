const { vote, getVotesCount } = require('../blockchain/web3'); // Ensure this is correct

// Cast a vote
exports.castVote = async (req, res) => {
    const { candidateId } = req.body;
    
    try {
        const voterAccount = req.user.id; // Assuming you have the user's ID from the token

        await vote(candidateId, voterAccount);
        
        res.status(200).json({ message: "Vote cast successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error casting vote", error });
    }
};

// View results for a specific candidate
exports.viewResults = async (req, res) => {
    const { candidateId } = req.query;

    try {
        const votesCount = await getVotesCount(candidateId);
        res.status(200).json({ votesCount });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving results", error });
    }
};