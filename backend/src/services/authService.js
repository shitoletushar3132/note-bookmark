// services/AuthService.js
import User from "../model/User.js";

export default class AuthService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepo.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User(userData);
    return await this.userRepo.create(user);
  }

  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return user;
  }

  async getUserById(userId) {
    return await this.userRepo.findById(userId);
  }
}
