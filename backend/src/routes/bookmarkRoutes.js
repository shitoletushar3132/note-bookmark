// routes/bookmarkRoutes.js
import express from "express";
import BookmarkController from "../controller/bookmarkController.js";
import BookmarkRepository from "../repository/bookmarkRepository.js";
import BookmarkService from "../services/bookmarkService.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import UserRepository from "../repository/userRepository.js";

const router = express.Router();

// Instantiate dependencies
const bookmarkRepository = new BookmarkRepository();
const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const bookmarkService = new BookmarkService(bookmarkRepository);
const bookmarkController = new BookmarkController(bookmarkService);

// Routes
router.post("/", authMiddleware.verifyUser, bookmarkController.create);
router.get("/", authMiddleware.verifyUser, bookmarkController.getAll);
router.get("/:id", authMiddleware.verifyUser, bookmarkController.getById);
router.put("/:id", authMiddleware.verifyUser, bookmarkController.update);
router.delete("/:id", authMiddleware.verifyUser, bookmarkController.delete);

export default router;
