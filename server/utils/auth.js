const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }); // You can adjust the expiration time
}

// Middleware for authentication
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken,
};
