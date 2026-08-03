"use client";

import { useEffect, useState } from "react";
import type { SubSection } from "@/lib/docs-tree";

export function OnThisPage({ items }: { items: SubSection[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-24 border-2 border-border-strong bg-bg-soft p-4">
        <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-purple-dim">
          {"// ON THIS PAGE"}
        </p>
        <nav aria-label="On this page" className="flex flex-col gap-0.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`border-l-2 px-2 py-1.5 text-[11px] leading-snug tracking-wide transition-colors ${
                item.level === 4 ? "ml-3" : ""
              } ${
                active === item.id
                  ? "border-purple-bright text-purple-bright"
                  : "border-border text-muted hover:border-purple hover:text-purple-bright"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
