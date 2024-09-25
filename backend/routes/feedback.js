// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Assuming you have a Feedback model

// Get all feedback and render the feedback view
router.get('/', async (req, res) => {
    try {
        // Fetch all feedback from the database
        const feedbacks = await Feedback.find(); 
        res.render('feedback', { feedbacks }); // Render the feedback view with the fetched feedbacks
    } catch (error) {
        console.error('Error fetching feedback:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message }); // Include the error message in the response
    }
});

module.exports = router;
