const express = require("express");

const { loginUser, logoutUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerValidation, loginValidation } = require("../middlewares/validations/auth.validations");

const router = express.Router()

router.post("/login", loginValidation , loginUser)
router.post("/logout" , logoutUser )


module.exports = router;