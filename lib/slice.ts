export function sliceSection(md: string, start: string, end?: string): string | null {
  const lines = md.split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith(start));
  if (startIdx === -1) return null;
  const endIdx = end ? lines.findIndex((l, i) => i > startIdx && l.startsWith(end)) : -1;
  const slice = endIdx === -1 ? lines.slice(startIdx) : lines.slice(startIdx, endIdx);
  return slice.join("\n");
}

export function assertSlice(slice: string | null, message: string): string {
  if (!slice) throw new Error(message);
  return slice;
}
