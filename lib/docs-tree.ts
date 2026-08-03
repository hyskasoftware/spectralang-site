import fs from "node:fs";
import path from "node:path";
import {
  referenceFiles,
  readmeLocalPath,
  docSliceAnchors,
  chapterSlugs,
  toolingPages,
  type ToolingItem,
} from "./docs";
import { slugify, ptPart, stripMdText, stripNumber, headingNumber, fullSlug } from "./slugify";
import { sliceSection, assertSlice } from "./slice";

export type DocHeading = {
  level: number;
  text: string;
  line: number;
  id: string;
};

export type SubSection = { text: string; id: string; level: number };

export type DocTopic = {
  slug: string;
  number: string;
  title: string;
  titleFull: string;
  startLine: number;
  endLine: number;
  subsections: SubSection[];
};

export type DocChapter = {
  slug: string;
  id: string;
  label: string;
  title: string;
  description: string;
  sourcePath: string;
  topics: DocTopic[];
};

export type DocPage = {
  href: string;
  label: string;
  kind: "chapter" | "topic" | "tooling";
};

const SKIP_TOPIC = /sum[áa]rio|table of contents|exact-width numeric contract|[íi]ndice de todos os arquivos/i;

export function readMarkdown(rel: string): string {
  return fs.readFileSync(path.join(process.cwd(), rel), "utf8");
}

function uniqId(base: string, used: Set<string>): string {
  let id = base || "secao";
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

export function parseHeadings(md: string): DocHeading[] {
  const lines = md.split("\n");
  const out: DocHeading[] = [];
  const used = new Set<string>();
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const level = m[1].length;
    const text = stripMdText(m[2]);
    out.push({ level, text, line: i, id: uniqId(slugify(text), used) });
  }
  return out;
}

export function buildChapter(ref: (typeof referenceFiles)[number], slug: string): DocChapter {
  const md = readMarkdown(ref.localPath);
  const headings = parseHeadings(md);
  const topics: DocTopic[] = [];
  const usedSlugs = new Set<string>();
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    if (h.level !== 2 || SKIP_TOPIC.test(ptPart(h.text))) continue;
    const next = headings.slice(i + 1).find((x) => x.level === 2);
    const endLine = next ? next.line : md.split("\n").length;
    const subsections = headings
      .filter((x) => x.line > h.line && x.line < endLine && x.level >= 3)
      .map((x) => ({ text: ptPart(x.text), id: x.id, level: x.level }));
    let topicSlug = slugify(h.text);
    if (usedSlugs.has(topicSlug)) {
      topicSlug = fullSlug(h.text);
    }
    let n = 2;
    while (usedSlugs.has(topicSlug)) {
      topicSlug = `${fullSlug(h.text)}-${n}`;
      n += 1;
    }
    usedSlugs.add(topicSlug);
    topics.push({
      slug: topicSlug,
      number: headingNumber(h.text),
      title: stripNumber(ptPart(h.text)),
      titleFull: h.text,
      startLine: h.line,
      endLine,
      subsections,
    });
  }
  return {
    slug,
    id: ref.id,
    label: ref.label,
    title: ref.title,
    description: ref.description,
    sourcePath: ref.localPath,
    topics,
  };
}

export function buildDocsTree(): { chapters: DocChapter[] } {
  const chapters = chapterSlugs.map((slug, i) => buildChapter(referenceFiles[i], slug));
  return { chapters };
}

export function sliceTopic(chapter: DocChapter, topic: DocTopic): string {
  const md = readMarkdown(chapter.sourcePath);
  const lines = md.split("\n");
  return lines.slice(topic.startLine + 1, topic.endLine).join("\n");
}

export function topicHeadingIds(chapter: DocChapter, topic: DocTopic): Record<string, string> {
  const slice = sliceTopic(chapter, topic);
  const map: Record<string, string> = {};
  for (const h of parseHeadings(slice)) {
    map[h.text] = h.id;
  }
  return map;
}

export function readCliSlice(): string {
  return assertSlice(
    sliceSection(readMarkdown(docSliceAnchors.cli.source), docSliceAnchors.cli.start, docSliceAnchors.cli.end),
    `Docs build failed: CLI slice anchor "${docSliceAnchors.cli.start}" not found in ${docSliceAnchors.cli.source}`
  );
}

export function readQuickstartSlice(): string {
  return assertSlice(
    sliceSection(readMarkdown(readmeLocalPath), docSliceAnchors.quickstart.start, docSliceAnchors.quickstart.end),
    `Docs build failed: Quick Start anchor "${docSliceAnchors.quickstart.start}" not found in ${readmeLocalPath}`
  );
}

export function flattenPages(tree: { chapters: DocChapter[] }): DocPage[] {
  const pages: DocPage[] = [];
  for (const c of tree.chapters) {
    pages.push({ href: `/docs/${c.slug}`, label: c.label, kind: "chapter" });
    for (const t of c.topics) {
      pages.push({ href: `/docs/${c.slug}/${t.slug}`, label: t.title, kind: "topic" });
    }
  }
  for (const t of toolingPages) {
    pages.push({ href: `/docs/${t.slug}`, label: t.title, kind: "tooling" });
  }
  return pages;
}

export function toolingItem(slug: string): ToolingItem | undefined {
  return toolingPages.find((t) => t.slug === slug);
}
