const express = require("express")
const router = express.Router()


const userRoute = require("./user.routes")
const authRoute = require("./auth.routes")
const advertisementRoute = require("./advertisement.routes")
 
router.use("/user", userRoute)
router.use("/auth", authRoute )
router.use("/advertisement", advertisementRoute)


module.exports = router