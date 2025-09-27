"use client";
import React from "react";
import useChunkMetrics from "@/hooks/useChunkMetrics";

export default function ChunkCharts({ chunks }: { chunks?: any[] }) {
  const metrics = useChunkMetrics(chunks ?? []);
  return (
    <div>
      <h4>Charts (placeholder)</h4>
      <div>Chunks: {metrics.count}</div>
      <div>Average size: {Math.round(metrics.avg)}</div>
    </div>
  );
}
