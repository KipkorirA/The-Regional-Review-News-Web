// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization'];

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({ message: 'Forbidden: No token provided.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }

        // Check if the user has an admin role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You do not have admin access.' });
        }

        // Attach the decoded user info to the request object for use in the next middleware
        req.user = decoded; 
        next(); // Proceed to the next middleware or route handler
    });
};
