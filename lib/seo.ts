import { site } from "./site";

export const SITE_URL = "https://www.spectralang.org";
export const SITE_NAME = "SpectraLang";

export const KEYWORDS = [
  "SpectraLang",
  "Spectra language",
  "AI programming language",
  "ML programming language",
  "tensor programming language",
  "machine learning language",
  "deep learning language",
  "autodiff",
  "reverse-mode autodiff",
  "JIT compiler",
  "JIT language",
  "API programming language",
  "language for AI",
  "AI/ML workloads",
  "tensor core language",
  "ONNX",
  "differentiable programming",
  "open source programming language",
  "systems programming",
] as const;

export function jsonLdSanitize(obj: Record<string, unknown>): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Spectra",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [site.repo],
    foundingDate: "2026",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: site.tagline,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: site.tagline,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, Linux, macOS",
    softwareVersion: site.version,
    license: `${SITE_URL}/license`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    codeRepository: site.repo,
    downloadUrl: `${site.repo}/releases`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
  };
}
