"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Layers,
  Sun,
  Moon,
  Github,
  ArrowLeft,
  Container,
} from "lucide-react";

import { BackgroundEffects } from "@/components/home/background-effects";
import { DocsContent } from "@/components/docs/docs-content";

const IconImage = ({
  src,
  size = 16,
}: {
  src: string;
  size?: number;
}) => (
  <img
    src={src}
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    className="inline-block"
  />
);

const IconWebSockets = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="6.5" cy="7.5" r="3" className="stroke-cyan-300" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="3" className="stroke-cyan-300" strokeWidth="1.5" />
    <circle cx="17.5" cy="17.5" r="3" className="stroke-cyan-300" strokeWidth="1.5" />
    <path
      d="M9.2 9.1l5.1-1.9M8.2 8.6l6 6.2M9.3 12.5l4.1 4.1"
      className="stroke-cyan-300"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const NAV_ITEMS = [
  {
    id: "typescript",
    icon: () => <IconImage src="/typescript.svg" />,
    label: "TypeScript",
    category: "TEMPLATES",
  },
  {
    id: "javascript",
    icon: () => <IconImage src="/icons8-javascript.svg" />,
    label: "JavaScript",
    category: "TEMPLATES",
  },
  {
    id: "websockets",
    icon: IconWebSockets,
    label: "WebSockets",
    category: "FEATURES",
  },
  {
    id: "docker",
    icon: Container,
    label: "Docker",
    category: "FEATURES",
  },
];

export default function TemplateExplorerPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activeSection, setActiveSection] = useState("typescript");

  return (
    <div
      className={`flex h-screen font-sans antialiased overflow-hidden transition-colors duration-700 selection:bg-blue-500/30 selection:text-white ${
        isDark ? "bg-black text-zinc-300" : "bg-stone-50 text-stone-700"
      }`}
    >
      <BackgroundEffects isDark={isDark} />
      {/* Global Sidebar (Left) */}
      <aside className={`w-64 border-r flex flex-col shadow-sm ${
        isDark
          ? "border-white/10 bg-zinc-950/50 shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]"
          : "border-stone-200 bg-white"
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Layers size={18} className="text-white" />
            </div>
            <h1 className={`font-bold tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}>AppInit</h1>
          </div>

          <nav className="space-y-6">
            <div>
              <p className={`text-[10px] font-bold tracking-widest mb-4 ${
                isDark ? "text-zinc-500" : "text-stone-500"
              }`}>
                TEMPLATES
              </p>
              <div className="space-y-1">
                {NAV_ITEMS.filter((n) => n.category === "TEMPLATES").map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? isDark
                          ? "bg-zinc-800/80 text-white shadow-sm ring-1 ring-blue-500/20"
                          : "bg-blue-50 text-stone-900 shadow-sm ring-1 ring-blue-200"
                        : isDark
                        ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {NAV_ITEMS.some((n) => n.category === "FEATURES") && (
                <>
                  <p className={`text-[10px] font-bold tracking-widest mb-4 ${
                    isDark ? "text-zinc-500" : "text-stone-500"
                  }`}>
                    FEATURES
                  </p>
                  <div className="space-y-1">
                    {NAV_ITEMS.filter((n) => n.category === "FEATURES").map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                          activeSection === item.id
                            ? isDark
                              ? "bg-zinc-800/80 text-white shadow-sm ring-1 ring-blue-500/20"
                              : "bg-blue-50 text-stone-900 shadow-sm ring-1 ring-blue-200"
                            : isDark
                            ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                            : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                        }`}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className={`h-14 border-b flex items-center justify-between px-8 backdrop-blur-sm shadow-sm ${
          isDark
            ? "border-white/10 bg-zinc-950/60 shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)]"
            : "border-stone-200 bg-white/60"
        }`}>
          <div className={`flex items-center gap-4 text-sm ${
            isDark ? "text-zinc-500" : "text-stone-500"
          }`}>
            <Link
              href="/docs"
              className={`flex items-center gap-2 transition-colors ${
                isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <ArrowLeft size={16} />
              Back to Docs
            </Link>
            <span className={isDark ? "text-zinc-700" : "text-stone-300"}>›</span>
            <span className={isDark ? "text-zinc-300" : "text-stone-700"}>Template Explorer</span>
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
          </div>
        </header>

        {/* Documentation Content */}
        <div className="flex-1 overflow-auto p-6">
          <DocsContent isDark={isDark} activeSection={activeSection} />
        </div>
      </main>
    </div>
  );
}
