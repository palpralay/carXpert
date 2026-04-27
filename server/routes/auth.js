const express = require("express");
const authController = require("../controllers/authController");
const verifyAuth = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/firebase-login", authController.firebaseLogin);
router.post("/logout", authController.logout);

// Protected routes
router.get("/me", verifyAuth, authController.getCurrentUser);
router.get("/verify-token", verifyAuth, authController.verifyToken);

module.exports = router;
