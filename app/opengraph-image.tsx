import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SpectraLang — a JIT-compiled programming language for AI/ML workloads and first-class API services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.svg"), "base64");
  const logoSrc = `data:image/svg+xml;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0910",
          padding: "80px 90px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(125,79,205,0.45) 0%, rgba(125,79,205,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "28px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={110} height={110} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 72, fontWeight: 900, color: "#f2eefb", letterSpacing: "0.02em", display: "flex" }}>
              SPECTRA<span style={{ color: "#a678ff" }}>LANG</span>
            </div>
            <div style={{ fontSize: 26, color: "#9d94c0", marginTop: "10px", letterSpacing: "0.3em" }}>
              THE AI/ML & API LANGUAGE
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "52px",
            gap: "14px",
          }}
        >
          <div style={{ fontSize: 34, color: "#f2eefb", lineHeight: 1.4, maxWidth: "940px" }}>
            A language designed for AI/ML workloads and first-class API services.
          </div>
          <div style={{ fontSize: 24, color: "#a678ff", letterSpacing: "0.14em" }}>
            TENSORS · AUTODIFF · JIT · ONNX · HTTP SERVERS
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "56px",
            left: "90px",
            display: "flex",
            flexDirection: "row",
            gap: "26px",
            fontSize: 20,
            color: "#57468f",
            letterSpacing: "0.2em",
          }}
        >
          <span>OPEN SOURCE</span>
          <span>MIT LICENSE</span>
          <span>spectralang.org</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
