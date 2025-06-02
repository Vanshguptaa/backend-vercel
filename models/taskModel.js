const db = require('../config/db');

function getAll(callback) {
  db.query('SELECT * FROM tasks', (err, results) => callback(err, results));
}

function add(data, callback) {
  db.query('INSERT INTO tasks SET ?', data, (err, result) => callback(err, result));
}

function update(id, data, callback) {
  db.query('UPDATE tasks SET ? WHERE id = ?', [data, id], (err, result) => callback(err, result));
}

function remove(id, callback) {
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => callback(err, result));
}

function getById(id, callback) {
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
}

module.exports = { getAll, add, update, remove, getById }; 