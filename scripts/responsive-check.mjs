import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "docs", "goals", "spectralang-site", "evidence", "responsive");
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "phone-320", width: 320, height: 568 },
  { name: "phone-375", width: 375, height: 667 },
  { name: "iphone-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const routes = ["/", "/docs", "/docs/fundamentos/comentarios", "/docs/install"];

const server = spawn("npx", ["next", "start", "-p", "3133"], {
  cwd: root,
  stdio: "ignore",
  shell: true,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(7000);

const results = [];
let ok = true;

try {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const route of routes) {
      await page.goto(`http://localhost:3133${route}`, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const fname = `${vp.name}${route.replaceAll("/", "_") || "_root"}.png`;
      await page.screenshot({ path: join(outDir, fname), fullPage: true });
      const pass = overflow <= 0;
      if (!pass) ok = false;
      results.push({ viewport: vp.name, route, overflow, pass });
      console.log(`${pass ? "PASS" : "FAIL"} ${vp.name} ${route} overflow=${overflow}`);
    }
    await page.close();
  }
  await browser.close();
} catch (err) {
  ok = false;
  console.error("ERROR", err);
} finally {
  server.kill();
}

console.log(`\nOVERFLOW CHECK: ${ok ? "ALL CLEAN" : "FAILURES FOUND"}`);
console.log(`Screenshots -> ${outDir}`);
process.exit(ok ? 0 : 1);
