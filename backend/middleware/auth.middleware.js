const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const protectRoute = async (req, res, next) => {
  try {
	  
	  const accessToken =
      req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized - No access token provided' });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized - Access token expired' });
      }
      throw error;
    }
  } catch (error) {
    console.log('Error in protectRoute middleware', error.message);
    return res.status(401).json({ message: 'Unauthorized - Invalid access token' });
  }
};

const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied - Admin only' });
  }
};

const ownerRoute = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied - Owner only' });
  }
};

module.exports = { protectRoute, adminRoute, ownerRoute };
