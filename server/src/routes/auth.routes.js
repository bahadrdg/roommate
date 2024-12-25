const express = require("express");

const { loginUser, logoutUser, getUserProfile } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerValidation, loginValidation } = require("../middlewares/validations/auth.validations");

const router = express.Router()

router.post("/login", loginValidation , loginUser)
router.post("/logout" , logoutUser )
router.get("/profile", authMiddleware.protect, getUserProfile)


module.exports = router;