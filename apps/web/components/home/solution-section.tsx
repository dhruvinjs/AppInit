import { Zap } from "lucide-react";

type SolutionSectionProps = {
  isDark: boolean;
};

export function SolutionSection({ isDark }: SolutionSectionProps) {
  return (
    <section
      id="solution"
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div
          className={`mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl ${
            isDark
              ? "bg-blue-600/20 text-blue-400"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          <Zap size={40} />
        </div>

        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-stone-900"}`}
        >
          AppInit eliminates setup time
        </h2>

        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-medium sm:text-xl ${isDark ? "text-zinc-400" : "text-stone-600"}`}
        >
          Generate a complete backend foundation{" "}
          <span
            className={`font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            instantly
          </span>
          . No copy-paste. No template repos. No manual setup.
        </p>

        <div
          className={`mx-auto mt-10 max-w-2xl rounded-3xl border p-8 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-zinc-900/40"
              : "border-stone-200 bg-white/80"
          }`}
        >
          <p
            className={`text-sm font-bold tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
          >
            One Command
          </p>
          <p
            className={`mt-4 font-mono text-2xl font-bold sm:text-3xl ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            npx @dhruvinjs/appinit my-app
          </p>
          <p
            className={`mt-4 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}
          >
            Production-ready in ~2 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
