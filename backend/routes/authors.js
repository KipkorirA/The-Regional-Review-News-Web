// routes/authors.js
const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Register an author
router.post('/register', async (req, res) => {
    const { name, email, bio, subscribed } = req.body;

    // Basic input validation
    if (!name || !email || !bio) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email is already registered
        const existingAuthor = await Author.findOne({ email });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new author instance
        const newAuthor = new Author({
            name,
            email,
            bio,
            subscribed: subscribed !== undefined ? subscribed : false,  // Set default subscribed status
        });
        
        // Save the new author to the database
        await newAuthor.save();

        // Respond with a success message and the newly created author
        res.status(201).json({ 
            message: 'Author registered successfully', 
            author: newAuthor 
        });
    } catch (error) {
        console.error('Error registering author:', error); // Log the error for debugging
        res.status(500).json({ 
            message: 'Error registering author', 
            error: error.message // Include error message in the response
        });
    }
});

module.exports = router;
