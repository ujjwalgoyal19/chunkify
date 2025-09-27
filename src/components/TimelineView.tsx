"use client";
import React, { useMemo, useState } from "react";
import { useVisualizationContext } from "@/contexts/visualization-context";

type TimelineChunk = {
  id: string;
  x: number;
  width: number;
  color: string;
  chunk: any;
};

export default function TimelineView() {
  const { 
    chunks, 
    filteredChunks, 
    selectedChunkId, 
    hoveredChunkId,
    onSelectChunk, 
    onHoverChunk,
    onFilter 
  } = useVisualizationContext();
  
  const [brushStart, setBrushStart] = useState<number | null>(null);
  const [brushEnd, setBrushEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const timelineData = useMemo(() => {
    if (chunks.length === 0) return [];
    
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    let currentPosition = 0;
    
    return chunks.map((chunk, index) => {
      const width = (chunk.length / totalLength) * 100;
      const x = (currentPosition / totalLength) * 100;
      currentPosition += chunk.length;
      
      // Color based on various metrics
      let color = "#6b7280"; // default gray
      
      if (selectedChunkId === chunk.id) {
        color = "#fbbf24"; // yellow for selected
      } else if (hoveredChunkId === chunk.id) {
        color = "#f59e0b"; // darker yellow for hovered
      } else if (filteredChunks.length > 0 && filteredChunks.length < chunks.length) {
        color = filteredChunks.some(fc => fc.id === chunk.id) ? "#3b82f6" : "#d1d5db";
      } else {
        // Color by length (heat map)
        const lengths = chunks.map(c => c.length);
        const minLen = Math.min(...lengths);
        const maxLen = Math.max(...lengths);
        const normalized = maxLen > minLen ? (chunk.length - minLen) / (maxLen - minLen) : 0.5;
        
        // Blue to red gradient based on length
        const intensity = Math.round(normalized * 255);
        color = `rgb(${255 - intensity}, ${intensity}, 100)`;
      }
      
      return {
        id: chunk.id,
        x,
        width: Math.max(width, 0.5), // Minimum width for visibility
        color,
        chunk,
      };
    });
  }, [chunks, selectedChunkId, hoveredChunkId, filteredChunks]);

  const handleChunkClick = (chunkData: TimelineChunk) => {
    onSelectChunk(chunkData.id);
  };

  const handleChunkHover = (chunkData: TimelineChunk | null) => {
    onHoverChunk(chunkData?.id || null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBrushStart(x);
    setBrushEnd(x);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || brushStart === null) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBrushEnd(x);
  };

  const handleMouseUp = () => {
    if (isDragging && brushStart !== null && brushEnd !== null) {
      const start = Math.min(brushStart, brushEnd);
      const end = Math.max(brushStart, brushEnd);
      
      // Find chunks within the brush selection
      const selectedChunks = timelineData.filter(chunk => {
        const chunkStart = chunk.x;
        const chunkEnd = chunk.x + chunk.width;
        return chunkEnd >= start && chunkStart <= end;
      });
      
      onFilter(selectedChunks.map(chunk => chunk.id));
    }
    
    setIsDragging(false);
    setBrushStart(null);
    setBrushEnd(null);
  };

  const clearFilter = () => {
    onFilter([]);
  };

  if (timelineData.length === 0) {
    return (
      <div className="w-full h-32 flex items-center justify-center text-gray-500 border rounded">
        No chunk data available
      </div>
    );
  }

  const brushSelection = brushStart !== null && brushEnd !== null && isDragging ? {
    left: Math.min(brushStart, brushEnd),
    width: Math.abs(brushEnd - brushStart),
  } : null;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Chunk Timeline</h3>
          <p className="text-sm text-gray-600">
            Click chunks to select, drag to filter by range
          </p>
        </div>
        {filteredChunks.length > 0 && filteredChunks.length < chunks.length && (
          <button
            onClick={clearFilter}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Clear Filter ({filteredChunks.length} of {chunks.length})
          </button>
        )}
      </div>
      
      <div 
        className="relative w-full h-16 bg-gray-100 rounded border cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Brush selection overlay */}
        {brushSelection && (
          <div
            className="absolute top-0 bottom-0 bg-blue-200 opacity-50 pointer-events-none"
            style={{
              left: `${brushSelection.left}%`,
              width: `${brushSelection.width}%`,
            }}
          />
        )}
        
        {/* Chunk bars */}
        {timelineData.map((chunkData) => (
          <div
            key={chunkData.id}
            className="absolute top-1 bottom-1 cursor-pointer transition-all hover:opacity-80"
            style={{
              left: `${chunkData.x}%`,
              width: `${chunkData.width}%`,
              backgroundColor: chunkData.color,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleChunkClick(chunkData);
            }}
            onMouseEnter={() => handleChunkHover(chunkData)}
            onMouseLeave={() => handleChunkHover(null)}
            title={`Chunk ${chunks.indexOf(chunkData.chunk) + 1} (${chunkData.chunk.length} chars)`}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-2 text-xs text-gray-500 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gradient-to-r from-red-200 to-blue-200 rounded"></div>
          <span>Length (red=long, blue=short)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Filtered</span>
        </div>
      </div>
    </div>
  );
}