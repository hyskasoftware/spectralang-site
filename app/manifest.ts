import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "SpectraLang",
    description:
      "SpectraLang — a JIT-compiled programming language for AI/ML workloads and first-class API services.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0910",
    theme_color: "#0a0910",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
