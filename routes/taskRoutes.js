const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// All routes are protected with authentication
router.use(auth);

// Get all tasks
router.get('/', taskController.getTasks);

// Get a specific task
router.get('/:id', taskController.getTaskById);

// Add a new task
router.post('/', taskController.addTask);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 