const Customer = require('../models/customerModel');

exports.getCustomers = (req, res) => {
  console.log('Getting all customers');
  Customer.getAll((err, data) => {
    if (err) {
      console.error('Error getting customers:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Customers retrieved:', data);
    res.json(data);
  });
};

exports.addCustomer = (req, res) => {
  console.log('Adding new customer:', req.body);
  const customerData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    status: req.body.status || 'Active',
    created_at: new Date()
  };

  Customer.add(customerData, (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Customer added successfully:', { id: result.insertId, ...customerData });
    res.status(201).json({ id: result.insertId, ...customerData });
  });
};

exports.updateCustomer = (req, res) => {
  console.log('Updating customer:', req.params.id, req.body);
  const customerData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    status: req.body.status,
    updated_at: new Date()
  };

  Customer.update(req.params.id, customerData, (err) => {
    if (err) {
      console.error('Error updating customer:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Customer updated successfully');
    res.json({ id: req.params.id, ...customerData });
  });
};

exports.deleteCustomer = (req, res) => {
  console.log('Deleting customer:', req.params.id);
  Customer.remove(req.params.id, (err) => {
    if (err) {
      console.error('Error deleting customer:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Customer deleted successfully');
    res.json({ message: 'Customer deleted successfully' });
  });
};

exports.getCustomerById = (req, res) => {
  console.log('Getting customer by ID:', req.params.id);
  Customer.getById(req.params.id, (err, data) => {
    if (err) {
      console.error('Error getting customer:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!data) {
      console.log('Customer not found');
      return res.status(404).json({ message: 'Customer not found' });
    }
    console.log('Customer retrieved:', data);
    res.json(data);
  });
};

exports.searchCustomers = (req, res) => {
  Customer.search(req.query.term, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};
