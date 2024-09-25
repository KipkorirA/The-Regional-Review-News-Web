const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the beginning and end
        minlength: 10, // Minimum length for feedback content
        maxlength: 1000, // Maximum length for feedback content
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Create an index on the userId field for faster lookups
feedbackSchema.index({ userId: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
