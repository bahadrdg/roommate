const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const APIError = require("../utils/Error");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const token = generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      throw new APIError("E-posta veya Şifre Hatalı", 401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  const token = req.cookies.token;

  // Eğer token yoksa, oturum açık değil demektir
  if (!token) {
    return res.status(400).json({ message: "Aktif bir oturum bulunmuyor" });
  }

  // Token mevcutsa, çıkış yap
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Çıkış yapıldı" });
};

module.exports = { loginUser, logoutUser, getUserProfile };
