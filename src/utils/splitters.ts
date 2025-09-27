import type { Language, TokenEncoding } from "@/types";

// Basic, self-contained splitter implementations.
// These return arrays of objects shaped like LangChain Documents: { pageContent: string, metadata?: any }

type Doc = { pageContent: string; metadata?: Record<string, any> };

export const splitTextByCharacter = async (
  text: string,
  separator: string,
  chunkSize: number,
  chunkOverlap: number
) => {
  if (!text) return [];
  const sep = separator.replace("\\n", "\n").replace("\\t", "\t");
  // If a separator is provided, try to split along it first, otherwise fall back to raw slicing.
  const units = sep ? text.split(sep) : [text];
  const out: Doc[] = [];
  let buffer = "";

  for (let i = 0; i < units.length; i++) {
    const unit = units[i] + (sep || "");
    if ((buffer + unit).length <= chunkSize) {
      buffer += unit;
    } else {
      if (buffer.length) out.push({ pageContent: buffer });
      if (unit.length > chunkSize) {
        // slice large unit into pieces
        let j = 0;
        while (j < unit.length) {
          const slice = unit.slice(j, j + chunkSize);
          out.push({ pageContent: slice });
          j += Math.max(1, chunkSize - chunkOverlap);
        }
        buffer = "";
      } else {
        buffer = unit;
      }
    }
  }
  if (buffer.length) out.push({ pageContent: buffer });
  // Optionally apply overlap by re-chunking adjacent pieces (simple sliding overlap)
  if (chunkOverlap > 0) {
    const overlapped: Doc[] = [];
    for (let i = 0; i < out.length; i++) {
      const c = out[i].pageContent;
      overlapped.push({ pageContent: c });
      if (i < out.length - 1) {
        const tail = c.slice(Math.max(0, c.length - chunkOverlap));
        const next = out[i + 1].pageContent;
        overlapped.push({ pageContent: tail + next.slice(0, Math.max(0, chunkSize - tail.length)) });
      }
    }
    return overlapped;
  }
  return out;
};

export const splitTextRecursivelyByCharacter = async (
  text: string,
  separators: string[],
  chunkSize: number,
  chunkOverlap: number
) => {
  if (!text) return [];
  // Try to split by highest-level separator first and progressively split further when pieces exceed chunkSize.
  const normalize = (s: string) => s.replace("\\n", "\n").replace("\\t", "\t");
  const seps = separators.map(normalize).filter(Boolean);

  const trySplit = (input: string, idx = 0): Doc[] => {
    if (idx >= seps.length) {
      // final fallback: raw slicing
      const out: Doc[] = [];
      let i = 0;
      while (i < input.length) {
        out.push({ pageContent: input.slice(i, i + chunkSize) });
        i += Math.max(1, chunkSize - chunkOverlap);
      }
      return out;
    }
    const sep = seps[idx];
    const parts = input.split(sep);
    const out: Doc[] = [];
    for (const part of parts) {
      if (part.length <= chunkSize) out.push({ pageContent: part });
      else out.push(...trySplit(part, idx + 1));
    }
    return out;
  };

  return trySplit(text, 0);
};

export const splitCodeMarkupRecursivelyByCharacter = async (
  text: string,
  language: Language,
  chunkSize: number,
  chunkOverlap: number
) => {
  // For code/markup we can simply split on newlines and then chunk by characters.
  const units = text.split(/\n/).map((s) => s + "\n");
  const out: Doc[] = [];
  let buffer = "";
  for (const u of units) {
    if ((buffer + u).length <= chunkSize) buffer += u;
    else {
      if (buffer.length) out.push({ pageContent: buffer });
      if (u.length > chunkSize) {
        let j = 0;
        while (j < u.length) {
          out.push({ pageContent: u.slice(j, j + chunkSize) });
          j += Math.max(1, chunkSize - chunkOverlap);
        }
        buffer = "";
      } else buffer = u;
    }
  }
  if (buffer.length) out.push({ pageContent: buffer });
  return out;
};

export const splitTextByTokens = async (
  text: string,
  chunkSize: number = 25,
  chunkOverlap: number = 0,
  encodingName: TokenEncoding = "cl100k_base",
  keepSeparator: boolean = true
) => {
  if (!text) return [];
  // Naive token approximation: split on whitespace to get tokens.
  const tokens = text.split(/\s+/).filter(Boolean);
  const out: Doc[] = [];
  let i = 0;
  while (i < tokens.length) {
    const slice = tokens.slice(i, i + chunkSize).join(" ");
    out.push({ pageContent: slice });
    if (i + chunkSize >= tokens.length) break;
    i += Math.max(1, chunkSize - chunkOverlap);
  }
  return out;
};

export const splitTextSemantically = async (text: string, options?: any) => {
  // placeholder: semantic chunking would compute embeddings and cluster/split
  return await splitTextByCharacter(text, "\n\n", options?.chunkSize ?? 500, options?.chunkOverlap ?? 50);
};

export const splitTextHierarchically = async (text: string, options?: any) => {
  // placeholder for hierarchical splitting: return multiple granularities
  const top = await splitTextByCharacter(text, "\n\n", options?.baseChunkSize ?? 1000, options?.overlap ?? 50);
  const fine = await splitTextByCharacter(text, "\n", Math.max(200, Math.floor((options?.baseChunkSize ?? 1000) / 4)), options?.overlap ?? 20);
  return { top, fine };
};

export const splitTextSlidingWindow = async (text: string, size = 500, overlap = 100) => {
  const out: any[] = [];
  let i = 0;
  while (i < text.length) {
    const slice = text.slice(i, i + size);
    out.push({ pageContent: slice });
    if (i + size >= text.length) break;
    i += Math.max(1, size - overlap);
  }
  return out;
};

export const splitBySentences = async (text: string) => {
  // very naive sentence splitter
  const parts = text.split(/(?<=[.?!])\s+/);
  return parts.map((p) => ({ pageContent: p }));
};

export const splitByParagraphs = async (text: string) => {
  const parts = text.split(/\n{2,}/);
  return parts.map((p) => ({ pageContent: p }));
};
