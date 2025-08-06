import Note from '../model/Note.js';

export default class NoteRepository {
    async create(noteData) {
        const note = new Note(noteData);
        return await note.save();
    }

    async findById(id) {
        return await Note.findById(id);
    }

    async findAll(filter = {}) {
        return await Note.find(filter);
    }

    async updateById(id, updateData) {
        return await Note.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteById(id) {
        return await Note.findByIdAndDelete(id);
    }
}