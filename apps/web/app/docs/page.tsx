"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import { DocsContent } from "@/components/docs/docs-content";
import { BackgroundEffects } from "@/components/home/background-effects";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-700 selection:bg-blue-500/30 selection:text-white ${
        isDark ? "bg-black text-zinc-300" : "bg-stone-50 text-stone-700"
      }`}
    >
      <BackgroundEffects isDark={isDark} />
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        onScrollToSection={scrollToSection}
        docsHref="#docs-content"
        docsLabel="Docs"
      />

      <section
        id="hero"
        className="relative z-10 mx-auto w-full max-w-350 px-4 pt-20 pb-16 sm:px-6 lg:px-10"
      >
        <div className="mb-8 flex justify-start">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:scale-105 ${
              isDark
                ? "border-blue-800/70 bg-linear-to-r from-blue-950 to-blue-800 text-white shadow-blue-900/30 hover:from-blue-900 hover:to-blue-700 hover:shadow-blue-800/40"
                : "border-blue-600/70 bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/30 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-600/40"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="text-center">
          <h1
            className={`mt-4 text-4xl font-black tracking-tighter sm:text-5xl lg:text-7xl ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Template
            <span
              className={`block ${isDark ? "text-blue-400" : "text-blue-600"}`}
            >
              Documentation
            </span>
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-zinc-400" : "text-stone-600"
            }`}
          >
            Explore the real template files from the{" "}
            <code
              className={`rounded px-1.5 py-0.5 font-mono text-sm ${
                isDark
                  ? "bg-zinc-800 text-blue-400"
                  : "bg-stone-100 text-blue-600"
              }`}
            >
              appinit-templates
            </code>{" "}
            package. See exactly what gets scaffolded when you create a new
            project.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm sm:mt-10 sm:gap-3">
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                isDark
                  ? "border-white/10 bg-zinc-900/40"
                  : "border-stone-200 bg-white/60"
              }`}
            >
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={isDark ? "text-zinc-300" : "text-stone-700"}>
                TypeScript & JavaScript
              </span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                isDark
                  ? "border-white/10 bg-zinc-900/40"
                  : "border-stone-200 bg-white/60"
              }`}
            >
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={isDark ? "text-zinc-300" : "text-stone-700"}>
                REST API & WebSockets
              </span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                isDark
                  ? "border-white/10 bg-zinc-900/40"
                  : "border-stone-200 bg-white/60"
              }`}
            >
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={isDark ? "text-zinc-300" : "text-stone-700"}>
                Docker & Database
              </span>
            </div>
          </div>
        </div>
      </section>

      <DocsContent isDark={isDark} />
      <Footer isDark={isDark} docsHref="#docs-content" />
    </main>
  );
}
