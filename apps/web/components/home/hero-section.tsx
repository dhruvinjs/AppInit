import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Copy, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  isDark: boolean;
  command: string;
  isCopied: boolean;
  onCopy: () => Promise<void>;
  docsHref?: string;
};

export function HeroSection({
  isDark,
  command,
  isCopied,
  onCopy,
  docsHref = "/docs",
}: HeroSectionProps) {
  return (
    <header
      id="hero"
      className="relative z-10 mx-auto grid w-full max-w-350 grid-cols-1 gap-6 px-4 pt-10 pb-20 sm:gap-8 sm:px-6 lg:px-10 xl:grid-cols-[1fr_minmax(0,760px)_1fr] xl:pb-40"
    >
      <aside className="hidden xl:flex xl:flex-col xl:justify-center">
        <div
          className={`rounded-3xl border p-6 backdrop-blur-xl ${isDark ? "border-white/5 bg-zinc-900/40" : "border-stone-200 bg-white/80"}`}
        >
          <p
            className={`text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
          >
            What You Get
          </p>
          <ul
            className={`mt-4 space-y-3 text-sm ${isDark ? "text-zinc-300" : "text-stone-700"}`}
          >
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> REST or
              WebSocket starter
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-700" /> TS or JS
              output
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-700" /> DB +
              Docker options
            </li>
          </ul>
        </div>
      </aside>

      <div className="text-center">
        <div
          className={`mb-10 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md ${isDark ? "border-zinc-800 bg-zinc-900/50 text-zinc-400" : "border-stone-200 bg-white/85 text-stone-500"}`}
        >
          <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
          Architect your backend in seconds
        </div>

        <h1
          className={`text-4xl leading-[0.9] font-black tracking-tighter text-balance sm:text-5xl md:text-7xl lg:text-[100px] ${isDark ? "text-white" : "text-stone-900"}`}
        >
          READY FOR <br />
          <span className="bg-linear-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            PRODUCTION.
          </span>
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed font-medium sm:mt-8 sm:text-lg md:text-xl ${isDark ? "text-zinc-500" : "text-stone-600"}`}
        >
          Build production-ready Node.js backends in seconds with health checks,
          error handling, and Docker support.
        </p>

        <div className="group relative mx-auto mt-8 max-w-xl sm:mt-12">
          <div className="absolute -inset-2 rounded-2xl bg-blue-600 opacity-10 blur-2xl transition duration-1000 group-hover:opacity-30" />
          <div
            className={`relative flex items-center justify-between overflow-hidden rounded-2xl border p-3 font-mono text-xs shadow-2xl backdrop-blur-2xl transition-colors sm:rounded-3xl sm:p-5 sm:text-sm ${isDark ? "border-white/5 bg-zinc-900/40 group-hover:border-white/10" : "border-stone-200 bg-white/90 group-hover:border-indigo-300"}`}
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="font-bold text-blue-500 select-none">❯</span>
              <span
                className={`truncate tracking-tight ${isDark ? "text-zinc-200" : "text-stone-700"}`}
              >
                {command}
              </span>
            </div>
            <button
              type="button"
              onClick={onCopy}
              className={`group/btn relative overflow-hidden rounded-2xl p-2.5 transition-all duration-300 ${
                isCopied
                  ? isDark
                    ? "bg-emerald-600/30 text-emerald-400"
                    : "bg-emerald-100 text-emerald-600"
                  : isDark
                    ? "bg-zinc-800/50 text-zinc-400 hover:bg-blue-600 hover:text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-indigo-600 hover:text-white"
              }`}
              aria-label="Copy command"
            >
              <div
                className={`absolute inset-0 transition-transform duration-500 ${
                  isCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
              <div className="relative flex items-center justify-center">
                {isCopied ? (
                  <Check
                    size={18}
                    className="animate-in zoom-in-0 spin-in-0 duration-300"
                  />
                ) : (
                  <Copy
                    size={18}
                    className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12"
                  />
                )}
              </div>
            </button>
            <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-full" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <Button
            asChild
            className="w-full border border-blue-800/70 bg-linear-to-r from-blue-950 to-blue-800 px-5 text-white shadow-[0_10px_30px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-0.5 hover:from-blue-900 hover:to-blue-700 hover:shadow-[0_14px_36px_rgba(30,58,138,0.45)] sm:w-auto"
          >
            <a href="#flags">
              View Flags <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            className={`w-full border px-5 shadow-lg transition-all hover:-translate-y-0.5 sm:w-auto ${
              isDark
                ? "border-white/10 bg-zinc-900/60 text-white hover:border-white/20 hover:bg-zinc-800/80"
                : "border-stone-300 bg-white text-stone-900 hover:border-stone-400 hover:bg-stone-100"
            }`}
          >
            <Link href={docsHref}>
              View Docs <ArrowRight className="size-4 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <aside className="hidden xl:flex xl:flex-col xl:justify-center">
        <div
          className={`rounded-3xl border p-6 backdrop-blur-xl ${isDark ? "border-white/5 bg-zinc-900/40" : "border-stone-200 bg-white/80"}`}
        >
          <p
            className={`text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
          >
            Best For
          </p>
          <div
            className={`mt-4 space-y-3 text-sm ${isDark ? "text-zinc-300" : "text-stone-700"}`}
          >
            <p className="flex items-center gap-2">
              <Layers className="size-4 text-blue-400" /> MVP APIs
            </p>
            <p className="flex items-center gap-2">
              <Layers className="size-4 text-blue-600" /> Realtime services
            </p>
            <p className="flex items-center gap-2">
              <Layers className="size-4 text-blue-800" /> Team starter repos
            </p>
          </div>
        </div>
      </aside>
    </header>
  );
}
