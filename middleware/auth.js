const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'jwt_secret_key'); // Using the same secret key as in authController
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}; 