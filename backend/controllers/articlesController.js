// controllers/articlesController.js

const Article = require('../models/Article'); // Ensure this model exists

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find(); // Fetch all articles
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

// Create a new article
const createArticle = async (req, res) => {
    const { title, content } = req.body; // Expecting title and content in the body
    try {
        const newArticle = new Article({ title, content });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding article', error });
    }
};

// Export the controller functions
module.exports = {
    getAllArticles,
    createArticle
};
