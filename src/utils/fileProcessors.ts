export async function readTextFile(file: File): Promise<string> {
  return await file.text();
}

export async function parseCSV(text: string) {
  // minimal CSV parse
  const rows = text.split(/\r?\n/).map((r) => r.split(","));
  return rows;
}
