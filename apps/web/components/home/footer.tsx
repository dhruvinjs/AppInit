import Link from "next/link";
import { Server } from "lucide-react";

export function Footer({
  isDark,
  docsHref = "/docs",
}: {
  isDark: boolean;
  docsHref?: string;
}) {
  return (
    <footer
      className={`relative z-10 border-t px-6 py-20 transition-colors duration-700 ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.16),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-350 flex-col items-center justify-center text-center">
        <div
          className={`mb-8 inline-flex items-center gap-3 rounded-2xl border px-4 py-2 backdrop-blur-xl ${
            isDark ? "border-white/10 bg-zinc-900/55" : "border-stone-300 bg-white/85"
          }`}
        >
          <span
            className={`rounded-lg border p-1.5 ${
              isDark ? "border-white/15 bg-zinc-950" : "border-stone-300 bg-stone-100"
            }`}
          >
            <Server className={`size-3.5 ${isDark ? "text-zinc-300" : "text-stone-700"}`} />
          </span>
          <Link
            href="https://www.npmjs.com/package/@dhruvinjs/appinit"
            target="_blank"
            className={`text-xs font-black tracking-[0.2em] transition-colors hover:text-blue-400 ${
              isDark ? "text-zinc-400" : "text-stone-600"
            }`}
          >
            dhruvinjs/appinit
          </Link>
        </div>

        <p className={`max-w-2xl text-lg leading-relaxed ${isDark ? "text-zinc-500" : "text-stone-600"}`}>
          Open-source infrastructure for the modern backend engineer. Build with confidence, scale with ease.
        </p>

        <div
          className={`mt-10 flex items-center gap-8 text-xs font-black tracking-[0.2em] uppercase ${
            isDark ? "text-zinc-500" : "text-stone-500"
          }`}
        >
          <Link href={docsHref} className={`transition-colors ${isDark ? "hover:text-zinc-300" : "hover:text-stone-900"}`}>
            Docs
          </Link>
          <Link href="https://x.com" target="_blank" className={`transition-colors ${isDark ? "hover:text-zinc-300" : "hover:text-stone-900"}`}>
            Twitter
          </Link>
          <Link href="#stacks" className={`transition-colors ${isDark ? "hover:text-zinc-300" : "hover:text-stone-900"}`}>
            Changelog
          </Link>
        </div>
      </div>
    </footer>
  );
}
