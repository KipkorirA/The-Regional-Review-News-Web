// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3, // Minimum length for username
        trim: true,   // Automatically trim whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically track the creation date
    },
    role: {
        type: String,
        enum: ['author', 'user', 'admin'], // Added admin role
        default: 'user', // Default role for new users
    },
});

// Pre-save hook to ensure password is hashed before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); // Proceed with saving the user
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Method to compare the password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
