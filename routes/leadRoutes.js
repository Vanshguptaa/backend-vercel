const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');

// All routes are protected with authentication
router.use(auth);

// Get all leads
router.get('/', leadController.getLeads);

// Get a specific lead
router.get('/:id', leadController.getLeadById);

// Add a new lead
router.post('/', leadController.addLead);

// Update a lead
router.put('/:id', leadController.updateLead);

// Delete a lead
router.delete('/:id', leadController.deleteLead);

module.exports = router; 