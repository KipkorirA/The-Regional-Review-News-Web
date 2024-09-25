const Author = require('../models/Author'); // Ensure this model exists

// Get all authors and render the authors view
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find(); // Fetch all authors
        res.render('authors', { authors }); // Render the authors view with the authors data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching authors', error });
    }
};

// Subscribe a new author
const subscribeAuthor = async (req, res) => {
    const { name, email } = req.body;

    const newAuthor = new Author({ name, email });

    try {
        await newAuthor.save(); // Save the new author
        res.status(201).json(newAuthor); // Respond with the created author
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error subscribing author', error });
    }
};

module.exports = {
    getAllAuthors,
    subscribeAuthor,
};
