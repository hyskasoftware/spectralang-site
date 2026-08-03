export const referenceFiles = [
  {
    id: "01-introducao",
    localPath: "content/docs/reference/01-introducao.md",
    label: "01 Introdução",
    title: "Introduction & CLI",
    description:
      "What SpectraLang is, its philosophy, the compilation pipeline, installation, CLI, source structure and conventions.",
  },
  {
    id: "02-fundamentos",
    localPath: "content/docs/reference/02-fundamentos.md",
    label: "02 Fundamentos",
    title: "Fundamentals",
    description:
      "Comments, variables and mutability, primitive types, literals, operators, control flow and functions.",
  },
  {
    id: "03-tipos-compostos",
    localPath: "content/docs/reference/03-tipos-compostos.md",
    label: "03 Tipos Compostos",
    title: "Composite Types",
    description:
      "Arrays, tuples, ranges, records, enums, impl blocks, traits, generics and closures.",
  },
  {
    id: "04-avancado",
    localPath: "content/docs/reference/04-avancado.md",
    label: "04 Avançado",
    title: "Advanced",
    description:
      "Pattern matching, if let / while let, Option and Result, error propagation, modules, visibility and more.",
  },
  {
    id: "05-stdlib",
    localPath: "content/docs/reference/05-stdlib.md",
    label: "05 Stdlib",
    title: "Standard Library",
    description:
      "std.io, std.string, std.math, std.convert, std.collections, std.tensor, std.ml, std.time and the rest of the standard library.",
  },
  {
    id: "06-referencia-rapida",
    localPath: "content/docs/reference/06-referencia-rapida.md",
    label: "06 Referência Rápida",
    title: "Quick Reference",
    description:
      "Keywords, operators, types, escape sequences, import forms, grammar, CLI flags and common errors.",
  },
] as const;

export const readmeLocalPath = "content/docs/README.md";

export const docSliceAnchors = {
  cli: {
    source: "content/docs/reference/01-introducao.md",
    start: "## 5. Interface de Linha de Comando",
    end: "## 6. Estrutura de um Arquivo Fonte",
  },
  quickstart: {
    source: "content/docs/README.md",
    start: "## Quick Start",
    end: "## CLI Essentials",
  },
} as const;

export const chapterSlugs = [
  "introducao",
  "fundamentos",
  "tipos-compostos",
  "avancado",
  "stdlib",
  "referencia-rapida",
] as const;

export const toolingPages = [
  {
    id: "cli",
    slug: "cli",
    label: "CLI REFERENCE",
    title: "Command-Line Interface",
    description: "Every spectralang command, flag, usage example and exit code.",
  },
  {
    id: "install",
    slug: "install",
    label: "INSTALLATION",
    title: "Install",
    description: "Download the latest release or build the whole toolchain from source.",
  },
  {
    id: "usage",
    slug: "usage",
    label: "USAGE",
    title: "Quick Start",
    description: "The quick start tour: your first module, compile, run and check.",
  },
] as const;

export type ToolingItem = (typeof toolingPages)[number];
