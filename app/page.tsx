import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CodeTerminal } from "@/components/CodeTerminal";
import { Install } from "@/components/Install";
import { DocsLinks } from "@/components/DocsLinks";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/site";
import { faqJsonLd, softwareApplicationJsonLd, webSiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ q: f.q, a: f.a })))} />
      <Hero />
      <Features />
      <CodeTerminal />
      <Install />
      <DocsLinks />
      <Faq />
    </>
  );
}
