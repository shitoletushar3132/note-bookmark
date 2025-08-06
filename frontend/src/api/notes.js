import api from "./api";

// Create a new note
export const createNote = async (noteData) => {
    const response = await api.post("/notes", noteData);
    return response.data;
};

// Get all notes
export const getNotes = async () => {
    const response = await api.get("/notes");
    return response.data;
};

// Get a single note by ID
export const getNoteById = async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
};

// Update a note by ID
export const updateNote = async (id, noteData) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
};

// Delete a note by ID
export const deleteNote = async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
};