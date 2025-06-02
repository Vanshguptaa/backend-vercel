const bcrypt = require('bcryptjs');
const db = require('../config/db');

const username = 'admin';
const password = 'admin123';

// Generate hash
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        process.exit(1);
    }
    
    console.log('Generated hash:', hash);
    
    // Update database
    const query = 'UPDATE users SET password = ? WHERE username = ?';
    db.query(query, [hash, username], (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            process.exit(1);
        }
        
        console.log('Password updated successfully');
        console.log('Affected rows:', result.affectedRows);
        
        // Verify the update
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Error verifying update:', err);
                process.exit(1);
            }
            
            console.log('Updated user record:', results[0]);
            process.exit(0);
        });
    });
}); 