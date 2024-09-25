const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the beginning and end
        minlength: 3, // Minimum length for the name
        maxlength: 50 // Maximum length for the name
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Convert email to lowercase before saving
        trim: true, // Trim whitespace
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validate email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    bio: {
        type: String,
        required: true,
        minlength: 10, // Minimum length for the bio
        maxlength: 500 // Maximum length for the bio
    },
    subscribed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Create an index on the email field for faster lookups
authorSchema.index({ email: 1 });

module.exports = mongoose.model('Author', authorSchema);
