const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Set default salt rounds from environment variable
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// Register route with auto-login after registration
router.post('/register', async (req, res) => {
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
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user, allowing for specified role
        const newUser = new User({ 
            username, 
            password: hashedPassword, 
            role: role || 'author' // Default to 'author' if no role is specified
        });
        await newUser.save();

        // Auto-login the user after successful registration
        req.session.user = {
            id: newUser._id,
            username: newUser.username,
            role: newUser.role
        };

        res.status(201).json({ message: 'Registration successful, and you are logged in!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Could not log out, try again' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;
