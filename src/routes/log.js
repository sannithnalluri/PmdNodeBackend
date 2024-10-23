const express = require('express');
const router = express.Router();
const connectDB = require('../lib/connect.js');
const userSchema = require('../models/userSchema.js');


router.get('/user/times/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({
            lastLogin: user.lastLogin,
            lastLogout: user.lastLogout,
        });
    } catch (error) {
        console.error('Error retrieving user times:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
