import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { buildDocsTree } from "@/lib/docs-tree";

const tree = buildDocsTree();

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-b-2 border-border-strong">
      <DocsSidebar chapters={tree.chapters} />
      <div className="md:pl-72">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-12 md:px-10 md:py-14">
          {children}
        </div>
      </div>
    </section>
  );
}
