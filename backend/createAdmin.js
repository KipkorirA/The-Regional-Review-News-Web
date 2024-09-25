const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as necessary

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/yourDatabase', { // Update with your database connection string
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ username: adminUsername });
    if (existingAdmin) {
        console.log('Admin user already exists.');
    } else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = new User({
            username: adminUsername,
            password: hashedPassword,
            role: 'author' // Change this to a valid role like 'author'
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    }
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error connecting to the database', err);
});
