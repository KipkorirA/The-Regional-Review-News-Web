// controllers/authController.js

const User = require('../models/User'); // Ensure this model exists
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password, role } = req.body; // Include role in the registration if needed

    // Basic validation
    if (!username || !password || password.length < 6) {
        return res.status(400).json({ message: 'Invalid input. Ensure username and password are provided and password is at least 6 characters long.' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({ username, password: hashedPassword, role: role || 'user' }); // Default role to 'user'

    try {
        await newUser.save(); // Save the new user
        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, id: newUser._id } });
    } catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Log in a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    try {
        const user = await User.findOne({ username }); // Find the user

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create JWT token
        res.status(200).json({ token, user: { username: user.username, id: user._id, role: user.role } }); // Include role in response
    } catch (error) {
        console.error('Login error:', error); // Log error for debugging
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
