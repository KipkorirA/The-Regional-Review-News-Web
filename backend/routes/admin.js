// routes/admin.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to render the admin dashboard
router.get('/dashboard', adminController.renderAdminDashboard); // Render the admin dashboard

// Route to approve an article
router.post('/articles/:id/approve', async (req, res) => {
    try {
        await adminController.approveArticle(req.params.id); // Call the approveArticle function with article ID
        res.status(200).json({ message: 'Article approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error approving article', error });
    }
});

// Route to delete an article
router.delete('/articles/:id', async (req, res) => {
    try {
        await adminController.deleteArticle(req.params.id); // Call the deleteArticle function with article ID
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting article', error });
    }
});

// Route to get all feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedback = await adminController.getAllFeedback(); // Get all feedback from the controller
        res.status(200).json(feedback); // Send feedback data as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
});

// Route to get all authors
router.get('/authors', async (req, res) => {
    try {
        const authors = await adminController.getAllAuthors(); // Get all authors from the controller
        res.status(200).json(authors); // Send authors data as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching authors', error });
    }
});

// Route to delete an author
router.delete('/authors/:id', async (req, res) => {
    try {
        await adminController.deleteAuthor(req.params.id); // Call the deleteAuthor function with author ID
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting author', error });
    }
});

module.exports = router;
