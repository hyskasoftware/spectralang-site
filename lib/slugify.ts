const OVERRIDES: Record<string, string> = {
  "Pattern Matching - match": "pattern-matching",
  "Interface de Linha de Comando": "cli",
  "Option<T> e Result<T, E>": "option-result",
};

export function ptPart(text: string): string {
  const idx = text.indexOf(" / ");
  return idx === -1 ? text.trim() : text.slice(0, idx).trim();
}

export function stripMdText(raw: string): string {
  return raw
    .replace(/^#{1,6}\s+/, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*|__/g, "")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripNumber(text: string): string {
  return text.replace(/^\d+\.\s*/, "").trim();
}

export function moduleSlug(pt: string): string | null {
  const m = pt.match(/^std\.([a-z_]+)/);
  return m ? `std-${m[1].toLowerCase()}` : null;
}

export function fullSlug(text: string): string {
  const pt = stripNumber(ptPart(text));
  return pt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugify(text: string): string {
  const pt = stripNumber(ptPart(text));
  if (OVERRIDES[pt]) return OVERRIDES[pt];
  return moduleSlug(pt) ?? fullSlug(text);
}

export function headingNumber(text: string): string {
  const m = ptPart(text).match(/^\d+/);
  return m ? String(m[0]).padStart(2, "0") : "";
}
