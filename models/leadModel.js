const db = require('../config/database');

class Lead {
  static getAll(callback) {
    console.log('Executing getAll leads query');
    const query = 'SELECT * FROM leads ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error in getAll:', err);
        return callback(err);
      }
      console.log('Retrieved leads:', results);
      callback(null, results);
    });
  }

  static add(data, callback) {
    console.log('Executing add lead query with data:', data);
    const leadData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      industry: data.industry,
      budget: data.budget,
      expected_close_date: data.expectedCloseDate,
      status: data.status,
      source: data.source,
      priority: data.priority,
      assigned_to: data.assignedTo,
      notes: data.notes,
      last_contact_date: data.lastContactDate
    };

    const query = 'INSERT INTO leads SET ?';
    db.query(query, leadData, (err, result) => {
      if (err) {
        console.error('Database error in add:', err);
        return callback(err);
      }
      console.log('Lead added with ID:', result.insertId);
      callback(null, { id: result.insertId, ...leadData });
    });
  }

  static update(id, data, callback) {
    console.log('Executing update lead query for ID:', id, 'with data:', data);
    const leadData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      industry: data.industry,
      budget: data.budget,
      expected_close_date: data.expectedCloseDate,
      status: data.status,
      source: data.source,
      priority: data.priority,
      assigned_to: data.assignedTo,
      notes: data.notes,
      last_contact_date: data.lastContactDate,
      updated_at: new Date()
    };

    const query = 'UPDATE leads SET ? WHERE id = ?';
    db.query(query, [leadData, id], (err) => {
      if (err) {
        console.error('Database error in update:', err);
        return callback(err);
      }
      console.log('Lead updated successfully');
      callback(null, { id, ...leadData });
    });
  }

  static remove(id, callback) {
    console.log('Executing remove lead query for ID:', id);
    const query = 'DELETE FROM leads WHERE id = ?';
    db.query(query, id, (err) => {
      if (err) {
        console.error('Database error in remove:', err);
        return callback(err);
      }
      console.log('Lead removed successfully');
      callback(null);
    });
  }

  static getById(id, callback) {
    console.log('Executing getById lead query for ID:', id);
    const query = 'SELECT * FROM leads WHERE id = ?';
    db.query(query, id, (err, results) => {
      if (err) {
        console.error('Database error in getById:', err);
        return callback(err);
      }
      console.log('Retrieved lead:', results[0]);
      callback(null, results[0]);
    });
  }
}

module.exports = Lead; 