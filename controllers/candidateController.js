const Candidacy = require('../models/Candidacy');

exports.createCandidacy = async (req, res) => {
    try {
        const { position } = req.body;

        const candidacy = new Candidacy({
            candidate: req.user.id,
            position,
        });

        await candidacy.save();

        res.status(201).json({
            success: true,
            message: 'Candidacy created successfully',
            data: candidacy,
        });
    } catch (err) {
        console.error('Error creating candidacy:', err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
};
