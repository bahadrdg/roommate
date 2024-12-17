const express = require("express");

const { authUser, logoutUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/login", authUser)
router.post("/logout" , logoutUser )


module.exports = router;