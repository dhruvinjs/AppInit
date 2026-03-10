"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { ChevronRight } from "lucide-react";

import { DocsContent } from "@/components/docs/docs-content";
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
    <div className={`relative min-h-screen ${isDark ? "bg-zinc-950" : "bg-white"}`}>
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        onScrollToSection={scrollToSection}
        docsHref="/docs"
        docsLabel="Docs"
      />

      <div className={`border-b ${isDark ? "border-white/5" : "border-stone-200"}`}>
        <div className="mx-auto w-full max-w-350 px-6 py-8 lg:px-10">
          <div className="mb-4 flex items-center space-x-1 text-sm">
            <Link
              href="/"
              className={`transition-colors ${isDark ? "text-zinc-400 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className={isDark ? "text-white" : "text-stone-900"}>Documentation</span>
          </div>
          <h1 className={`scroll-m-20 text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
            Documentation
          </h1>
          <p className={`mt-2 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
            Express backend starter with optional WebSocket, DB, and Docker support.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-350 gap-8 px-6 py-8 lg:gap-10 lg:px-10">
        {/* Sidebar Navigation */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-20 space-y-6">
            <nav className="space-y-4">
              <div>
                <h4 className={`mb-3 px-2 text-xs font-semibold tracking-wide uppercase ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
                  Getting Started
                </h4>
                <div className="space-y-1">
                  <NavLink href="/docs#installation" isDark={isDark}>
                    Installation
                  </NavLink>
                  <NavLink href="/docs#quick-start" isDark={isDark}>
                    Quick Start
                  </NavLink>
                </div>
              </div>

              <div>
                <h4 className={`mb-3 px-2 text-xs font-semibold tracking-wide uppercase ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
                  Templates
                </h4>
                <div className="space-y-1">
                  <NavLink href="/docs#typescript" isDark={isDark}>
                    TypeScript
                  </NavLink>
                  <NavLink href="/docs#javascript" isDark={isDark}>
                    JavaScript
                  </NavLink>
                  <NavLink href="/docs#websockets" isDark={isDark}>
                    WebSockets
                  </NavLink>
                </div>
              </div>

              <div>
                <h4 className={`mb-3 px-2 text-xs font-semibold tracking-wide uppercase ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
                  Features
                </h4>
                <div className="space-y-1">
                  <NavLink href="/docs#database" isDark={isDark}>
                    Database Support
                  </NavLink>
                  <NavLink href="/docs#docker" isDark={isDark}>
                    Docker
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="pb-12">
            <DocsContent isDark={isDark} />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, isDark, children }: { href: string; isDark: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
        isDark
          ? "text-zinc-400 hover:bg-zinc-900 hover:text-white"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
      }`}
    >
      {children}
    </Link>
  );
}
