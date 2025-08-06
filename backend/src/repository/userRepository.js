import User from "../model/User.js";

export default class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  } 

  async findAll(filter = {}) {
    return await User.find(filter);
  }

  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}