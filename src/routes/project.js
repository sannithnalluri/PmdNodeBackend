const express = require('express');
const router = express.Router();
const connectDB = require('../lib/connect.js');
const  projectSchema = require('../models/projectSchema.js');
const TaskSchema = require("../models/TaskSchema.js")
const teamMembersSchema = require("../models/teamMemberSchema.js");
const Resource  = require("../models/Resource.js")


router.get('/', async (req, res)=>{
    try {
        await connectDB();
        console.log('database connection successful');
        const projects = await projectSchema.find();
        const json = projects.map(project => project.toJSON());
        return res.status(200).json({projects});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.post('/', async (req, res)=>{ 
try {
    console.log(req.body);
    await connectDB();
    console.log('database connection successful');
    const newProject = new projectSchema(req.body);
    const project = await newProject.save();
    return res.status(200).json(project);

}catch(e){
    console.error(e.message);
    res.status(500).send('Server Error');
}

});

router.get('getby/:id', async (req, res) => {
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
        const resource = await Resource.find({projectId: req.params.id})// Fixed typo: 'findby' to 'find'

        // Combine project, team members, and project tasks into a single object
        const projectData = { project, teamMembers, projectTasks,resource };
        
        return res.status(200).json(projectData); // Return the project data
    } catch (err) {
        console.error(err.message); // Log the error message
        return res.status(500).send('Server Error'); // Return server error
    }
});


router.get('/projectnames', async (req, res) => {
    try {
        await connectDB();

        // Fetch only project names using .select()
        const projects = await projectSchema.find().select('title'); // Only select 'name' field, exclude '_id'

        res.json(projects); // Send the names as a JSON response
    } catch (error) {
        console.error('Error fetching project names:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('getProjectById',async (req, res) => {

    return res.status(200).json({'message': 'Projec'});

});
module.exports = router;