const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js'); // Adjust the path as necessary
const connectDB = require('../lib/connect');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator'); // Import validation functions

// Middleware to validate request body for registration
const validateRegistration = [
    body('email').notEmpty().withMessage('email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Login route
router.post('/login', async (req, res) => {
    console.log("login called");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last login time
        user.lastLogin = new Date();
        
        // Save the current login time in loginHistory
        user.loginHistory.push(user.lastLogin);
        
        await user.save();

        return res.status(200).json({ message: 'Login successful' }); // No token sent

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Logout route
router.post('/logout', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update last logout time
        user.lastLogout = new Date();
        await user.save();

        return res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Registration route
router.post('/register', validateRegistration, async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await connectDB(); // Connect to the database

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
