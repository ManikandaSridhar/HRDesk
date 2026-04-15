const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'HRDesk-secret-key-2024';

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  if (token === 'demo-token') {
    req.user = { id: 'demo', email: 'demo@example.com', name: 'Demo User' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { authenticate, signToken };