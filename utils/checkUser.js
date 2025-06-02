const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Check database connection
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
    console.log('Database connection successful');
    
    // Check users table
    db.query('SELECT * FROM users', (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            process.exit(1);
        }
        
        console.log('\nUsers in database:');
        console.log(users);
        
        // If there are users, verify their passwords
        if (users.length > 0) {
            console.log('\nVerifying passwords...');
            users.forEach(user => {
                console.log(`\nUser: ${user.username}`);
                console.log('Stored password hash:', user.password);
                
                // Try to verify with 'admin123'
                bcrypt.compare('admin123', user.password, (err, isMatch) => {
                    if (err) {
                        console.error('Error comparing password:', err);
                    } else {
                        console.log('Password matches admin123:', isMatch);
                    }
                });
            });
        }
        
        process.exit(0);
    });
}); 