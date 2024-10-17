const express = require('express');
const router = express.Router();
const connectDB = require('../lib/connect.js');
const  projectSchema = require('../models/projectSchema.js');
const TaskSchema = require("../models/TaskSchema.js")
const teamMembersSchema = require("../models/teamMemberSchema.js");
const Resource  = require("../models/Resource.js")


router.get('/:id', async (req, res) => {
    try {
        await connectDB(); // Connect to the database
        console.log('Database connection successful');

        // Use params to retrieve ID
        const project = await projectSchema.findById(req.params.id); 
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const projectTasks = await TaskSchema.find({ ProjectId: req.params.id }); // Fixed typo: 'findBy' to 'find'
        const teamMembers = await teamMembersSchema.find({ projectId: req.params.id }); 
        const resources = await Resource.find({projectId: req.params.id})// Fixed typo: 'findby' to 'find'

        // Combine project, team members, and project tasks into a single object
        const projectData = { project, teamMembers, projectTasks,resources };
        
        return res.status(200).json(projectData); // Return the project data
    } catch (err) {
        console.error(err.message); // Log the error message
        return res.status(500).send('Server Error'); // Return server error
    }
});


module.exports = router;
