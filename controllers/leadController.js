const Lead = require('../models/leadModel');

exports.getLeads = (req, res) => {
  console.log('Getting all leads');
  Lead.getAll((err, data) => {
    if (err) {
      console.error('Error getting leads:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Leads retrieved:', data);
    res.json(data);
  });
};

exports.addLead = (req, res) => {
  console.log('Adding new lead:', req.body);
  const leadData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    status: req.body.status || 'New',
    source: req.body.source || 'Website',
    created_at: new Date()
  };

  Lead.add(leadData, (err, result) => {
    if (err) {
      console.error('Error adding lead:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lead added successfully:', { id: result.insertId, ...leadData });
    res.status(201).json({ id: result.insertId, ...leadData });
  });
};

exports.updateLead = (req, res) => {
  console.log('Updating lead:', req.params.id, req.body);
  const leadData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    status: req.body.status,
    source: req.body.source,
    updated_at: new Date()
  };

  Lead.update(req.params.id, leadData, (err) => {
    if (err) {
      console.error('Error updating lead:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lead updated successfully');
    res.json({ id: req.params.id, ...leadData });
  });
};

exports.deleteLead = (req, res) => {
  console.log('Deleting lead:', req.params.id);
  Lead.remove(req.params.id, (err) => {
    if (err) {
      console.error('Error deleting lead:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lead deleted successfully');
    res.json({ message: 'Lead deleted successfully' });
  });
};

exports.getLeadById = (req, res) => {
  console.log('Getting lead by ID:', req.params.id);
  Lead.getById(req.params.id, (err, data) => {
    if (err) {
      console.error('Error getting lead:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!data) {
      console.log('Lead not found');
      return res.status(404).json({ message: 'Lead not found' });
    }
    console.log('Lead retrieved:', data);
    res.json(data);
  });
}; 