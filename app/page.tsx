import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CodeTerminal } from "@/components/CodeTerminal";
import { Install } from "@/components/Install";
import { DocsLinks } from "@/components/DocsLinks";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CodeTerminal />
      <Install />
      <DocsLinks />
    </>
  );
}
