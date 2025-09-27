export async function extractEntities(_text: string) {
  // naive entity extraction: capitalized words
  const matches = Array.from(_text.matchAll(/\b([A-Z][a-z]{2,})\b/g));
  return matches.map((m) => ({ text: m[1] }));
}
