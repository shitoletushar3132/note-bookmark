import NoteRepository from "../repository/noteRepository.js";

export default class NoteService {
  constructor(noteRepository) {
    this.repo = noteRepository;
  }

  async createNote(noteData) {
    console.log("Creating note with data:", noteData.title, noteData.content);
    return await this.repo.create(noteData);
  }

  async getNoteById(id, userId) {
    const note = await this.repo.findById(id);
    if (!note || note.userId.toString() !== userId.toString()) {
      throw new Error("Note not found or unauthorized");
    }
    return note;
  }

  async getAllNotes(userId, filters = {}) {
    const query = { userId, ...filters };
    return await this.repo.findAll(query);
  }

  async updateNote(id, updateData, userId) {
    const note = await this.repo.findById(id);
    if (!note || note.userId.toString() !== userId.toString()) {
      throw new Error("Note not found or unauthorized");
    }

    return await this.repo.updateById(id, updateData);
  }

  async deleteNote(id, userId) {
    const note = await this.repo.findById(id);
    if (!note || note.userId.toString() !== userId.toString()) {
      throw new Error("Note not found or unauthorized");
    }

    return await this.repo.deleteById(id);
  }
}
