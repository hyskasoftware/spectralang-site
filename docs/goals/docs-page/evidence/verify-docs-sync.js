import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..", "..", "..", "..");
const contentDir = path.join(siteRoot, "content", "docs");
const repoDir = "D:\\Lang\\SpectraLang";

const files = [
  "reference/01-introducao.md",
  "reference/02-fundamentos.md",
  "reference/03-tipos-compostos.md",
  "reference/04-avancado.md",
  "reference/05-stdlib.md",
  "reference/06-referencia-rapida.md",
  "README.md",
];

execSync("git fetch origin", { cwd: repoDir, stdio: "inherit" });

let fail = false;
for (const rel of files) {
  const local = fs.readFileSync(path.join(contentDir, rel), "utf8");
  const gitPath = rel === "README.md" ? "README.md" : `docs/${rel}`;
  const upstream = execSync(`git show origin/main:${gitPath}`, {
    cwd: repoDir,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (local === upstream) {
    console.log(`OK   content/docs/${rel} — byte-identical to origin/main`);
  } else {
    fail = true;
    console.log(`DIFF content/docs/${rel} — differs from origin/main`);
  }
}

process.exit(fail ? 1 : 0);
