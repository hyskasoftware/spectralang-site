import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

function flattenText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const el = node as { props?: { children?: ReactNode } };
    return flattenText(el.props?.children);
  }
  return "";
}

export function Markdown({
  source,
  headingIds,
}: {
  source: string;
  headingIds?: Record<string, string>;
}) {
  const components: Components = {
    a: ({ children, ...props }) => (
      <a
        {...props}
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-purple-bright underline decoration-purple-dim underline-offset-4 transition-colors hover:text-text"
      >
        {children}
      </a>
    ),
    h1: ({ children }) => <h1 id={headingIds?.[flattenText(children)]}>{children}</h1>,
    h2: ({ children }) => <h2 id={headingIds?.[flattenText(children)]}>{children}</h2>,
    h3: ({ children }) => <h3 id={headingIds?.[flattenText(children)]}>{children}</h3>,
    h4: ({ children }) => <h4 id={headingIds?.[flattenText(children)]}>{children}</h4>,
    table: ({ children }) => (
      <div className="overflow-x-auto border-2 border-border-strong bg-bg-soft">
        <table className="w-full border-collapse text-[12px] leading-relaxed">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b-2 border-border-strong bg-surface-2 px-3 py-2 text-left font-bold tracking-widest text-purple-bright">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-3 py-2 align-top text-text">{children}</td>
    ),
    tr: ({ children }) => (
      <tr className="transition-colors even:bg-surface/60 hover:bg-surface">{children}</tr>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple px-4 py-2 text-muted">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="border border-border bg-bg px-1 py-0.5 text-[0.9em] text-purple-bright">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="code-window border-2 border-border-strong bg-bg p-4 text-text">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-6 border-t-2 border-border-strong" />,
  };

  return (
    <div className="md-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
