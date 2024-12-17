const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model');
const APIError = require('../utils/Error');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new APIError('Not authorized, token failed', 401);
    }
  } else {
    res.status(401);
    throw new APIError('Not authorized, token failed', 401);
  }
});


module.exports = {
    protect
}