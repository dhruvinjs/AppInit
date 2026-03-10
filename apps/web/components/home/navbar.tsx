import Link from "next/link";
import { Github, Moon, Sun, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onScrollToSection: (id: string) => void;
  docsHref?: string;
  docsLabel?: string;
};

export function Navbar({
  isDark,
  onToggleTheme,
  onScrollToSection,
  docsHref = "#flags",
  docsLabel = "Flags",
}: NavbarProps) {
  return (
    <nav
      className={`sticky top-4 z-30 mx-auto flex w-[calc(100%-1.5rem)] max-w-350 items-center justify-between rounded-2xl border px-6 py-4 shadow-lg backdrop-blur-xl transition-colors duration-500 lg:px-10 ${
        isDark
          ? "border-white/10 bg-black/75 shadow-blue-900/20"
          : "border-stone-200 bg-white/90 shadow-stone-300/50"
      }`}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-3"
        onClick={() => onScrollToSection("hero")}
        aria-label="Go to hero section"
      >
        <div className="rounded-xl bg-blue-600 p-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform duration-500 hover:scale-110">
          <Wand2 className="text-white" size={20} />
        </div>
        <span
          className={`text-xl font-black tracking-widest uppercase italic transition-colors ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          APPINIT
        </span>
      </button>

      <div className="flex items-center gap-2 md:gap-6">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
        <Link
          href="/docs"
          className={`hidden text-xs font-bold tracking-widest uppercase transition-colors md:inline ${
            isDark
              ? "text-zinc-500 hover:text-white"
              : "text-stone-500 hover:text-stone-900"
          }`}
        >
          Docs
        </Link>
        <Button
          asChild
          className="rounded-full bg-white px-6 py-2.5 text-black hover:bg-blue-500 hover:text-white"
        >
          <Link href="https://github.com/dhruvinjs/AppInit" target="_blank">
            <Github size={16} />
            GitHub
          </Link>
        </Button>
      </div>
    </nav>
  );
}
