const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const APIError = require('../utils/Error');

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // JWT token'ı cookie'den alıyoruz

  if (!token) {
    res.status(401);
    throw new APIError('Not authorized, no token provided', 401);
  }

  try {
    // Token'ı çözümle
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı veritabanından bul ve şifreyi dahil etme
    req.user = await User.findById(decoded.userId).select('-password');

    // Kullanıcı bulunamazsa hata döndür
    if (!req.user) {
      res.status(401);
      throw new APIError('Not authorized, user not found', 401);
    }

    next(); // Middleware'i geç
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401);
    throw new APIError('Not authorized, token invalid', 401);
  }
});

module.exports = {
  protect,
};
