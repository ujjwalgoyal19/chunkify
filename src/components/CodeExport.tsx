"use client";
import { exportChunksAsJSON } from "@/utils/exportUtils";

export default function CodeExport({ chunks }: { chunks?: any[] }) {
  const json = exportChunksAsJSON(chunks ?? []);
  return (
    <div>
      <h4>Code / Export (placeholder)</h4>
      <pre className="max-h-64 overflow-auto text-xs">{json}</pre>
    </div>
  );
}
