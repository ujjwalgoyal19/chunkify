export async function embedText(_text: string, _model?: string) {
  // placeholder embedding (returns random vector)
  return Array.from({ length: 8 }).map(() => Math.random());
}

export function cosine(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * (b[i] ?? 0), 0);
  const na = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const nb = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return na && nb ? dot / (na * nb) : 0;
}
