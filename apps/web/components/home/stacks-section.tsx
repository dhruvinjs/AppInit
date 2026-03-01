import { TEMPLATE_CARDS } from "@/components/home/constants";
import { TemplateCard } from "@/components/home/template-card";

export function StacksSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="stacks"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-6 py-24 lg:px-10 ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            className={`text-4xl font-black tracking-tighter uppercase md:text-5xl ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Core Stacks
          </h2>
          <p className={`mt-4 text-lg font-medium ${isDark ? "text-zinc-500" : "text-stone-600"}`}>
            Standardized templates for high-performance Node.js environments.
          </p>
        </div>
        <div className="flex gap-3">
          <span
            className={`rounded-xl border px-4 py-2 text-[10px] font-bold tracking-widest uppercase ${
              isDark
                ? "border-zinc-800 bg-zinc-900/50 text-zinc-400"
                : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            TypeScript + JavaScript
          </span>
          <span
            className={`rounded-xl border px-4 py-2 text-[10px] font-bold tracking-widest uppercase ${
              isDark
                ? "border-zinc-800 bg-zinc-900/50 text-zinc-400"
                : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            Docker Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {TEMPLATE_CARDS.map((card) => (
          <TemplateCard key={card.name} {...card} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
