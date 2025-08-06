import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NoteCard } from "../components/NoteCard";
import { BookmarkCard } from "../components/BookmarkCard";
import { CreateModal } from "../components/CreateModal";
import { FilterBar } from "../components/FilterBar";
import {
  Plus,
  LogOut,
  User,
  Menu,
  X,
  Grid3X3,
  List,
  Bookmark,
  FileText,
  ChevronDown,
} from "lucide-react";

import { deleteBookmark, getBookmarks } from "../api/bookmarks"; // <-- import bookmark API
import { deleteNote, getNotes } from "../api/notes";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [content, setContent] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [notesRes, bookmarksRes] = await Promise.all([
        getNotes(),
        getBookmarks(),
      ]);

      const notes = notesRes.data.map((note) => ({
        ...note,
        type: "note",
      }));

      const tagsSet = new Set();
      notes.forEach((note) => {
        note.tags?.forEach((tag) => tagsSet.add(tag));
      });
      setAllTags(Array.from(tagsSet));

      const bookmarks = bookmarksRes.data.map((bookmark) => ({
        ...bookmark,
        type: "bookmark",
      }));

      bookmarks.forEach((bookmark) => {
        bookmark.tags?.forEach((tag) => tagsSet.add(tag));
      });
      setAllTags(Array.from(tagsSet));

      const combined = [...notes, ...bookmarks];

      const filtered = combined.filter((item) => {
        const matchesType = filterType === "all" || item.type === filterType;
        const matchesSearch = item.title
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => item.tags?.includes(tag));
        return matchesType && matchesSearch && matchesTags;
      });

      setContent(filtered);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [filterType, searchText, selectedTags]);

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchContent();
    } catch (err) {
      console.error("Failed to delete content", err);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(id);
      fetchContent();
    } catch (err) {
      console.error("Failed to delete content", err);
    }
  };

  const stats = {
    total: content.length,
    notes: content.filter((item) => item.type === "note").length,
    bookmarks: content.filter((item) => item.type === "bookmark").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Content Hub
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Notes & Bookmarks
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {stats.notes}
                  </span>
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <Bookmark className="w-4 h-4 text-purple-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {stats.bookmarks}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title={`Switch to ${
                    viewMode === "grid" ? "list" : "grid"
                  } view`}
                >
                  {viewMode === "grid" ? (
                    <List className="w-5 h-5" />
                  ) : (
                    <Grid3X3 className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {stats.notes}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <Bookmark className="w-4 h-4 text-purple-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {stats.bookmarks}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {viewMode === "grid" ? (
                    <List className="w-5 h-5" />
                  ) : (
                    <Grid3X3 className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  setModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </button>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <FilterBar
              filterType={filterType}
              setFilterType={setFilterType}
              searchText={searchText}
              setSearchText={setSearchText}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              allTags={allTags}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Loading your content...
            </p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && (
          <>
            {content.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No content yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                  Get started by creating your first note or bookmark to
                  organize your thoughts and resources.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Item
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    : "space-y-4"
                }
              >
                {content.map((item) =>
                  item.type === "note" ? (
                    <div
                      key={item._id}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <NoteCard
                        data={item}
                        onDelete={handleDeleteNote}
                        viewMode={viewMode}
                        onEdit={() => {
                          setModalOpen(true);
                          setOnEdit({ type: "note", data: item });
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      key={item._id}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <BookmarkCard
                        data={item}
                        onDelete={handleDeleteBookmark}
                        viewMode={viewMode}
                        onEdit={() => {
                          setModalOpen(true);
                          setOnEdit({ type: "bookmark", data: item });
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-2xl rounded-2xl">
              <CreateModal
                onClose={() => setModalOpen(false)}
                refresh={fetchContent}
                onEdit={onEdit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
