import express from "express";
import AuthController from "../controller/authController.js";
import UserRepository from "../repository/userRepository.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import AuthService from "../services/authService.js";

const router = express.Router();

// Instantiate classes
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware(userRepo);

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/profile", authMiddleware.verifyUser, authController.getProfile);

export default router;
