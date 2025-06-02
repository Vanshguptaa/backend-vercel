const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Login attempt received:', { username, password });

    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ msg: 'Please provide both username and password' });
    }

    User.findUserByUsername(username, (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      
      if (!user) {
        console.log('User not found:', username);
        return res.status(401).json({ msg: 'Invalid credentials' });
      }

      console.log('Found user in database:', {
        id: user.id,
        username: user.username,
        storedPassword: user.password
      });

      // For testing - log the password comparison
      console.log('Attempting to compare passwords:');
      console.log('Input password:', password);
      console.log('Stored password hash:', user.password);

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        console.log('Password comparison result:', isMatch);

        if (!isMatch) {
          console.log('Password mismatch for user:', username);
          return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          'jwt_secret_key',
          { expiresIn: '1h' }
        );

        console.log('Login successful, generated token');

        res.json({
          token,
          user: {
            id: user.id,
            username: user.username
          }
        });
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
