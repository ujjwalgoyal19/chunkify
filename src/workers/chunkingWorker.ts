// Worker entry (module worker)
self.addEventListener("message", async (e: MessageEvent) => {
  const { id, action, payload } = e.data || {};
  try {
    if (action === "chunk") {
      // trivial chunking as placeholder
      const text = payload.text || "";
      const size = payload.size || 500;
      const chunks = [];
      for (let i = 0; i < text.length; i += size) {
        chunks.push({ pageContent: text.slice(i, i + size) });
        const progress = Math.min(
          100,
          Math.floor((i / Math.max(1, text.length)) * 100)
        );
        self.postMessage({ id, progress });
      }
      self.postMessage({ id, result: chunks });
    }
  } catch (err) {
    self.postMessage({ id, error: String(err) });
  }
});

export {};
