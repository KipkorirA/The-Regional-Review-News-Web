const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const articlesRoutes = require('./routes/articles');
const authorsRoutes = require('./routes/authors');
const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');
const authorsController = require('./controllers/authorsController');
const User = require('./models/User'); // Import User model for registration
const Article = require('./models/Article');
const Author = require('./models/Author');
const Feedback = require('./models/Feedback');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl; // Store the requested URL
    res.redirect('/auth');
};

// Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/admin', isAuthenticated, adminRoutes);

// Define the root route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Regional Review News API!</h1>
        <p>Use the following links to access the various pages:</p>
        <ul>
            <li><a href="/admin">Admin Page</a></li>
            <li><a href="/authors">Authors Page</a></li>
            <li><a href="/feedback">View Feedback Page</a></li>
            <li><a href="/register">Register new User</a></li>
        </ul>
    `);
});

// Admin route for rendering views with data
app.get('/admin', isAuthenticated, async (req, res) => {
    try {
        const articles = await Article.find();
        const authors = await Author.find();
        const feedbacks = await Feedback.find();
        res.render('admin', { articles, authors, feedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching articles, authors, or feedbacks', error });
    }
});

// Authentication route
app.get('/auth', (req, res) => {
    res.render('auth'); // Render the login form
});

// Route to render the registration form
app.get('/register', (req, res) => {
    res.render('register'); // Render the registration form
});

// User registration route
app.post('/api/auth/register', async (req, res) => {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password || password.length < 6) {
        return res.status(400).json({
            message: 'Invalid input. Ensure username and password are provided and password is at least 6 characters long.'
        });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt round of 10

        // Create a new user, allowing for 'admin', 'author', or 'user' role
        const newUser = new User({
            username,
            password: hashedPassword, // Save the hashed password
            role: role || 'user' // Default to 'user' if no role is specified
        });
        await newUser.save();

        // Auto-login the user after successful registration
        req.session.user = {
            id: newUser._id,
            username: newUser.username,
            role: newUser.role // Include role in session
        };

        res.status(201).json({ message: 'Registration successful, and you are logged in!' });
    } catch (error) {
        console.error('Registration error:', error); // Debugging log
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a session after login
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role // Include role in session
        };

        const redirectTo = req.session.returnTo || '/admin'; // Redirect to original URL or admin page
        delete req.session.returnTo; // Clear the returnTo after redirecting
        res.status(200).json({ redirect: redirectTo }); // Send redirect URL back to client
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in', error });
    }
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Get authors and render the authors view
app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find();
        res.render('authors', { authors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching authors', error });
    }
});

// Feedback route to render feedback view, protected by authentication middleware
app.get('/feedback', isAuthenticated, async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.render('feedback', { feedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
});

// Route to render the Add Article page
app.get('/authors/:id/addArticle', (req, res) => {
    const authorId = req.params.id; // Get the author ID from the URL
    res.render('addArticle', { userId: authorId }); // Render the 'addArticle' view and pass the author ID
});

// Route to handle article submission
app.post('/api/articles', async (req, res) => {
    try {
        const { title, content, author } = req.body; // Extract the title, content, and author from the form data

        // Create a new article instance and save it to the database
        const newArticle = new Article({
            title,
            content,
            author
        });
        await newArticle.save(); // Save the article to the database

        // After saving the article, redirect back to the authors page or a confirmation page
        res.redirect('/authors');
    } catch (error) {
        console.error('Error saving article:', error); // Debugging log
        res.status(500).json({ message: 'Error saving article', error });
    }
});

// 404 error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
