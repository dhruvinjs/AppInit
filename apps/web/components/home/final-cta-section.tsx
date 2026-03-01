import { Copy, Check } from "lucide-react";

type FinalCTASectionProps = {
  isDark: boolean;
  command: string;
  isCopied: boolean;
  onCopy: () => Promise<void>;
};

export function FinalCTASection({
  isDark,
  command,
  isCopied,
  onCopy,
}: FinalCTASectionProps) {
  return (
    <section
      id="final-cta"
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-32 sm:px-6 lg:px-10"
    >
      <div className="text-center">
        <h2
          className={`text-4xl font-black tracking-tight sm:text-5xl md:text-6xl ${isDark ? "text-white" : "text-stone-900"}`}
        >
          Ready to build?
        </h2>

        <p
          className={`mx-auto mt-6 max-w-xl text-lg sm:text-xl ${isDark ? "text-zinc-400" : "text-stone-600"}`}
        >
          Get started in seconds. No registration required.
        </p>

        <div className="group relative mx-auto mt-12 max-w-2xl">
          <div className="absolute -inset-3 rounded-3xl bg-blue-600 opacity-20 blur-3xl transition duration-1000 group-hover:opacity-40" />
          <div
            className={`relative flex items-center justify-between overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl transition-colors sm:p-8 ${isDark ? "border-white/10 bg-zinc-900/60 group-hover:border-white/20" : "border-stone-200 bg-white/95 group-hover:border-indigo-300"}`}
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="hidden font-bold text-blue-500 select-none sm:inline">
                ❯
              </span>
              <span
                className={`truncate font-mono text-lg tracking-tight sm:text-2xl ${isDark ? "text-zinc-200" : "text-stone-700"}`}
              >
                {command}
              </span>
            </div>
            <button
              type="button"
              onClick={onCopy}
              className={`group/btn relative shrink-0 overflow-hidden rounded-2xl p-3 transition-all duration-300 sm:p-4 ${
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
              <div className="relative flex items-center justify-center">
                {isCopied ? (
                  <Check
                    size={24}
                    className="animate-in zoom-in-0 spin-in-0 duration-300"
                  />
                ) : (
                  <Copy
                    size={24}
                    className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12"
                  />
                )}
              </div>
            </button>
            <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
