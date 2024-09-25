const Article = require('../models/Article'); // Ensure this model exists
const Author = require('../models/Author'); // Ensure this model exists
const Feedback = require('../models/Feedback'); // Ensure this model exists

// Render admin dashboard
const renderAdminDashboard = async (req, res) => {
    try {
        const [articles, authors, feedbacks] = await Promise.all([
            Article.find(), // Fetch all articles
            Author.find(),  // Fetch all authors
            Feedback.find(), // Fetch all feedback
        ]);
        
        res.render('admin', { articles, authors, feedbacks }); // Render the admin view with data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching admin data', error });
    }
};

// Approve an article by ID
const approveArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id); // Find the article
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Ensure the article can be approved
        if (article.approved) {
            return res.status(400).json({ message: 'Article already approved' });
        }

        article.approved = true; // Assuming there's an 'approved' field
        await article.save(); // Save changes
        res.status(200).json({ message: 'Article approved successfully', article });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error approving article', error });
    }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findByIdAndDelete(id); // Delete the article
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting article', error });
    }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Fetch all feedback
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
};

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find(); // Fetch all authors
        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching authors', error });
    }
};

// Delete an author by ID
const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findByIdAndDelete(id); // Delete the author
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting author', error });
    }
};

module.exports = {
    renderAdminDashboard,
    approveArticle,
    deleteArticle,
    getAllFeedback,
    getAllAuthors,
    deleteAuthor,
};
