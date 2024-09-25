const Feedback = require('../models/Feedback'); // Ensure this model exists

// Get all feedback and render the feedback view
const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Fetch all feedback
        res.render('feedback', { feedbacks }); // Render the feedback view with feedbacks
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
};

// Create new feedback
const createFeedback = async (req, res) => {
    const { articleId, userId, content } = req.body;

    const newFeedback = new Feedback({ articleId, userId, content });

    try {
        await newFeedback.save(); // Save the new feedback
        res.status(201).json(newFeedback); // Respond with the new feedback
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: 'Error creating feedback', error });
    }
};

module.exports = {
    getAllFeedback,
    createFeedback,
};
