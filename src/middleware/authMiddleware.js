const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('Access denied, no token provided');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).send('Access denied, no token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).send('Invalid token');
  }
};

module.exports = verifyToken;
