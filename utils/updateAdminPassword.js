const db = require('../config/db');
const bcrypt = require('bcryptjs');

const username = 'admin';
const password = 'admin123';

// Generate new hash
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        process.exit(1);
    }
    
    console.log('Generated new hash:', hash);
    
    // Update the password in database
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
            
            console.log('\nUpdated user record:', results[0]);
            
            // Verify the new password works
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    console.error('Error verifying password:', err);
                } else {
                    console.log('\nPassword verification:', isMatch ? 'SUCCESS' : 'FAILED');
                }
                process.exit(0);
            });
        });
    });
}); 