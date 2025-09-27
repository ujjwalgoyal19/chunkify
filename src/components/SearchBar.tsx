"use client";
import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useVisualizationContext } from "@/contexts/visualization-context";
import { Search, X } from "lucide-react";

type Props = {
  placeholder?: string;
  className?: string;
};

export default function SearchBar({ placeholder = "Search chunks...", className = "" }: Props) {
  const { searchQuery, onSearch } = useVisualizationContext();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setLocalQuery(query);
    onSearch(query);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setLocalQuery("");
    onSearch("");
  }, [onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
    }
  }, [handleClear]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="text-sm text-gray-500 mt-1">
          Search results for: "{searchQuery}"
        </div>
      )}
    </div>
  );
}