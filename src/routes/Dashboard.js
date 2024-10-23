const express = require('express');
const router = express.Router();
const connectDB = require('../lib/connect.js');
const projectSchema = require('../models/projectSchema.js');
const TaskSchema = require("../models/TaskSchema.js");
const teamMembersSchema = require("../models/teamMemberSchema.js");

// Basic information route
router.get('/basicinfo', async (req, res) => {
    try {
        await connectDB(); // Connect to the database
        console.log('Database connection successful');

        // Fetching data
        const projects = await projectSchema.find();
        const teams = await teamMembersSchema.find();
        const tasks = await TaskSchema.find();
        const completed = await projectSchema.find({ completed: true }); // Add await here

        // Calculating totals
        const totalProjects = projects.length;
        const totalTeams = teams.length;
        const totalTasks = tasks.length;
        const completedProjects = completed.length;

        // Sending the response
        return res.status(200).json({ totalProjects, totalTeams, totalTasks, completedProjects });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
