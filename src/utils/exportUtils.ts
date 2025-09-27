export function exportChunksAsJSON(chunks: any[]) {
  return JSON.stringify(chunks, null, 2);
}

export function exportStatsAsCSV(stats: Record<string, any>) {
  const keys = Object.keys(stats);
  const vals = keys.map((k) => String(stats[k] ?? ""));
  return `${keys.join(",")}\n${vals.join(",")}`;
}
