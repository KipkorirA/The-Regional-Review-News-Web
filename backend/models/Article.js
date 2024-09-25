const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the beginning and end
        minlength: 5, // Minimum length for the title
        maxlength: 100 // Maximum length for the title
    },
    content: {
        type: String,
        required: true,
        minlength: 20 // Minimum length for the content
    },
    image: {
        type: String, // URL of the image
        required: false, // Optional
        validate: {
            validator: function(v) {
                return /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp|svg)$/.test(v); // Validate URL format
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: String,
        enum: ['breaking', 'sports', 'technology', 'business', 'life & style'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Prevent modification of the created date
    }
}, {
    timestamps: true // Automatically create updatedAt field
});

// Create an index for the title to improve search performance
articleSchema.index({ title: 1 });

// Export the Article model
module.exports = mongoose.model('Article', articleSchema);
