"use client";
import React from "react";
import { useVisualizationContext } from "@/contexts/visualization-context";
import HistogramChart from "./HistogramChart";
import TimelineView from "./TimelineView";
import VirtualizedChunkList from "./VirtualizedChunkList";
import SearchBar from "./SearchBar";

export default function VisualizerPanel() {
  const { chunks, filteredChunks, selectedChunk } = useVisualizationContext();

  if (chunks.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <div className="text-lg mb-2">No chunks to visualize</div>
          <div className="text-sm">Enter some text above to see the visualization</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chunk Visualization</h2>
          <p className="text-gray-600">
            {chunks.length} chunks | 
            {filteredChunks.length !== chunks.length && ` ${filteredChunks.length} filtered |`}
            {selectedChunk && ` Selected: Chunk with ${selectedChunk.length} chars`}
          </p>
        </div>
        <SearchBar className="w-full sm:w-80" />
      </div>

      {/* Main visualization grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Charts */}
        <div className="space-y-6">
          {/* Histogram Chart */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <HistogramChart />
          </div>
          
          {/* Timeline View */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <TimelineView />
          </div>
        </div>

        {/* Right column - Chunk list */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <VirtualizedChunkList />
        </div>
      </div>

      {/* Selected chunk details */}
      {selectedChunk && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Selected Chunk Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Length:</span>
              <div className="text-blue-700">{selectedChunk.length} characters</div>
            </div>
            <div>
              <span className="font-medium text-blue-800">Position:</span>
              <div className="text-blue-700">{selectedChunk.startIndex} - {selectedChunk.endIndex}</div>
            </div>
            <div>
              <span className="font-medium text-blue-800">Character Range:</span>
              <div className="text-blue-700">{selectedChunk.charStart} - {selectedChunk.charEnd}</div>
            </div>
            {selectedChunk.tokensCount && (
              <div>
                <span className="font-medium text-blue-800">Tokens:</span>
                <div className="text-blue-700">{selectedChunk.tokensCount}</div>
              </div>
            )}
          </div>
          <div className="mt-3">
            <span className="font-medium text-blue-800 block mb-1">Content Preview:</span>
            <div className="text-blue-700 text-sm bg-white p-3 rounded border max-h-32 overflow-y-auto">
              {selectedChunk.content.substring(0, 500)}
              {selectedChunk.content.length > 500 && "..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}