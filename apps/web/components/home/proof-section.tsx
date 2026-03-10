import { Check, FolderTree } from "lucide-react";

type ProofSectionProps = {
  isDark: boolean;
};

export function ProofSection({ isDark }: ProofSectionProps) {
  const projectStructure = [
    "my-api/",
    "├── src/",
    "│   ├── index.js",
    "│   ├── config/",
    "│   │   └── env.js",
    "│   ├── controllers/",
    "│   │   └── health.controller.js",
    "│   ├── middleware/",
    "│   │   └── error.middleware.js",
    "│   ├── routes/",
    "│   │   ├── index.js",
    "│   │   └── health.routes.js",
    "│   └── utils/",
    "│       ├── logger.js",
    "│       └── ApiError.js",
    "├── .env",
    "├── .gitignore",
    "├── package.json",
    "└── README.md",
  ];

  return (
    <section
      id="proof"
      className="relative z-10 mx-auto w-full max-w-350 px-[21px] py-[89px] sm:px-[34px] lg:px-[55px]"
    >
      <div className="text-center">
        <h2
          className={`text-[34px] font-black tracking-[-0.02em] sm:text-[55px] ${isDark ? "text-white" : "text-stone-900"}`}
        >
          See what you get
        </h2>

        <div className="mx-auto mt-[55px] grid max-w-5xl gap-[34px] lg:grid-cols-2">
          {/* Project Structure */}
          <div
            className={`rounded-[34px] border p-[21px] text-left backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-zinc-900/60"
                : "border-stone-200 bg-white/90"
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <FolderTree
                className={isDark ? "text-blue-400" : "text-blue-600"}
                size={24}
              />
              <h3
                className={`text-lg font-bold ${isDark ? "text-white" : "text-stone-900"}`}
              >
                Generated Project Structure
              </h3>
            </div>
            <pre
              className={`overflow-x-auto rounded-[13px] border p-[13px] font-mono text-xs leading-relaxed ${
                isDark
                  ? "border-zinc-800 bg-black/50 text-zinc-300"
                  : "border-stone-200 bg-stone-50 text-stone-700"
              }`}
            >
              {projectStructure.join("\n")}
            </pre>
          </div>

          {/* Features Included */}
          <div
            className={`rounded-[34px] border p-[21px] text-left backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-zinc-900/60"
                : "border-stone-200 bg-white/90"
            }`}
          >
            <h3
              className={`mb-6 text-lg font-bold ${isDark ? "text-white" : "text-stone-900"}`}
            >
              Production Essentials Included
            </h3>
            <ul className="space-y-[13px]">
              {[
                "Structured logging with Pino",
                "Environment validation",
                "Global error handling",
                "Health check endpoints",
                "Clean architecture pattern",
                "TypeScript or JavaScript",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check
                    className={`mt-0.5 shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                    size={20}
                  />
                  <span
                    className={`text-sm ${isDark ? "text-zinc-300" : "text-stone-700"}`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timing */}
        <div
          className={`mx-auto mt-[34px] inline-flex items-center gap-[13px] rounded-full border px-[21px] py-[13px] backdrop-blur-xl ${
            isDark
              ? "border-emerald-900/50 bg-emerald-950/30 text-emerald-400"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          <span className="text-2xl font-black">~2s</span>
          <span className="text-sm font-medium">total setup time</span>
        </div>
      </div>
    </section>
  );
}
