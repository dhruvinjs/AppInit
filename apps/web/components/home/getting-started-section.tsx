import Link from "next/link";

import { Button } from "@/components/ui/button";

export function GettingStartedSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="getting-started"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-6 py-20 lg:px-10 ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div
        className={`rounded-3xl border p-8 ${
          isDark ? "border-white/10 bg-zinc-900/40" : "border-stone-200 bg-white"
        }`}
      >
        <p
          className={`text-[10px] font-black tracking-[0.2em] uppercase ${
            isDark ? "text-zinc-500" : "text-stone-500"
          }`}
        >
          Getting Started
        </p>
        <h2
          className={`mt-3 text-4xl font-black tracking-tight ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          Scaffold your backend in one command
        </h2>
        <p className={`mt-4 max-w-3xl ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          Start with the interactive flow, then customize with flags as your project requirements grow.
        </p>

        <pre
          className={`mt-6 overflow-x-auto rounded-xl border p-4 text-sm ${
            isDark
              ? "border-zinc-800 bg-zinc-950 text-zinc-200"
              : "border-stone-200 bg-stone-50 text-stone-800"
          }`}
        >
          <code>{`npx @dhruvinjs/appinit my-app`}</code>
        </pre>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl bg-blue-600 text-white hover:bg-blue-500">
            <Link href="/docs">Read Full Docs</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={isDark ? "border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800" : "border-stone-300 bg-transparent text-stone-700 hover:bg-stone-100"}
          >
            <Link href="https://www.npmjs.com/package/@dhruvinjs/appinit" target="_blank">
              View npm Package
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
