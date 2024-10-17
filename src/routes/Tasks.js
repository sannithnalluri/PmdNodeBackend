const express = require('express');
const router = express.Router();
const TaskSchema = require('../models/TaskSchema');
const connect = require("../lib/connect");

// Route to fetch all tasks
router.get('/getTask', async (req, res) => {
    try {
        // Connect to the database
        await connect();
        console.log("Successfully connected to the database");

        // Fetch all tasks
        const tasks = await TaskSchema.find();

        // Return the tasks
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message);

        // Return an error response
        return res.status(500).json({ error: "Failed to retrieve tasks" });
    }
});


router.post('/createTask', async (req, res) => {
    try {
        console.log(req.body);
      // Connect to the database
      await connect();
      console.log('Successfully connected to the database');
  
      // Create a new task from the request body
      const newTask = new TaskSchema(req.body);
  
      // Save the task to the database
      await newTask.save();
  
      // Return a success response
      return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
      console.error('Error creating task:', error.message);
      return res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
