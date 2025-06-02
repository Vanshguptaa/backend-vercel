const bcrypt = require('bcryptjs');

// Generate hash for password
const password = 'admin123';
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Generated hash:', hash);
    
    // Verify the hash
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) {
            console.error('Error comparing password:', err);
            return;
        }
        console.log('Password matches:', isMatch);
        
        // Output SQL statement
        console.log('\nSQL to update password:');
        console.log(`UPDATE users SET password = '${hash}' WHERE username = 'admin';`);
    });
}); 