const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date },
    lastLogout: { type: Date },
    loginHistory: { type: [Date], default: [] } // Array to store login timestamps
});

const User = mongoose.model('User', userSchema);

module.exports = User;
