const db = require('../config/database');

class Deal {
  static getAll(callback) {
    console.log('Executing getAll deals query');
    const query = `
      SELECT d.*, l.name as lead_name, c.name as customer_name 
      FROM deals d 
      LEFT JOIN leads l ON d.lead_id = l.id 
      LEFT JOIN customers c ON d.customer_id = c.id 
      ORDER BY d.created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error in getAll:', err);
        return callback(err);
      }
      console.log('Retrieved deals:', results);
      callback(null, results);
    });
  }

  static add(data, callback) {
    console.log('Executing add deal query with data:', data);
    const dealData = {
      title: data.title,
      lead_id: data.lead_id || null,
      customer_id: data.customer_id || null,
      value: data.value,
      currency: data.currency,
      stage: data.stage,
      probability: data.probability,
      expected_close_date: data.expected_close_date,
      assigned_to: data.assigned_to,
      notes: data.notes
    };

    const query = 'INSERT INTO deals SET ?';
    db.query(query, dealData, (err, result) => {
      if (err) {
        console.error('Database error in add:', err);
        return callback(err);
      }
      console.log('Deal added with ID:', result.insertId);
      callback(null, { id: result.insertId, ...dealData });
    });
  }

  static update(id, data, callback) {
    console.log('Executing update deal query for ID:', id, 'with data:', data);
    const dealData = {
      title: data.title,
      lead_id: data.lead_id || null,
      customer_id: data.customer_id || null,
      value: data.value,
      currency: data.currency,
      stage: data.stage,
      probability: data.probability,
      expected_close_date: data.expected_close_date,
      assigned_to: data.assigned_to,
      notes: data.notes,
      updated_at: new Date()
    };

    const query = 'UPDATE deals SET ? WHERE id = ?';
    db.query(query, [dealData, id], (err) => {
      if (err) {
        console.error('Database error in update:', err);
        return callback(err);
      }
      console.log('Deal updated successfully');
      callback(null, { id, ...dealData });
    });
  }

  static remove(id, callback) {
    console.log('Executing remove deal query for ID:', id);
    const query = 'DELETE FROM deals WHERE id = ?';
    db.query(query, id, (err) => {
      if (err) {
        console.error('Database error in remove:', err);
        return callback(err);
      }
      console.log('Deal removed successfully');
      callback(null);
    });
  }

  static getById(id, callback) {
    console.log('Executing getById deal query for ID:', id);
    const query = `
      SELECT d.*, l.name as lead_name, c.name as customer_name 
      FROM deals d 
      LEFT JOIN leads l ON d.lead_id = l.id 
      LEFT JOIN customers c ON d.customer_id = c.id 
      WHERE d.id = ?
    `;
    db.query(query, id, (err, results) => {
      if (err) {
        console.error('Database error in getById:', err);
        return callback(err);
      }
      console.log('Retrieved deal:', results[0]);
      callback(null, results[0]);
    });
  }
}

module.exports = Deal; 