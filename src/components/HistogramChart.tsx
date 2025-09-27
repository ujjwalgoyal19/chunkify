"use client";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useVisualizationContext } from "@/contexts/visualization-context";

type HistogramBin = {
  range: string;
  count: number;
  minSize: number;
  maxSize: number;
  chunkIds: string[];
};

export default function HistogramChart() {
  const { chunks, filteredChunks, onFilter, selectedChunkId } = useVisualizationContext();

  const histogramData = useMemo(() => {
    const dataToUse = chunks.length > 0 ? chunks : [];
    if (dataToUse.length === 0) return [];

    const lengths = dataToUse.map(chunk => chunk.length);
    const minLength = Math.min(...lengths);
    const maxLength = Math.max(...lengths);
    
    // Create 10 bins
    const binCount = Math.min(10, Math.max(3, Math.ceil(Math.sqrt(dataToUse.length))));
    const binSize = Math.max(1, Math.ceil((maxLength - minLength) / binCount));
    
    const bins: HistogramBin[] = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = minLength + i * binSize;
      const binEnd = i === binCount - 1 ? maxLength : binStart + binSize - 1;
      
      const chunksInBin = dataToUse.filter(chunk => 
        chunk.length >= binStart && chunk.length <= binEnd
      );
      
      bins.push({
        range: `${binStart}-${binEnd}`,
        count: chunksInBin.length,
        minSize: binStart,
        maxSize: binEnd,
        chunkIds: chunksInBin.map(chunk => chunk.id),
      });
    }
    
    return bins;
  }, [chunks]);

  const handleBarClick = (data: HistogramBin) => {
    // Filter to show only chunks in this bin
    onFilter(data.chunkIds);
  };

  const getBarColor = (bin: HistogramBin) => {
    const isFiltered = filteredChunks.length > 0 && filteredChunks.length < chunks.length;
    const hasSelectedChunk = selectedChunkId && bin.chunkIds.includes(selectedChunkId);
    
    if (hasSelectedChunk) return "#fbbf24"; // yellow for selected
    if (isFiltered && bin.chunkIds.some(id => filteredChunks.map(c => c.id).includes(id))) {
      return "#3b82f6"; // blue for filtered
    }
    return "#6b7280"; // gray for default
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as HistogramBin;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{`Length Range: ${data.range}`}</p>
          <p className="text-blue-600">{`Chunks: ${data.count}`}</p>
          <p className="text-sm text-gray-500">Click to filter</p>
        </div>
      );
    }
    return null;
  };

  if (histogramData.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        No chunk data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Chunk Length Distribution</h3>
        <p className="text-sm text-gray-600">
          Click on bars to filter chunks by length range
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={histogramData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="range" 
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            cursor="pointer"
            onClick={handleBarClick}
          >
            {histogramData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(entry)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}