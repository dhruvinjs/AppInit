import { Flag } from "lucide-react";

import { FLAG_EXAMPLES, FLAG_GROUPS } from "@/components/home/constants";

export function FlagsSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="flags"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-6 py-24 lg:px-10 ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div className="mb-8 flex items-center gap-3">
        <div className={`rounded-xl border p-2 ${isDark ? "border-white/10 bg-white/5" : "border-stone-300 bg-white"}`}>
          <Flag className="size-4 text-blue-400" />
        </div>
        <h2 className={`text-4xl font-black tracking-tighter uppercase ${isDark ? "text-white" : "text-stone-900"}`}>
          Flag Presets
        </h2>
      </div>

      <p className={`mb-10 max-w-3xl ${isDark ? "text-zinc-500" : "text-stone-600"}`}>
        These options are synced with the CLI source in <code>packages/cli/src/index.ts</code>. Use one preset for fast starts, or combine granular flags for full control.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        {FLAG_GROUPS.map((group) => (
          <article
            key={group.title}
            className={`rounded-3xl border p-6 ${isDark ? "border-white/10 bg-zinc-900/50" : "border-stone-200 bg-white"}`}
          >
            <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>{group.title}</h3>
            <div className={`space-y-2 text-sm ${isDark ? "text-zinc-200" : "text-stone-700"}`}>
              {group.items.map((item) => (
                <div key={item.command} className={`rounded-xl px-3 py-2 ${isDark ? "bg-black/30" : "bg-stone-100"}`}>
                  <p className="font-mono text-xs font-semibold">{item.command}</p>
                  <p className="mt-1 text-xs opacity-80">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <article className={`mt-5 rounded-3xl border p-6 ${isDark ? "border-white/10 bg-zinc-900/50" : "border-stone-200 bg-white"}`}>
        <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>Run Examples</h3>
        <div className={`space-y-2 font-mono text-xs ${isDark ? "text-zinc-200" : "text-stone-700"}`}>
          {FLAG_EXAMPLES.map((example) => (
            <p key={example} className={`rounded-xl px-3 py-2 ${isDark ? "bg-black/30" : "bg-stone-100"}`}>
              {example}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
