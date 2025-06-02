const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Invalid token' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
