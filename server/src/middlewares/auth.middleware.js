const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const APIError = require('../utils/Error');

const protect = asyncHandler(async (req, res, next) => {
  // Authorization header'dan token'i al
  const authHeader = req.headers.authorization;
  

  // Authorization header mevcut değilse hata döndür
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new APIError('Not authorized, no token provided', 401);
  }

  // Token'i "Bearer" kelimesinden ayır
  const token = authHeader.split(' ')[1];

  try {
    // Token'i doğrula
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
