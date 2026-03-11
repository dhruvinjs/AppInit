"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
  category: "general" | "technical" | "comparison";
};

const faqItems: FAQItem[] = [
  {
    category: "general",
    question: "What is AppInit and why should I use it?",
    answer:
      "AppInit is a modern Node.js boilerplate generator that sets up a production-ready Express application in seconds. Unlike manual setup or bare generators, AppInit includes best practices for error handling, logging, environment validation, and project structure—everything you need to start building immediately.",
  },
  {
    category: "general",
    question: "How does AppInit compare to Create T3 App?",
    answer:
      "While Create T3 App focuses on full-stack TypeScript/React applications, AppInit specializes in backend Node.js/Express. AppInit provides zero-config database setup, WebSocket support, Docker integration, and production logging out of the box. Choose AppInit if you need a robust backend; choose T3 if you're building a full-stack web app.",
  },
  {
    category: "technical",
    question: "Can I use AppInit for monorepos?",
    answer:
      "Absolutely! AppInit generates a self-contained project that works perfectly in monorepo structures. You can use it with tools like Turborepo or Nx. The generated project is independent and doesn't have tight coupling to any monorepo tool.",
  },
  {
    category: "technical",
    question: "Can I eject from the boilerplate?",
    answer:
      "Yes! AppInit generates standard Express.js code with no proprietary APIs or lock-ins. Once generated, the project is entirely yours to modify. There's no 'eject' command because you already have full control—it's not like Create React App.",
  },
  {
    category: "technical",
    question: "What makes the PERN stack configuration unique?",
    answer:
      "AppInit's PERN setup (PostgreSQL, Express, React, Node) comes with pre-configured Prisma ORM, automatic type generation, migrations setup, and React scaffolding. It eliminates the integration complexity between backend and frontend, handling middleware CORS setup and API route organization automatically.",
  },
  {
    category: "technical",
    question: "Does AppInit support TypeScript and JavaScript?",
    answer:
      "Yes! You can choose TypeScript or JavaScript templates. The TypeScript version includes strict type checking and source maps, while JavaScript provides a lightweight alternative. Both include proper configuration files and linting setup.",
  },
  {
    category: "technical",
    question: "How does environment variable validation work?",
    answer:
      "AppInit uses Zod schemas to validate all environment variables at startup. If required variables are missing or invalid, the application fails fast with a clear error message. This catches configuration issues before they cause runtime problems in production.",
  },
  {
    category: "comparison",
    question: "How does AppInit differ from Express Generator?",
    answer:
      "Express Generator creates a minimal structure, while AppInit provides a fully featured setup including logging (Pino), error handling, environment validation (Zod), health checks, and best-practice folder organization. AppInit is production-ready out of the box.",
  },
  {
    category: "comparison",
    question: "Should I use AppInit or build from scratch?",
    answer:
      "Building from scratch gives maximum flexibility but takes significant time. AppInit provides the 80/20 solution—solid foundations that handle 80% of typical backend needs. You save setup time while maintaining full control over your codebase.",
  },
  {
    category: "comparison",
    question: "Is AppInit suitable for microservices?",
    answer:
      "Yes! AppInit templates are perfect for microservices. Each generated project is lean and independent, making it ideal for creating service-per-domain architectures. The modular structure and clear separation of concerns support microservice patterns well.",
  },
];

export function FAQSection({ isDark }: { isDark: boolean }) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const [selectedCategory, setSelectedCategory] = useState<"all" | FAQItem["category"]>("all");

  const toggleItem = (index: number) => {
    const newOpenIndices = new Set(openIndices);
    if (newOpenIndices.has(index)) {
      newOpenIndices.delete(index);
    } else {
      newOpenIndices.add(index);
    }
    setOpenIndices(newOpenIndices);
  };

  const filteredItems =
    selectedCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  const categories = ["all", "general", "technical", "comparison"] as const;
  const categoryLabels = {
    all: "All Questions",
    general: "General",
    technical: "Technical",
    comparison: "Comparison",
  };

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mb-12 text-center">
        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}
        >
          Everything you need to know about AppInit
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? isDark
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
                : isDark
                ? "border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                : "border border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400"
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* FAQ Items - Golden Ratio Grid */}
      <div className="mx-auto max-w-4xl">
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const actualIndex = faqItems.indexOf(item);
            const isOpen = openIndices.has(actualIndex);

            return (
              <div
                key={actualIndex}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? isDark
                      ? "border-white/10 bg-zinc-900/60"
                      : "border-stone-200 bg-white/90"
                    : isDark
                    ? "border-white/5 bg-zinc-950/30"
                    : "border-stone-200/50 bg-stone-50/30"
                }`}
              >
                <button
                  onClick={() => toggleItem(actualIndex)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left hover:opacity-80 transition-opacity"
                >
                  <h3
                    className={`text-base font-semibold ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`mt-0.5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    } ${isDark ? "text-zinc-500" : "text-stone-400"}`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={`border-t px-6 pb-6 pt-4 ${
                      isDark ? "border-white/5" : "border-stone-200/50"
                    }`}
                  >
                    <p
                      className={`text-base leading-relaxed ${
                        isDark ? "text-zinc-300" : "text-stone-700"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p
              className={`text-base ${
                isDark ? "text-zinc-400" : "text-stone-500"
              }`}
            >
              No questions found in this category.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p
          className={`mb-4 text-base ${isDark ? "text-zinc-400" : "text-stone-600"}`}
        >
          Still have questions?
        </p>
        <a
          href="#"
          className={`inline-block rounded-lg px-6 py-3 font-semibold transition-colors ${
            isDark
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Join our GitHub Discussions
        </a>
      </div>
    </section>
  );
}
