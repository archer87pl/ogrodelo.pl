"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQAccordion({ items, title = "Często zadawane pytania" }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-bold text-primary-dark mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-accent/50 transition-colors"
              aria-expanded={open === i}
            >
              {item.question}
              <span className="text-primary ml-2 shrink-0">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-sm text-muted leading-relaxed border-t border-border/50 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
