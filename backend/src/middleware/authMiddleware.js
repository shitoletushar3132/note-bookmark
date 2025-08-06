// middleware/AuthMiddleware.js
import jwt from "jsonwebtoken";
import { sendError } from "../utils/sentResponse.js";

export default class AuthMiddleware {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  verifyUser = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
      sendError(res, 401, "No token provided");
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userRepo.findById(decoded.id);

      if (!user) {
        sendError(res, 404, "User not found");
        return;
      }

      req.user = user;
      next();
    } catch (err) {
      sendError(res, 401, "Invalid token");
      return;
    }
  };
}
