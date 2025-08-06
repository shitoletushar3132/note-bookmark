import getPageTitle from "../utils/getPageTitle.js";

// services/BookmarkService.js
export default class BookmarkService {
  constructor(bookmarkRepository) {
    this.repo = bookmarkRepository;
  }

  async create(data, userId) {
    if (!data.title && data.url) {
      data.title = await getPageTitle(data.url);
    }
    return await this.repo.create({ ...data, userId });
  }

  async findById(id, userId) {
    const bookmark = await this.repo.findById(id);
    if (!bookmark || bookmark.userId.toString() !== userId.toString()) {
      throw new Error("Not authorized or bookmark not found");
    }
    return bookmark;
  }

  async findAll(filter = {}) {
    return await this.repo.findAll(filter);
  }

  async updateById(id, updateData, userId) {
    const bookmark = await this.repo.findById(id);
    if (!bookmark || bookmark.userId.toString() !== userId.toString()) {
      throw new Error("Not authorized or bookmark not found");
    }
    return await this.repo.updateById(id, updateData);
  }

  async deleteById(id, userId) {
    const bookmark = await this.repo.findById(id);
    if (!bookmark || bookmark.userId.toString() !== userId.toString()) {
      throw new Error("Not authorized or bookmark not found");
    }
    return await this.repo.deleteById(id);
  }
}
