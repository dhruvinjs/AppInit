import { Flag } from "lucide-react";
import { useState } from "react";

import { FLAG_EXAMPLES, FLAG_GROUPS } from "@/components/home/constants";

export function FlagsSection({ isDark }: { isDark: boolean }) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      window.setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      setCopiedCommand(null);
    }
  };

  return (
    <section
      id="flags"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-[21px] py-[89px] lg:px-[55px] ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[55%] w-[45%] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-[10%] bottom-[5%] h-[55%] w-[45%] rounded-full bg-blue-900/10 blur-[140px]" />

      <div className="grid items-start gap-[34px] xl:grid-cols-[1fr_1.618fr] xl:gap-[55px]">
        <div>
          <div className="mb-[21px] flex items-center gap-[13px]">
            <div className={`rounded-[13px] border p-[8px] ${isDark ? "border-white/10 bg-white/5" : "border-stone-300 bg-white"}`}>
              <Flag className="size-4 text-blue-400" />
            </div>
            <h2 className={`text-[34px] font-black tracking-[-0.02em] uppercase ${isDark ? "text-white" : "text-stone-900"}`}>
              Flag Presets
            </h2>
          </div>

          <p className={`max-w-xl text-[14px] leading-relaxed sm:text-[16px] ${isDark ? "text-zinc-500" : "text-stone-600"}`}>
            These options are synced with the CLI source in <code>packages/cli/src/index.ts</code>. Use one preset for fast starts, or combine granular flags for full control.
          </p>

          <div className="mt-[34px] inline-flex items-center gap-[13px] rounded-[21px] border px-[13px] py-[8px] backdrop-blur-xl">
            <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
            <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
              Presets + Granular Flags
            </span>
          </div>
        </div>

        <div className="grid gap-[21px] lg:grid-cols-2">
          {FLAG_GROUPS.map((group) => (
            <article
              key={group.title}
              className={`group relative overflow-hidden rounded-[34px] border p-[21px] transition-all duration-[420ms] hover:-translate-y-1 ${
                isDark
                  ? "border-white/10 bg-zinc-900/50 hover:border-blue-800/60"
                  : "border-stone-200 bg-white hover:border-indigo-300"
              }`}
            >
              <h3 className={`mb-[13px] text-[21px] font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>
                {group.title}
              </h3>
              <div className={`space-y-[8px] text-[13px] ${isDark ? "text-zinc-200" : "text-stone-700"}`}>
                {group.items.map((item) => (
                  <div
                    key={item.command}
                    className={`rounded-[13px] px-[13px] py-[8px] transition-colors ${
                      isDark ? "bg-black/30 hover:bg-white/5" : "bg-stone-100 hover:bg-stone-200"
                    }`}
                  >
                    <p className="font-mono text-xs font-semibold">{item.command}</p>
                    <p className="mt-1 text-xs opacity-80">{item.description}</p>
                  </div>
                ))}
              </div>
              <div
                className={`absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-[700ms] group-hover:opacity-35 ${
                  isDark ? "bg-blue-900" : "bg-indigo-300"
                }`}
              />
              <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-[1000ms] group-hover:left-full" />
            </article>
          ))}
        </div>
      </div>

      <article
        className={`group relative mt-[34px] overflow-hidden rounded-[34px] border p-[21px] ${isDark ? "border-white/10 bg-zinc-900/50" : "border-stone-200 bg-white"}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-[13px]">
          <h3 className={`text-[21px] font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>Run Examples</h3>
          <span
            className={`rounded-full border px-[13px] py-[6px] text-[10px] font-black tracking-[0.2em] uppercase ${
              isDark
                ? "border-white/10 bg-zinc-900/40 text-zinc-500"
                : "border-stone-200 bg-stone-100 text-stone-500"
            }`}
          >
            Copy & Run
          </span>
        </div>

        <div className={`mt-[21px] grid gap-[13px] sm:grid-cols-2 ${isDark ? "text-zinc-200" : "text-stone-700"}`}>
          {FLAG_EXAMPLES.map((example) => (
            <div
              key={example}
              className={`relative overflow-hidden rounded-[21px] border px-[13px] py-[13px] transition-all duration-[260ms] hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/5 bg-black/30 hover:border-blue-800/60"
                  : "border-stone-200 bg-stone-100 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-[13px]">
                <span className="text-cyan-400 select-none">❯</span>
                <p className="min-w-0 flex-1 truncate font-mono text-xs font-semibold">{example}</p>
                <button
                  type="button"
                  onClick={() => handleCopy(example)}
                  className={`shrink-0 rounded-[13px] border px-[8px] py-[6px] text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-[160ms] ${
                    copiedCommand === example
                      ? isDark
                        ? "border-emerald-600/40 bg-emerald-600/20 text-emerald-300"
                        : "border-emerald-500/40 bg-emerald-100 text-emerald-700"
                      : isDark
                        ? "border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-blue-700/60 hover:text-white"
                        : "border-stone-200 bg-white text-stone-600 hover:border-indigo-300 hover:text-stone-900"
                  }`}
                  aria-label={`Copy command ${example}`}
                >
                  {copiedCommand === example ? "Copied" : "Copy"}
                </button>
              </div>
              <div
                className={`mt-[8px] text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}
              >
                Sample run preset
              </div>
              <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-[1000ms] group-hover:left-full" />
            </div>
          ))}
        </div>

        <div
          className={`pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-[700ms] group-hover:opacity-30 ${
            isDark ? "bg-blue-900" : "bg-indigo-300"
          }`}
        />
      </article>
    </section>
  );
}
