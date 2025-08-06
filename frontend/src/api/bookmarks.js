import api from "./api";

// Get all bookmarks
export const getBookmarks = async () => {
    const response = await api.get("/bookmarks");
    return response.data;
};

// Get a single bookmark by ID
export const getBookmarkById = async (id) => {
    const response = await api.get(`/bookmarks/${id}`);
    return response.data;
};

// Create a new bookmark
export const createBookmark = async (bookmarkData) => {
    const response = await api.post("/bookmarks", bookmarkData);
    return response.data;
};

// Update an existing bookmark
export const updateBookmark = async (id, bookmarkData) => {
    const response = await api.put(`/bookmarks/${id}`, bookmarkData);
    return response.data;
};

// Delete a bookmark
export const deleteBookmark = async (id) => {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
};