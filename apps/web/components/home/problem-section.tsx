import { X } from "lucide-react";

type ProblemSectionProps = {
  isDark: boolean;
};

export function ProblemSection({ isDark }: ProblemSectionProps) {
  const problems = [
    "Config mistakes that break production",
    "Inconsistent project structure across teams",
    "Wasted hours setting up the same boilerplate",
    "Missing production essentials (logging, error handling, env validation)",
  ];

  return (
    <section
      id="problem"
      className="relative z-10 mx-auto w-full max-w-350 px-[21px] py-[89px] sm:px-[34px] lg:px-[55px]"
    >
      <div className="grid items-start gap-[34px] xl:grid-cols-[1fr_1.618fr] xl:gap-[55px]">
        <div className="order-2 xl:order-1">
          <div className="relative space-y-[13px]">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`group flex items-start gap-[20px] rounded-[21px] border p-[21px] backdrop-blur-xl transition-all duration-[260ms] hover:-translate-y-0.5 ${
                  isDark
                    ? "border-red-900/30 bg-red-950/20 hover:border-red-800/60"
                    : "border-red-200 bg-red-50/80 hover:border-red-300"
                }`}
              >
                <div
                  className={`flex h-[21px] w-[21px] items-center justify-center rounded-full border text-[10px] font-black ${
                    isDark ? "border-red-900/60 text-red-400" : "border-red-300 text-red-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="space-y-[8px]">
                  <p
                    className={`text-left text-sm font-medium sm:text-base ${
                      isDark ? "text-zinc-300" : "text-stone-700"
                    }`}
                  >
                    {problem}
                  </p>
                  <div className={`text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                    Common friction point
                  </div>
                </div>
                <X
                  className={`ml-auto mt-0.5 shrink-0 opacity-60 ${isDark ? "text-red-400" : "text-red-600"}`}
                  size={18}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 xl:order-2 xl:mt-[34px]">
          <div className="rounded-[34px] border p-[21px] pt-[34px] backdrop-blur-xl">
            <p
              className={`text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
            >
              The Problem
            </p>
            <h2
              className={`mt-[13px] text-[34px] font-black tracking-[-0.02em] sm:text-[55px] ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Setting up a backend from scratch means
            </h2>
            <p
              className={`mt-[21px] max-w-xl text-[14px] leading-relaxed sm:text-[16px] md:text-[21px] ${
                isDark ? "text-zinc-500" : "text-stone-600"
              }`}
            >
              Every team repeats the same steps, and the smallest inconsistency can
              ripple into production issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
