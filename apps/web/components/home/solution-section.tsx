import { Zap } from "lucide-react";

type SolutionSectionProps = {
  isDark: boolean;
};

export function SolutionSection({ isDark }: SolutionSectionProps) {
  return (
    <section
      id="solution"
      className="relative z-10 mx-auto w-full max-w-350 px-[21px] py-[89px] sm:px-[34px] lg:px-[55px]"
    >
      <div className="grid items-center gap-[34px] xl:grid-cols-[1fr_1.618fr] xl:gap-[55px]">
        <div>
          <div
            className={`mb-[21px] flex h-[55px] w-[55px] items-center justify-center rounded-[21px] ${
              isDark
                ? "bg-blue-600/20 text-blue-400"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Zap size={28} />
          </div>

          <h2
            className={`text-[34px] font-black tracking-[-0.02em] sm:text-[55px] ${isDark ? "text-white" : "text-stone-900"}`}
          >
            AppInit eliminates setup time
          </h2>

          <p
            className={`mt-[21px] max-w-2xl text-[16px] leading-relaxed font-medium sm:text-[21px] ${isDark ? "text-zinc-400" : "text-stone-600"}`}
          >
            Generate a complete backend foundation{" "}
            <span
              className={`font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
            >
              instantly
            </span>
            . No copy-paste. No template repos. No manual setup.
          </p>
        </div>

        <div
          className={`rounded-[34px] border p-[21px] backdrop-blur-xl ${isDark ? "border-white/10 bg-zinc-900/40" : "border-stone-200 bg-white/80"}`}
        >
          <p
            className={`text-sm font-bold tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
          >
            One Command
          </p>
          <p
            className={`mt-[13px] font-mono text-[21px] font-bold sm:text-[34px] ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            npx @dhruvinjs/appinit my-app
          </p>
          <p
            className={`mt-[13px] text-[13px] ${isDark ? "text-zinc-400" : "text-stone-600"}`}
          >
            Production-ready in ~2 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
