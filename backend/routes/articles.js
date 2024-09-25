// routes/articles.js

const express = require('express');
const router = express.Router();

const {
    getAllArticles,
    createArticle
} = require('../controllers/articlesController'); // Ensure the filename is correct

// Define routes

// Route to get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await getAllArticles(); // Call the controller function to retrieve all articles
        res.status(200).json(articles); // Send the articles as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching articles', error }); // Handle any errors
    }
});

// Route to create a new article
router.post('/', async (req, res) => {
    try {
        const newArticle = await createArticle(req.body); // Call the controller function to create a new article
        res.status(201).json(newArticle); // Send the newly created article as a JSON response
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating article', error }); // Handle any errors
    }
});

module.exports = router;
