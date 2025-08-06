import React, { useState } from "react";
import {
  FileText,
  Trash2,
  Tag,
  Calendar,
  Copy,
  Check,
  MoreVertical,
  Edit3,
  Edit,
} from "lucide-react";

export const NoteCard = ({ data, onDelete, viewMode = "grid", onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(data.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy content:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      try {
        await onDelete(data._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getWordCount = (content) => {
    return content.trim().split(/\s+/).length;
  };

  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                  {data.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {getWordCount(data.content)} words
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
              {data.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {data.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <div className="flex flex-wrap gap-1">
                      {data.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {data.tags.length > 3 && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          +{data.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {data.createdAt && (
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(data.createdAt)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyContent}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  title="Copy content"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => onEdit()}
                  className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  title="Edit note"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                {data.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {getWordCount(data.content)} words
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 py-1 z-10">
                <button
                  onClick={handleCopyContent}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center space-x-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy Content"}</span>
                </button>

                <button
                  onClick={() => onEdit()}
                  // disabled={isDeleting}
                  className="w-full text-left px-3 py-2 text-sm  text-blue-600 dark:text-blue-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {expanded ? data.content : truncateContent(data.content)}
          </p>
          {data.content.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 font-medium"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {data.tags.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center space-x-1 mb-2">
            <Tag className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {data.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
              >
                {tag}
              </span>
            ))}
            {data.tags.length > 4 && (
              <span className="inline-block px-2 py-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-md">
                +{data.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            {data.createdAt && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(data.createdAt)}</span>
              </div>
            )}
            {data.updatedAt && data.updatedAt !== data.createdAt && (
              <div className="flex items-center space-x-1">
                <Edit3 className="w-3 h-3" />
                <span>Updated {formatDate(data.updatedAt)}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleCopyContent}
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium rounded-md transition-all duration-200 transform hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
