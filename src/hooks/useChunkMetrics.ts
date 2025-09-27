import { useMemo } from "react";

export default function useChunkMetrics(chunks: any[]) {
  return useMemo(() => {
    const count = chunks.length;
    const lengths = chunks.map((c) =>
      c.pageContent ? c.pageContent.length : 0
    );
    const total = lengths.reduce((s, v) => s + v, 0);
    const avg = count ? total / count : 0;
    return {
      count,
      total,
      avg,
      min: Math.min(...lengths, 0),
      max: Math.max(...lengths, 0),
    };
  }, [chunks]);
}
