const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract token from "Bearer <token>"
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found, deny access
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  // Verify the token is valid and not expired
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Attach the user to the request object (without password)
  req.user = await User.findById(decoded.id).select('-password');

  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, user no longer exists');
  }

  next();
};

// @desc    Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role '${req.user.role}' is not authorized to access this route`);
    }
    next();
  };
};

module.exports = { protect, authorize };
