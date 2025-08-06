import React from "react";
import {
  Search,
  X,
  Tag,
  FileText,
  Bookmark,
  ChevronDown,
  Filter,
} from "lucide-react";

export const FilterBar = ({
  filterType,
  setFilterType,
  searchText,
  setSearchText,
  selectedTags,
  setSelectedTags,
  allTags = [],
}) => {
  const filterOptions = [
    { value: "all", label: "All Items", icon: Filter },
    { value: "note", label: "Notes", icon: FileText },
    { value: "bookmark", label: "Bookmarks", icon: Bookmark },
  ];

  const handleTagSelect = (e) => {
    const selected = e.target.value;
    if (selected && !selectedTags.includes(selected)) {
      setSelectedTags([...selectedTags, selected]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setFilterType("all");
    setSearchText("");
    setSelectedTags([]);
  };

  const hasActiveFilters =
    filterType !== "all" || searchText || selectedTags.length > 0;

  return (
    <div className="space-y-4 w-full">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes and bookmarks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
            </button>
          )}
        </div>

        {/* Filter Type */}
        <div className="relative w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 pr-10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      {/* Tag Filter */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 w-full">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Filter by Tags
          </label>
          <select
            value=""
            onChange={handleTagSelect}
            className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="" disabled>
              Select a tag...
            </option>
            {allTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filter Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span>Active filters:</span>
          {filterType !== "all" && (
            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {filterOptions.find((opt) => opt.value === filterType)?.label}
            </span>
          )}
          {searchText && (
            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Search: "{searchText}"
            </span>
          )}
          {selectedTags.length > 0 && (
            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {selectedTags.length} tag{selectedTags.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
