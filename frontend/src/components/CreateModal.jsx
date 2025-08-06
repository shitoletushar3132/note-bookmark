import React, { useEffect, useState } from "react";
import {
  X,
  FileText,
  Bookmark,
  Tag,
  Link,
  Type,
  AlignLeft,
  Save,
  Loader2,
} from "lucide-react";
import { createNote, updateNote } from "../api/notes";
import { createBookmark, updateBookmark } from "../api/bookmarks";

export const CreateModal = ({ onClose, refresh, onEdit = null }) => {
  const [type, setType] = useState("note");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim() && type === "note") {
      newErrors.title = "Title is required";
    }

    if (type === "note" && !content.trim()) {
      newErrors.content = "Content is required for notes";
    }

    if (type === "bookmark") {
      if (!url.trim()) {
        newErrors.url = "URL is required for bookmarks";
      } else {
        try {
          new URL(url);
        } catch {
          newErrors.url = "Please enter a valid URL";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        ...(type === "note"
          ? { content: content.trim() }
          : { url: url.trim() }),
      };

      if (onEdit) {
        if (type === "note") {
          await updateNote(onEdit.data.id, payload);
        } else {
          await updateBookmark(onEdit.data.id, payload);
        }
      } else {
        if (type === "note") {
          await createNote(payload);
        } else {
          await createBookmark(payload);
        }
      }

      // await cre(`/api/${type}s`, payload);
      refresh();
      onClose();
    } catch (error) {
      console.error("Failed to create content:", error);
      setErrors({ submit: "Failed to create content. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setErrors({});
  };

  useEffect(() => {
    if (onEdit) {
      const { type: editType, data: editData } = onEdit;
      setType(editType);
      setTitle(editData.title || "");
      setContent(editData.content || "");
      setUrl(editData.url || "");
      setTags(editData.tags?.join(", ") || "");
    }
  }, [onEdit]);

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              type === "note"
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-purple-100 dark:bg-purple-900/30"
            }`}
          >
            {type === "note" ? (
              <FileText
                className={`w-5 h-5 ${
                  type === "note"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-purple-600 dark:text-purple-400"
                }`}
              />
            ) : (
              <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Create New {type === "note" ? "Note" : "Bookmark"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {type === "note"
                ? "Capture your thoughts and ideas"
                : "Save important links and resources"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Type Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Content Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleTypeChange("note")}
              className={`relative flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                type === "note"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                  : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300"
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              <span className="font-medium">Note</span>
              {type === "note" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("bookmark")}
              className={`relative flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                type === "bookmark"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300"
              }`}
            >
              <Bookmark className="w-5 h-5 mr-2" />
              <span className="font-medium">Bookmark</span>
              {type === "bookmark" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            <Type className="w-4 h-4 inline mr-2" />
            Title
          </label>
          <input
            type="text"
            placeholder={`Enter ${type} title...`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`block w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.title
                ? "border-red-300 dark:border-red-600"
                : "border-slate-200 dark:border-slate-600"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        {/* Content or URL Input */}
        {type === "note" ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              <AlignLeft className="w-4 h-4 inline mr-2" />
              Content
            </label>
            <textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={`block w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.content
                  ? "border-red-300 dark:border-red-600"
                  : "border-slate-200 dark:border-slate-600"
              }`}
            />
            {errors.content && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.content}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              <Link className="w-4 h-4 inline mr-2" />
              URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`block w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.url
                  ? "border-red-300 dark:border-red-600"
                  : "border-slate-200 dark:border-slate-600"
              }`}
            />
            {errors.url && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.url}
              </p>
            )}
          </div>
        )}

        {/* Tags Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            <Tag className="w-4 h-4 inline mr-2" />
            Tags
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
              (optional)
            </span>
          </label>
          <input
            type="text"
            placeholder="work, important, ideas (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Separate multiple tags with commas
          </p>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-6 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              type === "note"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25"
                : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25"
            } ${
              isSubmitting
                ? "opacity-75 cursor-not-allowed"
                : "transform hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {onEdit ? "Saving..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {onEdit
                  ? "Save Changes"
                  : `Create ${type === "note" ? "Note" : "Bookmark"}`}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
