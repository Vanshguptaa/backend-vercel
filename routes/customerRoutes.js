const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middleware/auth');

// All routes are protected with authentication
router.use(auth);

// Get all customers
router.get('/', customerController.getCustomers);

// Get a specific customer
router.get('/:id', customerController.getCustomerById);

// Add a new customer
router.post('/', customerController.addCustomer);

// Update a customer
router.put('/:id', customerController.updateCustomer);

// Delete a customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
