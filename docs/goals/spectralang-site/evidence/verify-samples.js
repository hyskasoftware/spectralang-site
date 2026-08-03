const fs = require("fs");
const path = require("path");

const siteTs = fs.readFileSync(path.join(__dirname, "..", "..", "..", "..", "lib", "site.ts"), "utf8");
const samples = [...siteTs.matchAll(/code: `([\s\S]*?)`/g)].map((m) => m[1]);

const targets = [
  ["syntax_quickstart.spectra", "syntax_quickstart.spectra"],
  ["ai/tensor_graph_elementwise_fusion.spectra", "tensor_graph_elementwise_fusion.spectra"],
  ["api/00_hello_http.spectra", "00_hello_http.spectra"],
];

let fail = false;
for (let i = 0; i < targets.length; i++) {
  const src = fs.readFileSync(path.join("D:\\Lang\\SpectraLang\\examples", targets[i][0]), "utf8");
  const embedded = samples[i] + "\n";
  const ok = src === embedded;
  if (!ok) {
    fail = true;
    const a = src.split("\n");
    const b = embedded.split("\n");
    for (let l = 0; l < Math.max(a.length, b.length); l++) {
      if (a[l] !== b[l]) {
        console.log(`MISMATCH ${targets[i][1]} line ${l + 1}:`);
        console.log(`  src:      ${JSON.stringify(a[l])}`);
        console.log(`  embedded: ${JSON.stringify(b[l])}`);
        break;
      }
    }
  } else {
    console.log(`OK ${targets[i][1]} (${src.length} bytes)`);
  }
}
process.exit(fail ? 1 : 0);
