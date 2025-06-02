const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');
const auth = require('../middleware/auth');

// All routes are protected with authentication
router.use(auth);

// Get all deals
router.get('/', dealController.getDeals);

// Get a specific deal
router.get('/:id', dealController.getDealById);

// Add a new deal
router.post('/', dealController.addDeal);

// Update a deal
router.put('/:id', dealController.updateDeal);

// Delete a deal
router.delete('/:id', dealController.deleteDeal);

module.exports = router; 