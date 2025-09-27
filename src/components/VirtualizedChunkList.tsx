"use client";
import React, { useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { useVisualizationContext } from "@/contexts/visualization-context";

interface ChunkItemProps {
  index: number;
  style: React.CSSProperties;
}

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

  const ChunkItem: React.FC<ChunkItemProps> = ({ index, style }) => {
    const chunk = filteredChunks[index];
    if (!chunk) return null;

    const isSelected = selectedChunkId === chunk.id;
    const isHovered = hoveredChunkId === chunk.id;
    
    const displayText = chunk.content.length > 200 
      ? chunk.content.substring(0, 200) + "..." 
      : chunk.content;

    return (
      <div style={style}>
        <div
          className={`mx-2 my-1 p-4 border rounded-lg cursor-pointer transition-all ${
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
      </div>
    );
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

  const shouldVirtualize = filteredChunks.length > 50;

  if (!shouldVirtualize) {
    // Render without virtualization for small lists
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
        
        <div className="space-y-1">
          {filteredChunks.map((chunk, index) => (
            <ChunkItem
              key={chunk.id}
              index={index}
              style={{ height: ITEM_HEIGHT }}
            />
          ))}
        </div>
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
        <p className="text-xs text-gray-500">
          Using virtualization for performance
        </p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <List
          height={400}
          itemCount={filteredChunks.length}
          itemSize={ITEM_HEIGHT}
          itemData={filteredChunks}
        >
          {ChunkItem}
        </List>
      </div>
    </div>
  );
}