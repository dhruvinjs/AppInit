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
      className="relative z-10 mx-auto grid w-full max-w-350 grid-cols-1 gap-[34px] px-[21px] pt-[55px] pb-[89px] sm:px-[34px] lg:px-[55px] xl:grid-cols-[1.618fr_1fr] xl:items-center xl:gap-[55px] xl:pb-[144px]"
    >
      <div className="text-center xl:text-left">
        <div
          className={`mb-[34px] inline-flex items-center gap-2 rounded-full border px-[13px] py-[8px] text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md ${isDark ? "border-zinc-800 bg-zinc-900/50 text-zinc-400" : "border-stone-200 bg-white/85 text-stone-500"}`}
        >
          <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
          Initialize your backend in seconds
        </div>

        <h1
          className={`text-[34px] leading-[0.92] font-black tracking-[-0.05em] text-balance sm:text-[55px] lg:text-[70px] ${isDark ? "text-white" : "text-stone-900"}`}
        >
          Generate a{" "}
          <span className="bg-linear-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            production-ready
          </span>{" "}
          backend in one command
        </h1>

        <p
          className={`mx-auto mt-[21px] max-w-2xl text-[14px] leading-relaxed font-medium sm:mt-[34px] sm:text-[16px] md:text-[21px] xl:mx-0 ${isDark ? "text-zinc-500" : "text-stone-600"}`}
        >
          Creates a fully structured Node backend with logging, configs, env
          setup, and best-practice architecture in seconds.
        </p>

        <div className="mt-[34px] flex flex-col items-center justify-center gap-[13px] sm:mt-[55px] sm:flex-row xl:justify-start">
          <Button
            asChild
            className="w-full border border-blue-800/70 bg-linear-to-r from-blue-950 to-blue-800 px-[21px] text-white shadow-[0_10px_30px_rgba(15,23,42,0.55)] transition-all duration-[300ms] hover:-translate-y-0.5 hover:from-blue-900 hover:to-blue-700 hover:shadow-[0_14px_36px_rgba(30,58,138,0.45)] active:translate-y-0 sm:w-auto"
          >
            <a href="#flags">
              View Flags <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            className={`w-full border px-[21px] shadow-lg transition-all duration-[300ms] hover:-translate-y-0.5 active:translate-y-0 sm:w-auto ${
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

      <div className="relative mx-auto w-full max-w-2xl xl:max-w-none">
          {/* CLI Focal Window */}
          <div className="pointer-events-none absolute -inset-[21px] rounded-[34px] bg-cyan-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-[13px] -top-[13px] h-[89px] w-[144px] rounded-full bg-violet-500/10 blur-[60px]" />
          <div className="group relative">
            <div
              className={`absolute -inset-2 rounded-[34px] opacity-20 blur-3xl transition duration-[700ms] group-hover:opacity-35 ${isDark ? "bg-cyan-500/30" : "bg-indigo-300/60"}`}
            />
            <div
              className={`relative overflow-hidden rounded-[34px] border p-[21px] text-left font-mono text-xs shadow-2xl backdrop-blur-2xl transition-colors sm:p-[34px] sm:text-sm ${isDark ? "border-white/10 bg-zinc-900/50" : "border-stone-200 bg-white/95"}`}
            >
              <div className="mb-[13px] flex items-center gap-[13px]">
                <div className="flex items-center gap-[8px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-red-500/70" />
                  <span className="h-[8px] w-[8px] rounded-full bg-yellow-400/70" />
                  <span className="h-[8px] w-[8px] rounded-full bg-emerald-400/70" />
                </div>
                <span className={`text-[10px] tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                  AppInit CLI
                </span>
              </div>
              <div className="flex items-center justify-between gap-[13px]">
                <div className="min-w-0">
                  <div className={`text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}>Terminal</div>
                  <div className={`mt-[8px] flex items-center gap-[13px] ${isDark ? "text-zinc-200" : "text-stone-700"}`}>
                    <span className="font-bold text-cyan-400 select-none">❯</span>
                    <span className="truncate tracking-tight">{command}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCopy}
                  className={`group/btn relative shrink-0 overflow-hidden rounded-[13px] p-2.5 transition-all duration-[160ms] active:scale-105 ${
                    isCopied
                      ? isDark
                        ? "bg-emerald-600/30 text-emerald-400"
                        : "bg-emerald-100 text-emerald-600"
                      : isDark
                        ? "bg-zinc-800/50 text-zinc-400 hover:bg-cyan-500 hover:text-white"
                        : "bg-stone-100 text-stone-500 hover:bg-indigo-600 hover:text-white"
                  }`}
                  aria-label="Copy command"
                >
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
              </div>
              <div className="mt-[13px] grid gap-[8px] text-[10px]">
                <span className={`${isDark ? "text-zinc-500" : "text-stone-500"}`}>✔ Templates: Express + WebSockets</span>
                <span className={`${isDark ? "text-zinc-500" : "text-stone-500"}`}>✔ Language: TypeScript or JavaScript</span>
              </div>
              <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-full" />
            </div>
          </div>
        </div>
    </header>
  );
}
