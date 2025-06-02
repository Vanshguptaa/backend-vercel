const Task = require('../models/taskModel');

exports.getTasks = (req, res) => {
  Task.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

exports.addTask = (req, res) => {
  const taskData = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.dueDate,
    priority: req.body.priority,
    status: req.body.status,
    assigned_to: req.body.assignedTo,
    created_at: new Date()
  };

  Task.add(taskData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...taskData });
  });
};

exports.updateTask = (req, res) => {
  const taskData = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.dueDate,
    priority: req.body.priority,
    status: req.body.status,
    assigned_to: req.body.assignedTo,
    updated_at: new Date()
  };

  Task.update(req.params.id, taskData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: req.params.id, ...taskData });
  });
};

exports.deleteTask = (req, res) => {
  Task.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted successfully' });
  });
};

exports.getTaskById = (req, res) => {
  Task.getById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ message: 'Task not found' });
    res.json(data);
  });
}; 