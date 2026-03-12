import { Copy, Check, ArrowRight, Zap, Code2, Rocket, Star } from "lucide-react";
import Link from "next/link";

type FinalCTASectionProps = {
  isDark: boolean;
  command: string;
  isCopied: boolean;
  onCopy: (command: string) => Promise<void>;
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
      className="relative overflow-hidden mx-auto w-full max-w-350 px-[21px] py-[89px] sm:px-[34px] lg:px-[55px]"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-blue-500/20" : "bg-blue-200/40"}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${isDark ? "bg-purple-500/20" : "bg-purple-200/40"}`} />
        <div className={`absolute top-3/4 left-1/2 w-64 h-64 rounded-full blur-3xl ${isDark ? "bg-cyan-500/15" : "bg-cyan-200/30"}`} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-[55px]">
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md ${isDark ? "border-white/20 bg-zinc-900/50 text-blue-400" : "border-blue-200 bg-white/80 text-blue-600"}`}>
            <Rocket className="size-4" />
            Ship production-ready code
          </div>
          
          <h2
            className={`text-[34px] font-black tracking-[-0.02em] leading-[0.95] sm:text-[55px] lg:text-[70px] ${isDark ? "text-white" : "text-stone-900"}`}
          >
            Ready to{" "}
            <span className="relative">
              <span className="bg-linear-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                accelerate
              </span>
              <div className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full animate-pulse ${isDark ? "bg-blue-500/60" : "bg-blue-400/60"}`} />
            </span>{" "}
            your development?
          </h2>

          <p
            className={`mx-auto mt-[21px] max-w-2xl text-[16px] leading-relaxed sm:text-[21px] ${isDark ? "text-zinc-400" : "text-stone-600"}`}
          >
            Join thousands of developers who've streamlined their backend workflow. 
            <span className={`font-semibold ${isDark ? "text-zinc-200" : "text-stone-800"}`}> No setup time, just results.</span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-[55px] max-w-2xl mx-auto">
          {[
            { icon: Zap, label: "2s", desc: "Setup time" },
            { icon: Code2, label: "50+", desc: "Boilerplate files" },
            { icon: Star, label: "100%", desc: "Production ready" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? "border-white/10 bg-zinc-900/40 hover:bg-zinc-800/60" 
                  : "border-stone-200 bg-white/60 hover:bg-white/90"
              }`}
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                <stat.icon className="size-4" />
              </div>
              <div className={`text-lg font-black ${isDark ? "text-white" : "text-stone-900"}`}>
                {stat.label}
              </div>
              <div className={`text-xs ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Command Section */}
        <div className="group relative mx-auto max-w-4xl mb-[55px]">
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-30 blur-3xl transition duration-1000 group-hover:opacity-50" />
          <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 blur-xl transition duration-700 group-hover:opacity-70" />
          
          <div
            className={`relative overflow-hidden rounded-[34px] border-2 p-[21px] shadow-2xl backdrop-blur-2xl transition-all duration-500 sm:p-[34px] ${isDark ? "border-white/20 bg-zinc-900/70 group-hover:border-white/30 group-hover:bg-zinc-900/90" : "border-blue-200 bg-white/90 group-hover:border-blue-300 group-hover:bg-white"}`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className={`font-mono text-xs tracking-wider uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                  Terminal — Ready to launch
                </span>
              </div>
              <div className={`text-xs font-medium px-3 py-1 rounded-full ${isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"}`}>
                ✓ Live
              </div>
            </div>

            {/* Command Display */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent border border-white/10">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`font-bold text-lg select-none ${isDark ? "text-cyan-400" : "text-blue-500"}`}>
                  ❯
                </span>
                <span
                  className={`truncate font-mono text-[16px] tracking-tight sm:text-[24px] font-medium ${isDark ? "text-zinc-200" : "text-stone-700"}`}
                >
                  {command}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopy(command)}
                className={`group/btn relative shrink-0 overflow-hidden rounded-[16px] p-3 transition-all duration-200 active:scale-95 sm:p-4 ${
                  isCopied
                    ? isDark
                      ? "bg-emerald-600/30 text-emerald-400 shadow-lg shadow-emerald-500/20"
                      : "bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/20"
                    : isDark
                      ? "bg-zinc-800/50 text-zinc-400 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-stone-100 text-stone-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                }`}
                aria-label="Copy command"
              >
                <div className="relative flex items-center justify-center">
                  {isCopied ? (
                    <Check
                      size={20}
                      className="animate-in zoom-in-0 spin-in-0 duration-300"
                    />
                  ) : (
                    <Copy
                      size={20}
                      className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* Animated shine effect */}
            <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-all duration-1500 group-hover:left-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/docs"
            className={`group inline-flex items-center gap-3 rounded-2xl border-2 px-8 py-4 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 ${
              isDark
                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/25"
                : "border-blue-600 bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/25"
            }`}
          >
            <Rocket className="size-5" />
            Start Building Now
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs"
            className={`group inline-flex items-center gap-3 rounded-2xl border-2 px-8 py-4 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 ${
              isDark
                ? "border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30"
                : "border-stone-300 bg-transparent text-stone-700 hover:bg-stone-50 hover:border-stone-400"
            }`}
          >
            View Documentation
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust Signal */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
            Trusted by <span className="font-semibold">10,000+</span> developers worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
