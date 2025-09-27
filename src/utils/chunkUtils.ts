import { Document } from "langchain/document";
import { ChunkData } from "@/contexts/visualization-context";
import { v4 as uuidv4 } from "uuid";

export function convertDocumentsToChunkData(documents: Document[]): ChunkData[] {
  return documents.map((doc, index) => {
    const metadata = doc.metadata || {};
    
    return {
      id: metadata.id || uuidv4(),
      content: doc.pageContent,
      startIndex: metadata.startIndex ?? index,
      endIndex: metadata.endIndex ?? index + 1,
      charStart: metadata.charStart ?? 0,
      charEnd: metadata.charEnd ?? doc.pageContent.length,
      tokensCount: metadata.tokensCount,
      length: metadata.length ?? doc.pageContent.length,
    };
  });
}

export function estimateTokenCount(text: string): number {
  // Simple token estimation: words + punctuation
  return text.split(/\s+/).filter(Boolean).length + 
         (text.match(/[.!?,:;]/g) || []).length;
}