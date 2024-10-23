// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const TaskSchema = require('../models/TaskSchema');
const connect = require("../lib/connect");

// Route to fetch all incomplete tasks
router.get('/', async (req, res) => {
    try {
        // Connect to the database
        await connect();
        console.log("Successfully connected to the database");

        // Fetch all incomplete tasks
        const tasks = await TaskSchema.find({ isCompleted: false });

        // Return the tasks
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        return res.status(500).json({ error: "Failed to retrieve tasks" });
    }
});

// Route to create a new task
router.post('/createTask', async (req, res) => {
    try {
        console.log(req.body);

        // Connect to the database
        await connect();
        console.log('Successfully connected to the database');

        // Create a new task from the request body
        const newTask = new TaskSchema({
            ...req.body,
            isCompleted: false  // Ensure isCompleted is set to false
        });

        // Save the task to the database
        await newTask.save();

        // Return a success response
        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Route to fetch tasks by project ID
router.get('/project/:projectId', async (req, res) => {
    try {
        await connect();
        const { projectId } = req.params;

        // Fetch tasks by project ID
        const tasks = await TaskSchema.find({ projectId,isCompleted: false  });

        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks found for this project' });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks by project ID:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

// Route to fetch task by task ID
router.get('/task/:taskId', async (req, res) => {
    try {
        await connect();
        const { taskId } = req.params;

        // Fetch task by task ID
        const task = await TaskSchema.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve task' });
    }
});

// Route to delete a task by task ID
router.delete('/task/:taskId', async (req, res) => {
    try {
        await connect();
        const { taskId } = req.params;

        // Delete the task by task ID
        const deletedTask = await TaskSchema.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task by ID:', error.message);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Route to fetch tasks assigned to a specific user by user ID
router.get('/assigned/:assignId', async (req, res) => {
    try {
        await connect();
        const { assignId } = req.params;

        // Fetch tasks assigned to the user
        const tasks = await TaskSchema.find({ assigneeId: assignId }); // Ensure correct field is used

        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks by assigned user ID:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

// Route to update a task's isCompleted status to true
// PATCH route to update a task's isCompleted status
router.patch('/complete/:taskId', async (req, res) => {
  try {
      await connect(); // Connect to the database

      const { taskId } = req.params; // Get the task ID from the request parameters

      // Update the isCompleted field to true
      const updatedTask = await TaskSchema.findByIdAndUpdate(
          taskId,
          { isCompleted: true },
          { new: true } // Return the updated task
      );

      // If the task is not found, return a 404 status
      if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
      }

      // Return success response with the updated task
      console.log("successfully updated task")
      return res.status(200).json({
          message: 'Task marked as completed successfully',
          task: updatedTask,
      });
  } catch (error) {
      console.error('Error updating task completion status:', error.message);
      return res.status(500).json({ error: 'Failed to update task' });
  }
});


router.get('/all_completed', async (req, res) => {
  try {
      await connect(); // Ensure you connect to the database
      
      // Fetch tasks where isCompleted is true
      const completedTasks = await TaskSchema.find({ isCompleted: true });

      return res.status(200).json(completedTasks);
  } catch (error) {
      console.error('Error fetching completed tasks:', error.message);
      return res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
});

router.get('/completed/:projectId', async (req, res) => {
  try {
      await connect(); // Ensure you connect to the database
      const { projectId } = req.params; // Get the projectId from the request parameters
      console.log(projectId);
      // Fetch tasks where isCompleted is true and projectId matches
      const completedTasks = await TaskSchema.find({
          isCompleted: true,
          projectId: projectId, // Adjust based on how you store project references in your Task schema
      });

      return res.status(200).json(completedTasks);
  } catch (error) {
      console.error('Error fetching completed tasks for project:', error.message);
      return res.status(500).json({ error: 'Failed to fetch completed tasks for project' });
  }
});


module.exports = router;
