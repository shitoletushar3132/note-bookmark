import React, { useState } from "react";
import {
  ExternalLink,
  Trash2,
  Tag,
  Calendar,
  Copy,
  Check,
  Globe,
  MoreVertical,
  Edit,
} from "lucide-react";

export const BookmarkCard = ({ data, onDelete, viewMode = "grid", onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      setIsDeleting(true);
      try {
        await onDelete(data._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
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

  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-all duration-200 ">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                  {data.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {getDomainFromUrl(data.url)}
                </p>
              </div>
            </div>

            {data.description && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                {data.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {data.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <div className="flex flex-wrap gap-1">
                      {data.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md"
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
                  onClick={handleCopyUrl}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  title="Copy URL"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  title="Open bookmark"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  title="Delete bookmark"
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
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                {data.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                {getDomainFromUrl(data.url)}
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
              <div className="absolute right-0 mt-1 flex gap-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 p-2 z-10">
                <button
                  onClick={handleCopyUrl}
                  className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                  title={copied ? "Copied!" : "Copy URL"}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
                <button
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  onClick={() => {
                    onEdit();
                  }}
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
                  title={isDeleting ? "Deleting..." : "Delete"}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {data.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-3">
            {data.description}
          </p>
        )}
      </div>

      {/* Tags */}
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
                className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md"
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

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          {data.createdAt && (
            <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(data.createdAt)}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyUrl}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-600 rounded-md transition-colors duration-200"
              title="Copy URL"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xs font-medium rounded-md transition-all duration-200 transform hover:scale-105"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
