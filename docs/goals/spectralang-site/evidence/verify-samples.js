const fs = require("fs");
const path = require("path");

const siteTs = fs.readFileSync(path.join(__dirname, "..", "..", "..", "..", "lib", "site.ts"), "utf8");
const samples = [...siteTs.matchAll(/code: `([\s\S]*?)`/g)].map((m) => m[1]);

const targets = [
  ["syntax_quickstart.spectra", "syntax_quickstart.spectra"],
  ["basic.spectra", "basic.spectra"],
  ["fibonacci.spectra", "fibonacci.spectra"],
  ["traits_demo.spectra", "traits_demo.spectra"],
  ["ai/tensor_graph_elementwise_fusion.spectra", "tensor_graph_elementwise_fusion.spectra"],
  ["api/00_hello_http.spectra", "00_hello_http.spectra"],
];

// Normalize: drop line comments and string contents (incl. f-strings),
// so only comments/messages may differ between source and embedded sample.
function normalize(code) {
  return code
    .split("\n")
    .map((line) => {
      const noComment = line.split("//")[0];
      return noComment.replace(/f?"[^"]*"/g, '"X"').replace(/\s+$/, "");
    })
    .filter((line) => line.length > 0)
    .join("\n");
}

let fail = false;
for (let i = 0; i < targets.length; i++) {
  const src = fs.readFileSync(path.join("D:\\Lang\\SpectraLang\\examples", targets[i][0]), "utf8");
  const embedded = samples[i] + "\n";
  const codeOk = normalize(src) === normalize(embedded);
  const byteOk = src === embedded;
  if (!codeOk) {
    fail = true;
    const a = normalize(src).split("\n");
    const b = normalize(embedded).split("\n");
    for (let l = 0; l < Math.max(a.length, b.length); l++) {
      if (a[l] !== b[l]) {
        console.log(`CODE MISMATCH ${targets[i][1]} line ${l + 1}:`);
        console.log(`  src:      ${JSON.stringify(a[l])}`);
        console.log(`  embedded: ${JSON.stringify(b[l])}`);
        break;
      }
    }
  } else {
    console.log(
      `OK ${targets[i][1]} — code equivalent (${byteOk ? "byte-identical" : "comments/strings translated"})`
    );
  }
}
process.exit(fail ? 1 : 0);
