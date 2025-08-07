// routes/noteRoutes.js
import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
import NoteController from "../controller/noteController.js";
import NoteService from "../services/noteService.js";
import NoteRepository from "../repository/noteRepository.js";
import UserRepository from "../repository/userRepository.js";

const router = express.Router();

// Instantiate dependencies
const noteRepository = new NoteRepository();
const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

// Routes
router.post("/", authMiddleware.verifyUser, noteController.create);
router.get("/", authMiddleware.verifyUser, noteController.getAll);
router.get("/:id", authMiddleware.verifyUser, noteController.getById);
router.put("/:id", authMiddleware.verifyUser, noteController.update);
router.delete("/:id", authMiddleware.verifyUser, noteController.delete);

export default router;
