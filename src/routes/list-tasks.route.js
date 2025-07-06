const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');

// GET /api/tasks - List all tasks
router.get('/tasks', async (req, res) => {
  try {
    console.log("Fetching tasks from database...");
    const tasks = await Task.find({});
    console.log(`Tasks fetched: ${tasks.length}`, tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
});

// GET /api/tasks/:id - Get task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    console.log(`Fetching task with ID: ${req.params.id}`);
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error retrieving task by ID:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
