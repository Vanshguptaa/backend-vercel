const db = require('../config/database');

class Customer {
  static getAll(callback) {
    console.log('Executing getAll customers query');
    const query = 'SELECT * FROM customers ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error in getAll:', err);
        return callback(err);
      }
      console.log('Retrieved customers:', results);
      callback(null, results);
    });
  }

  static add(data, callback) {
    console.log('Executing add customer query with data:', data);
    const query = 'INSERT INTO customers SET ?';
    db.query(query, data, (err, result) => {
      if (err) {
        console.error('Database error in add:', err);
        return callback(err);
      }
      console.log('Customer added with ID:', result.insertId);
      callback(null, result);
    });
  }

  static update(id, data, callback) {
    console.log('Executing update customer query for ID:', id, 'with data:', data);
    const query = 'UPDATE customers SET ? WHERE id = ?';
    db.query(query, [data, id], (err) => {
      if (err) {
        console.error('Database error in update:', err);
        return callback(err);
      }
      console.log('Customer updated successfully');
      callback(null);
    });
  }

  static remove(id, callback) {
    console.log('Executing remove customer query for ID:', id);
    const query = 'DELETE FROM customers WHERE id = ?';
    db.query(query, id, (err) => {
      if (err) {
        console.error('Database error in remove:', err);
        return callback(err);
      }
      console.log('Customer removed successfully');
      callback(null);
    });
  }

  static getById(id, callback) {
    console.log('Executing getById customer query for ID:', id);
    const query = 'SELECT * FROM customers WHERE id = ?';
    db.query(query, id, (err, results) => {
      if (err) {
        console.error('Database error in getById:', err);
        return callback(err);
      }
      console.log('Retrieved customer:', results[0]);
      callback(null, results[0]);
    });
  }
}

module.exports = Customer;
