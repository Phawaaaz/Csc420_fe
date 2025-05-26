import React, { useState, useRef, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  type: "building" | "department" | "facility" | "general";
  coordinates?: { lat: number; lng: number };
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
  suggestions?: SearchSuggestion[];
  placeholder?: string;
  className?: string;
  maxSuggestions?: number;
  showSuggestionsOnFocus?: boolean;
}

/**
 * Enhanced search bar component with autocomplete suggestions
 *
 * Example usage:
 * ```jsx
 * <SearchBar
 *   onSearch={handleSearch}
 *   onSelectSuggestion={handleSuggestionSelect}
 *   suggestions={searchSuggestions}
 *   placeholder="Search buildings, departments..."
 * />
 * ```
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSelectSuggestion,
  suggestions = [],
  placeholder = "Search buildings, departments...",
  className = "",
  maxSuggestions = 8,
  showSuggestionsOnFocus = true,
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestion[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (!query.trim() && !showSuggestionsOnFocus) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions
      .filter((suggestion) => {
        const searchTerm = query.toLowerCase().trim();
        return (
          suggestion.title.toLowerCase().includes(searchTerm) ||
          (suggestion.subtitle &&
            suggestion.subtitle.toLowerCase().includes(searchTerm))
        );
      })
      .slice(0, maxSuggestions);

    setFilteredSuggestions(filtered);
  }, [query, suggestions, maxSuggestions, showSuggestionsOnFocus]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(true);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (showSuggestionsOnFocus || query.trim()) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur with delay to allow suggestion click
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (showSuggestions && filteredSuggestions.length > 0) {
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        if (showSuggestions && filteredSuggestions.length > 0) {
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredSuggestions.length - 1
          );
        }
        break;

      case "Enter":
        e.preventDefault();
        if (
          showSuggestions &&
          activeSuggestionIndex >= 0 &&
          filteredSuggestions[activeSuggestionIndex]
        ) {
          // Select the highlighted suggestion
          handleSuggestionSelect(filteredSuggestions[activeSuggestionIndex]);
        } else if (query.trim()) {
          // Perform search with current query
          onSearch(query.trim());
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);

    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    } else {
      onSearch(suggestion.title);
    }
  };

  // Get suggestion type icon
  const getSuggestionIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "building":
        return "🏢";
      case "department":
        return "🎓";
      case "facility":
        return "🏛️";
      default:
        return "📍";
    }
  };

  // Get suggestion type color
  const getSuggestionTypeColor = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "building":
        return "text-blue-600 bg-blue-50";
      case "department":
        return "text-green-600 bg-green-50";
      case "facility":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex w-full items-center">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            icon={<Icon name="Search" size={18} />}
            className="rounded-r-none border-r-0 w-full"
            fullWidth
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="h-[38px] rounded-l-none"
        >
          <Icon name="Search" size={18} />
        </Button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`
                flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0
                ${
                  index === activeSuggestionIndex
                    ? "bg-blue-50 border-blue-100"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <span className="text-lg mr-3">
                {getSuggestionIcon(suggestion.type)}
              </span>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {suggestion.title}
                </div>
                {suggestion.subtitle && (
                  <div className="text-sm text-gray-500 truncate">
                    {suggestion.subtitle}
                  </div>
                )}
              </div>

              <span
                className={`
                px-2 py-1 text-xs font-medium rounded-full capitalize
                ${getSuggestionTypeColor(suggestion.type)}
              `}
              >
                {suggestion.type}
              </span>
            </div>
          ))}

          {/* Search query suggestion */}
          {query.trim() &&
            !filteredSuggestions.some(
              (s) => s.title.toLowerCase() === query.toLowerCase()
            ) && (
              <div
                onClick={() => onSearch(query.trim())}
                className={`
                flex items-center px-4 py-3 cursor-pointer transition-colors border-t border-gray-200
                ${
                  activeSuggestionIndex === filteredSuggestions.length
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }
              `}
              >
                <Icon name="Search" size={16} className="mr-3 text-gray-500" />
                <span className="text-gray-700">
                  Search for "<span className="font-medium">{query}</span>"
                </span>
              </div>
            )}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && query.trim() && filteredSuggestions.length === 0 && (
        <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50">
          <div className="px-4 py-6 text-center text-gray-500">
            <Icon
              name="Search"
              size={24}
              className="mx-auto mb-2 text-gray-400"
            />
            <p className="text-sm">No results found for "{query}"</p>
            <p className="text-xs mt-1">
              Try searching for buildings, departments, or facilities
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
