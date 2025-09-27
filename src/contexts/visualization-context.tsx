"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type Props = {
  children: React.ReactNode;
};

export interface ChunkData {
  id: string;
  content: string;
  startIndex: number;
  endIndex: number;
  charStart: number;
  charEnd: number;
  tokensCount?: number;
  length: number;
}

type VisualizationContextType = {
  // State
  selectedChunkId: string | null;
  hoveredChunkId: string | null;
  filteredChunkIds: string[];
  searchQuery: string;
  chunks: ChunkData[];
  
  // Actions
  onSelectChunk: (id: string | null) => void;
  onHoverChunk: (id: string | null) => void;
  onFilter: (chunkIds: string[]) => void;
  onSearch: (query: string) => void;
  setChunks: (chunks: ChunkData[]) => void;
  
  // Computed
  filteredChunks: ChunkData[];
  selectedChunk: ChunkData | null;
};

const VisualizationContext = createContext<VisualizationContextType | null>(null);

export default function VisualizationContextProvider({ children }: Props) {
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null);
  const [hoveredChunkId, setHoveredChunkId] = useState<string | null>(null);
  const [filteredChunkIds, setFilteredChunkIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [chunks, setChunks] = useState<ChunkData[]>([]);

  const onSelectChunk = useCallback((id: string | null) => {
    setSelectedChunkId(id);
  }, []);

  const onHoverChunk = useCallback((id: string | null) => {
    setHoveredChunkId(id);
  }, []);

  const onFilter = useCallback((chunkIds: string[]) => {
    setFilteredChunkIds(chunkIds);
  }, []);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Filter chunks that contain the search query
      const matchingIds = chunks
        .filter(chunk => 
          chunk.content.toLowerCase().includes(query.toLowerCase())
        )
        .map(chunk => chunk.id);
      setFilteredChunkIds(matchingIds);
    } else {
      setFilteredChunkIds([]);
    }
  }, [chunks]);

  // Computed values
  const filteredChunks = React.useMemo(() => {
    if (filteredChunkIds.length === 0 && !searchQuery.trim()) {
      return chunks;
    }
    return chunks.filter(chunk => 
      filteredChunkIds.length === 0 || filteredChunkIds.includes(chunk.id)
    );
  }, [chunks, filteredChunkIds, searchQuery]);

  const selectedChunk = React.useMemo(() => {
    return chunks.find(chunk => chunk.id === selectedChunkId) || null;
  }, [chunks, selectedChunkId]);

  const value: VisualizationContextType = {
    selectedChunkId,
    hoveredChunkId,
    filteredChunkIds,
    searchQuery,
    chunks,
    onSelectChunk,
    onHoverChunk,
    onFilter,
    onSearch,
    setChunks,
    filteredChunks,
    selectedChunk,
  };

  return (
    <VisualizationContext.Provider value={value}>
      {children}
    </VisualizationContext.Provider>
  );
}

export function useVisualizationContext() {
  const context = useContext(VisualizationContext);
  if (context === null) {
    throw new Error(
      "useVisualizationContext must be used within VisualizationContextProvider"
    );
  }
  return context;
}