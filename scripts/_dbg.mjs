import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const server = spawn("npx", ["next", "start", "-p", "3136"], {
  cwd: root,
  stdio: "ignore",
  shell: true,
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(7000);
try {
  const browser = await chromium.launch();
  for (const route of ["/", "/docs/fundamentos/comentarios"]) {
    const page = await browser.newPage({ viewport: { width: 320, height: 568 } });
    await page.goto(`http://localhost:3136${route}`, { waitUntil: "networkidle" });
    const culprits = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const out = [];
      const clips = new Set();
      for (const el of document.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        if (/(auto|scroll|hidden|clip)/.test(cs.overflowX)) clips.add(el);
      }
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.right > cw + 1 && r.width > 0 && r.width <= cw * 1.2) {
          let a = el.parentElement;
          let clipped = false;
          while (a) {
            if (clips.has(a)) { clipped = true; break; }
            a = a.parentElement;
          }
          if (!clipped) {
            out.push({
              tag: el.tagName,
              cls: (el.className || "").toString().slice(0, 70),
              right: Math.round(r.right),
              w: Math.round(r.width),
              text: (el.textContent || "").slice(0, 30),
            });
          }
        }
      }
      return out.slice(0, 10);
    });
    console.log("== " + route);
    console.log(JSON.stringify(culprits, null, 1));
    await page.close();
  }
  await browser.close();
} finally {
  server.kill();
}
