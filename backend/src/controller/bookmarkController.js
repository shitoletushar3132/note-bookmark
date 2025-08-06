// controller/BookmarkController.js
import validate from "../middleware/validateInput.js";
import { sendSuccess } from "../utils/sentResponse.js";
import { bookmarkRules } from "../utils/validationRules.js";

export default class BookmarkController {
  constructor(bookmarkService) {
    this.bookmarkService = bookmarkService;
  }

  create = async (req, res, next) => {
    try {
      const userId = req.user._id;

      const { valid, errors } = validate(req.body, bookmarkRules);

      if (!valid) {
        throw new Error(errors[0]);
      }

      const bookmark = await this.bookmarkService.create(req.body, userId);
      sendSuccess(res, bookmark, "Bookmark created successfully", 201);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const userId = req.user._id;
      if (!req.params.id) {
        throw new Error("Bookmark ID is required");
      }
      const bookmark = await this.bookmarkService.findById(
        req.params.id,
        userId
      );
      sendSuccess(res, bookmark, "Bookmark fetched");
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const bookmarks = await this.bookmarkService.findAll({ userId });
      sendSuccess(res, bookmarks, "All bookmarks fetched");
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const userId = req.user._id;

      if (!req.params.id) {
        throw new Error("Bookmark ID is required");
      }

      const updated = await this.bookmarkService.updateById(
        req.params.id,
        req.body,
        userId
      );
      sendSuccess(res, updated, "Bookmark updated");
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const userId = req.user._id;

      if (!req.params.id) {
        throw new Error("Bookmark ID is required");
      }

      await this.bookmarkService.deleteById(req.params.id, userId);
      sendSuccess(res, {}, "Bookmark deleted");
    } catch (err) {
      next(err);
    }
  };
}
