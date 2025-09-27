"use client";
import React from "react";
import { useVisualizationContext } from "@/contexts/visualization-context";

const ITEM_HEIGHT = 120;

export default function VirtualizedChunkList() {
  const { 
    filteredChunks, 
    selectedChunkId, 
    hoveredChunkId,
    searchQuery,
    onSelectChunk, 
    onHoverChunk 
  } = useVisualizationContext();

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <mark 
            key={index} 
            className="bg-yellow-200 text-yellow-900 px-1 rounded"
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  if (filteredChunks.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
        <div className="text-lg mb-2">No chunks found</div>
        {searchQuery && (
          <div className="text-sm">
            No chunks match your search: "{searchQuery}"
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Chunks ({filteredChunks.length})
        </h3>
        {searchQuery && (
          <p className="text-sm text-gray-600">
            Showing results for: "{searchQuery}"
          </p>
        )}
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredChunks.map((chunk, index) => {
          const isSelected = selectedChunkId === chunk.id;
          const isHovered = hoveredChunkId === chunk.id;
          
          const displayText = chunk.content.length > 200 
            ? chunk.content.substring(0, 200) + "..." 
            : chunk.content;

          return (
            <div
              key={chunk.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected 
                  ? "border-yellow-400 bg-yellow-50 shadow-md" 
                  : isHovered
                  ? "border-blue-300 bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => onSelectChunk(chunk.id)}
              onMouseEnter={() => onHoverChunk(chunk.id)}
              onMouseLeave={() => onHoverChunk(null)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Chunk {index + 1}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({chunk.length} chars)
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {chunk.startIndex}-{chunk.endIndex}
                </div>
              </div>
              
              <div className="text-sm text-gray-800 leading-relaxed">
                {highlightText(displayText, searchQuery)}
              </div>
              
              {chunk.tokensCount && (
                <div className="mt-2 text-xs text-gray-500">
                  Tokens: {chunk.tokensCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}