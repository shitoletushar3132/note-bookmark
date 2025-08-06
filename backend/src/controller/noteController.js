import validate from "../middleware/validateInput.js";
import { sendSuccess } from "../utils/sentResponse.js";
import { notecreateRule } from "../utils/validationRules.js";

export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  create = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { valid, errors } = validate(req.body, notecreateRule);

      if (!valid) {
        throw new Error(`${errors[0]}`);
      }

      const note = await this.noteService.createNote({ ...req.body, userId });
      sendSuccess(res, note, "Note created successfully", 201);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const userId = req.user._id;

      if (!req.params.id) {
        throw new Error("Note ID is required");
      }

      const note = await this.noteService.getNoteById(req.params.id, userId);
      sendSuccess(res, note, "Note fetched successfully");
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const notes = await this.noteService.getAllNotes(userId);
      sendSuccess(res, notes, "All notes fetched");
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const userId = req.user._id;

      if (!req.params.id) {
        throw new Error("Note ID is required");
      }

      const updatedNote = await this.noteService.updateNote(
        req.params.id,
        req.body,
        userId
      );
      sendSuccess(res, updatedNote, "Note updated");
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const userId = req.user._id;

      if (!req.params.id) {
        throw new Error("Note ID is required");
      }

      await this.noteService.deleteNote(req.params.id, userId);
      sendSuccess(res, {}, "Note deleted");
    } catch (err) {
      next(err);
    }
  };
}
