import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image"],
        allow: "/",
      },
      {
        userAgent: ["Bingbot", "Applebot"],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "perplexity-ask",
          "Google-Extended",
          "cohere-ai",
          "Bytespider",
          "Amazonbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.spectralang.org/sitemap.xml",
    host: "https://www.spectralang.org",
  };
}
