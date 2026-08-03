import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoDocs = path.resolve(__dirname, "..", "..", "..", "..", "D:\\Lang\\SpectraLang\\docs");
const targetDocs = path.resolve(__dirname, "..", "content", "docs");

const referenceSrc = path.join(repoDocs, "reference");
const referenceDest = path.join(targetDocs, "reference");

fs.mkdirSync(referenceDest, { recursive: true });

let copied = 0;
for (const file of fs.readdirSync(referenceSrc).filter((f) => f.endsWith(".md"))) {
  fs.copyFileSync(path.join(referenceSrc, file), path.join(referenceDest, file));
  copied++;
  console.log(`copied reference/${file}`);
}

const readmeSrc = path.resolve(__dirname, "..", "..", "..", "..", "D:\\Lang\\SpectraLang\\README.md");
fs.copyFileSync(readmeSrc, path.join(targetDocs, "README.md"));
copied++;
console.log("copied README.md");

console.log(`\nsync complete: ${copied} files -> ${targetDocs}`);
