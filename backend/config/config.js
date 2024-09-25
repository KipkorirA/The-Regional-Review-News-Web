// config.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_here',
};
