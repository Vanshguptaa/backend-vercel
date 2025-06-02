const db = require('../config/db');

function findUserByUsername(username, callback) {
  if (!username) {
    console.log('No username provided to findUserByUsername');
    return callback(new Error('Username is required'));
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  console.log('Executing database query:', query);
  console.log('Query parameters:', [username]);

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return callback(err);
    }
    
    console.log('Query results:', results);
    
    if (!results || results.length === 0) {
      console.log('No user found with username:', username);
      return callback(null, null);
    }

    console.log('User found:', {
      id: results[0].id,
      username: results[0].username,
      password: results[0].password
    });
    
    callback(null, results[0]);
  });
}

module.exports = { findUserByUsername };
