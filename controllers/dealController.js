const Deal = require('../models/dealModel');

exports.getDeals = (req, res) => {
  console.log('Getting all deals');
  Deal.getAll((err, data) => {
    if (err) {
      console.error('Error getting deals:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Deals retrieved:', data);
    res.json(data);
  });
};

exports.addDeal = (req, res) => {
  console.log('Adding new deal:', req.body);
  Deal.add(req.body, (err, result) => {
    if (err) {
      console.error('Error adding deal:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Deal added successfully:', result);
    res.status(201).json(result);
  });
};

exports.updateDeal = (req, res) => {
  console.log('Updating deal:', req.params.id, req.body);
  Deal.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error updating deal:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Deal updated successfully');
    res.json(result);
  });
};

exports.deleteDeal = (req, res) => {
  console.log('Deleting deal:', req.params.id);
  Deal.remove(req.params.id, (err) => {
    if (err) {
      console.error('Error deleting deal:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Deal deleted successfully');
    res.json({ message: 'Deal deleted successfully' });
  });
};

exports.getDealById = (req, res) => {
  console.log('Getting deal by ID:', req.params.id);
  Deal.getById(req.params.id, (err, data) => {
    if (err) {
      console.error('Error getting deal:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!data) {
      console.log('Deal not found');
      return res.status(404).json({ message: 'Deal not found' });
    }
    console.log('Deal retrieved:', data);
    res.json(data);
  });
}; 