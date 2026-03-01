import Link from "next/link";
import { Github, Star, Users } from "lucide-react";

type TrustSignalsSectionProps = {
  isDark: boolean;
};

export function TrustSignalsSection({ isDark }: TrustSignalsSectionProps) {
  return (
    <section
      id="trust"
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="text-center">
        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-stone-900"}`}
        >
          Built in the open
        </h2>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {/* Open Source */}
          <Link
            href="https://github.com/yourusername/appinit"
            target="_blank"
            className={`group rounded-3xl border p-8 backdrop-blur-xl transition-all hover:-translate-y-1 ${
              isDark
                ? "border-white/10 bg-zinc-900/60 hover:border-white/20"
                : "border-stone-200 bg-white/90 hover:border-stone-300"
            }`}
          >
            <Github
              className={`mx-auto ${isDark ? "text-white" : "text-stone-900"}`}
              size={32}
            />
            <p
              className={`mt-4 text-sm font-bold tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
            >
              Open Source
            </p>
            <p
              className={`mt-2 text-2xl font-black ${isDark ? "text-white" : "text-stone-900"}`}
            >
              MIT License
            </p>
          </Link>

          {/* GitHub Stars */}
          <div
            className={`rounded-3xl border p-8 backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-zinc-900/60"
                : "border-stone-200 bg-white/90"
            }`}
          >
            <Star
              className={`mx-auto ${isDark ? "text-yellow-400" : "text-yellow-600"}`}
              size={32}
            />
            <p
              className={`mt-4 text-sm font-bold tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
            >
              GitHub Stars
            </p>
            <p
              className={`mt-2 text-2xl font-black ${isDark ? "text-white" : "text-stone-900"}`}
            >
              Coming Soon
            </p>
          </div>

          {/* Contributors */}
          <div
            className={`rounded-3xl border p-8 backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-zinc-900/60"
                : "border-stone-200 bg-white/90"
            }`}
          >
            <Users
              className={`mx-auto ${isDark ? "text-blue-400" : "text-blue-600"}`}
              size={32}
            />
            <p
              className={`mt-4 text-sm font-bold tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-stone-500"}`}
            >
              Version
            </p>
            <p
              className={`mt-2 text-2xl font-black ${isDark ? "text-white" : "text-stone-900"}`}
            >
              v1.0.1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
