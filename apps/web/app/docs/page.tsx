"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Layers,
  Home,
  Sun,
  Moon,
} from "lucide-react";

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
  { id: "websockets", icon: IconWebSockets, label: "WebSockets", category: "TEMPLATES" },
];

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activeSection, setActiveSection] = useState("typescript");

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-300 font-sans antialiased overflow-hidden bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(59,130,246,0.14),transparent),radial-gradient(800px_400px_at_90%_0%,rgba(14,165,233,0.10),transparent)]">
      {/* Global Sidebar (Left) */}
      <aside className="w-64 border-r border-zinc-800/50 flex flex-col bg-[#0d0d0d] shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Layers size={18} className="text-white" />
            </div>
            <h1 className="font-bold text-white tracking-tight">AppInit</h1>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 tracking-widest mb-4">
                TEMPLATES
              </p>
              <div className="space-y-1">
                {NAV_ITEMS.filter((n) => n.category === "TEMPLATES").map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? "bg-zinc-800/80 text-white shadow-sm ring-1 ring-blue-500/20"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
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
                  <p className="text-[10px] font-bold text-zinc-500 tracking-widest mb-4">
                    FEATURES
                  </p>
                  <div className="space-y-1">
                    {NAV_ITEMS.filter((n) => n.category === "FEATURES").map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                          activeSection === item.id
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
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

        {/* Bottom section removed */}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#0d0d0d]/60 backdrop-blur-sm shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Link
              href="/"
              className="relative text-zinc-400 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <span className="text-zinc-700">›</span>
            <span className="text-zinc-300">Documents</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-blue-600/90 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium transition-colors shadow shadow-blue-900/30"
            >
              View on GitHub
            </a>
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
