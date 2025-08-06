import generateToken from "../utils/generateToken.js";
import { sendSuccess } from "../utils/sentResponse.js";
import validate from "../middleware/validateInput.js";
import { userRules } from "../utils/validationRules.js";

export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const { valid, errors } = validate(req.body, userRules);

      if (!valid) {
        throw new Error(errors[0]);
      }

      const user = await this.authService.register(req.body);
      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      sendSuccess(res, { user }, "Logged in successfully", 201);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await this.authService.login(email, password);
      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      sendSuccess(res, { user }, "Logged in successfully", 200);
    } catch (err) {
      next(err);
    }
  };

  logout = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    sendSuccess(res, {}, "Logged out successfully", 200);
  };

  getProfile = async (req, res, next) => {
    try {
      const user = await this.authService.getUserById(req.user._id);
      sendSuccess(res, { user }, "User profile retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  };
}
