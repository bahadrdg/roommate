const express = require("express");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserStatus
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", createUser);
router.get("/getAllUsers", authMiddleware.protect, getAllUsers);
router.get("/getUserById/:id", authMiddleware.protect, getUserById);
router.put("/updateUser/:id", authMiddleware.protect, updateUser);
router.delete("/deleteUser/:id", authMiddleware.protect, deleteUser);
router.patch("/toggleUserStatus/:id/status", authMiddleware.protect, toggleUserStatus);

module.exports = router;
