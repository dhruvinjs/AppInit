import { TEMPLATE_CARDS } from "@/components/home/constants";
import { TemplateCard } from "@/components/home/template-card";

export function StacksSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="stacks"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-[21px] py-[89px] lg:px-[55px] ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div className="mb-[55px] flex flex-col gap-[21px] md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            className={`text-[34px] font-black tracking-[-0.02em] uppercase md:text-[55px] ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Core Stacks
          </h2>
          <p className={`mt-[13px] text-[16px] font-medium ${isDark ? "text-zinc-500" : "text-stone-600"}`}>
            Standardized templates for high-performance Node.js environments.
          </p>
        </div>
        <div className="flex gap-3">
          <span
            className={`rounded-[13px] border px-[13px] py-[8px] text-[10px] font-bold tracking-widest uppercase ${
              isDark
                ? "border-zinc-800 bg-zinc-900/50 text-zinc-400"
                : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            TypeScript + JavaScript
          </span>
          <span
            className={`rounded-[13px] border px-[13px] py-[8px] text-[10px] font-bold tracking-widest uppercase ${
              isDark
                ? "border-zinc-800 bg-zinc-900/50 text-zinc-400"
                : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            Docker Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[21px] md:grid-cols-2 xl:grid-cols-3">
        {TEMPLATE_CARDS.map((card) => (
          <TemplateCard key={card.name} {...card} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
