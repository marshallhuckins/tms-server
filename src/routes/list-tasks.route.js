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

module.exports = router;
