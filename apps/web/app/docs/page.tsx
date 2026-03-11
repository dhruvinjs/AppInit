"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { DOCS_SECTIONS, DocsSection } from "@/components/docs/docs-sections";
import Link from "next/link";

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className={`min-h-screen ${isDark ? "bg-zinc-950" : "bg-white"}`}>
      
      {/* Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-sm ${isDark ? "border-white/5 bg-zinc-950/80" : "border-stone-200 bg-white/80"}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className={`font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>AppInit</span>
              </Link>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-lg transition-colors ${isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-stone-100 hover:bg-stone-200"}`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr_300px]">
          
          {/* Left Sidebar Navigation */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              {DOCS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? isDark
                        ? "bg-blue-950/40 text-blue-300"
                        : "bg-blue-50 text-blue-700"
                      : isDark
                      ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/50"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className={`rounded-lg border ${isDark ? "border-white/5 bg-zinc-900/30" : "border-stone-200 bg-stone-50/30"}`}>
            <div className="max-w-3xl mx-auto px-8 py-12">
              <DocsSection id={activeSection} isDark={isDark} />
            </div>
          </main>

          {/* Right Sidebar - Table of Contents */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              <div>
                <h3 className={`text-xs font-bold tracking-widest uppercase mb-3 ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                  On this page
                </h3>
                <nav className="space-y-2 text-sm">
                  {getTOC(activeSection).map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block transition-colors ${
                        isDark
                          ? "text-zinc-400 hover:text-zinc-300"
                          : "text-stone-600 hover:text-stone-900"
                      } ${item.level === 2 ? "" : "pl-4"}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className={`border-t pt-4 ${isDark ? "border-white/5" : "border-stone-200"}`}>
                <p className={`text-xs ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                  Need help? Check out the{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-400 font-medium">
                    GitHub discussions
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function getTOC(section: string): Array<{ id: string; label: string; level: number }> {
  const tocMap: Record<string, Array<{ id: string; label: string; level: number }>> = {
    introduction: [
      { id: "what-is-appinit", label: "What is AppInit?", level: 2 },
      { id: "why-choose", label: "Why Choose AppInit?", level: 2 },
    ],
    "getting-started": [
      { id: "installation", label: "Installation", level: 2 },
      { id: "running", label: "Running Your Project", level: 2 },
      { id: "whats-included", label: "What's Included?", level: 2 },
    ],
    features: [
      { id: "multiple-templates", label: "Multiple Templates", level: 2 },
      { id: "database", label: "Optional Database Support", level: 2 },
      { id: "websocket", label: "WebSocket Integration", level: 2 },
      { id: "docker", label: "Docker Support", level: 2 },
      { id: "security", label: "Security Best Practices", level: 2 },
    ],
    templates: [
      { id: "typescript-starter", label: "TypeScript Starter", level: 2 },
      { id: "javascript-starter", label: "JavaScript Starter", level: 2 },
      { id: "full-stack", label: "Full Stack Template", level: 2 },
      { id: "api-server", label: "API Server Template", level: 2 },
    ],
    comparison: [
      { id: "feature-comparison", label: "Feature Comparison", level: 2 },
      { id: "key-advantages", label: "Key Advantages", level: 2 },
    ],
  };

  return tocMap[section] || [];
}
