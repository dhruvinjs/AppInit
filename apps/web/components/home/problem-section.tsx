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
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="text-center">
        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-stone-900"}`}
        >
          Setting up a backend from scratch means
        </h2>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-2xl border p-6 backdrop-blur-xl ${
                isDark
                  ? "border-red-900/30 bg-red-950/20"
                  : "border-red-200 bg-red-50/80"
              }`}
            >
              <X
                className={`mt-1 shrink-0 ${isDark ? "text-red-400" : "text-red-600"}`}
                size={20}
              />
              <p
                className={`text-left text-sm font-medium sm:text-base ${
                  isDark ? "text-zinc-300" : "text-stone-700"
                }`}
              >
                {problem}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
