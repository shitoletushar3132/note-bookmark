import Bookmark from '../model/Bookmark.js';

export default class BookmarkRepository {
    async create(bookmarkData) {
        const bookmark = new Bookmark(bookmarkData);
        return await bookmark.save();
    }

    async findById(id) {
        return await Bookmark.findById(id);
    }

    async findAll(filter = {}) {
        return await Bookmark.find(filter);
    }

    async updateById(id, updateData) {
        return await Bookmark.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteById(id) {
        return await Bookmark.findByIdAndDelete(id);
    }
}
