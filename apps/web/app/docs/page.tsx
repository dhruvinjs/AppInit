"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Layers,
  Home,
  Sun,
  Moon,
  Github,
  Menu,
  X,
} from "lucide-react";

import { BackgroundEffects } from "@/components/home/background-effects";
import { DOCS_SECTIONS } from "@/components/docs/docs-sections";

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = DOCS_SECTIONS.find(s => s.id === activeSection)?.component;

  // Generate table of contents based on active section
  const getTOC = () => {
    const tocMap: Record<string, Array<{ id: string; label: string }>> = {
      introduction: [
        { id: "what-is-appinit", label: "What is AppInit?" },
        { id: "why-choose", label: "Why Choose AppInit?" },
      ],
      "getting-started": [
        { id: "installation", label: "Installation" },
        { id: "running", label: "Running Your Project" },
        { id: "whats-included", label: "What's Included?" },
      ],
      reasoning: [
        { id: "typescript", label: "Why TypeScript?" },
        { id: "prisma", label: "Why Prisma?" },
        { id: "mongoose", label: "Why Mongoose?" },
        { id: "websocket", label: "Why WebSocket?" },
        { id: "docker", label: "Why Docker?" },
        { id: "security", label: "Why Security?" },
        { id: "pino", label: "Why Pino?" },
      ],
      templates: [
        { id: "ts-rest-api", label: "TypeScript REST" },
        { id: "ts-websocket", label: "TypeScript WebSocket" },
        { id: "js-rest-api", label: "JavaScript REST" },
        { id: "js-websocket", label: "JavaScript WebSocket" },
      ],
      "template-explorer": [
        { id: "overview", label: "Overview" },
        { id: "typescript", label: "TypeScript" },
        { id: "javascript", label: "JavaScript" },
      ],
      "cli-commands": [
        { id: "preset-flags", label: "Preset Flags" },
        { id: "interactive", label: "Interactive Mode" },
        { id: "examples", label: "Examples" },
      ],
    };

    return tocMap[activeSection] || [];
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-blue-500/30 selection:text-white ${
        isDark ? "bg-black text-zinc-300" : "bg-stone-50 text-stone-700"
      }`}
    >
      <BackgroundEffects isDark={isDark} />
      {/* Header */}
      <header
        className={`border-b sticky top-0 z-50 backdrop-blur-sm ${
          isDark
            ? "border-white/10 bg-black/80"
            : "border-stone-200 bg-white/90"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Layers size={18} className="text-white" />
                </div>
                <span
                  className={`font-bold text-lg ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  AppInit
                </span>
              </Link>
              <span className="text-zinc-500 text-sm hidden md:block">›</span>
              <span
                className={`text-sm hidden md:block ${
                  isDark ? "text-zinc-400" : "text-stone-600"
                }`}
              >
                Documentation
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-zinc-800 hover:bg-zinc-700"
                    : "bg-stone-100 hover:bg-stone-200"
                }`}
              >
                <Github size={18} />
              </a>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-zinc-800 hover:bg-zinc-700"
                    : "bg-stone-100 hover:bg-stone-200"
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-zinc-800 hover:bg-zinc-700"
                    : "bg-stone-100 hover:bg-stone-200"
                }`}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr_240px]">
          {/* Left Sidebar Navigation with Progressive Blur */}
          <aside className="hidden lg:block relative">
            {/* Progressive blur effect */}
            <div 
              className={`absolute inset-y-0 -right-8 w-16 bg-gradient-to-l pointer-events-none ${
                isDark 
                  ? "from-black via-black/50 to-transparent" 
                  : "from-stone-50 via-stone-50/50 to-transparent"
              }`}
              style={{ maskImage: "linear-gradient(to left, black, transparent)" }}
            />
            <nav className="sticky top-24 space-y-1">
              <div className="mb-6">
                <h2
                  className={`text-xs font-bold tracking-widest uppercase mb-3 ${
                    isDark ? "text-zinc-500" : "text-stone-500"
                  }`}
                >
                  Documentation
                </h2>
              </div>
              {DOCS_SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? isDark
                          ? "bg-blue-950/40 text-blue-300 ring-1 ring-blue-500/20"
                          : "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : isDark
                        ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/50"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden fixed inset-0 z-40 ${
                isDark ? "bg-black" : "bg-stone-50"
              }`}
            >
              <div className="p-6 space-y-2">
                {DOCS_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? isDark
                            ? "bg-blue-950/40 text-blue-300"
                            : "bg-blue-50 text-blue-700"
                          : isDark
                          ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/50"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      <Icon size={16} />
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Content */}
          <main
            className={`rounded-lg border ${
              isDark
                ? "border-white/10 bg-zinc-900/40"
                : "border-stone-200 bg-white/80 shadow-sm"
            }`}
          >
            <div className="max-w-3xl mx-auto px-8 py-12">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </main>

          {/* Right Sidebar - Table of Contents with Progressive Blur */}
          <aside className="hidden xl:block relative">
            {/* Progressive blur effect */}
            <div 
              className={`absolute inset-y-0 -left-8 w-16 bg-gradient-to-r pointer-events-none ${
                isDark 
                  ? "from-black via-black/50 to-transparent" 
                  : "from-stone-50 via-stone-50/50 to-transparent"
              }`}
              style={{ maskImage: "linear-gradient(to right, black, transparent)" }}
            />
            <div className="sticky top-24 space-y-4">
              <div>
                <h3
                  className={`text-xs font-bold tracking-widest uppercase mb-3 ${
                    isDark ? "text-zinc-500" : "text-stone-500"
                  }`}
                >
                  On this page
                </h3>
                <nav className="space-y-2 text-sm">
                  {getTOC().map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block transition-colors ${
                        isDark
                          ? "text-zinc-400 hover:text-zinc-300"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>


              <div
                className={`border-t pt-4 ${
                  isDark ? "border-white/10" : "border-stone-200"
                }`}
              >
               
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
