import { Box, Database, Layers, Radio } from "lucide-react";

import { AnimatedIcon } from "@/components/home/animated-icon";
import type { AnimatedIconType } from "@/components/home/types";

export function TemplateCard({
  name,
  type,
  color,
  description,
  tags,
  isDark,
}: {
  name: string;
  type: AnimatedIconType;
  color: string;
  description: string;
  tags: string[];
  isDark: boolean;
}) {
  const hasAnimatedHover = type === "express" || type === "websocket";
  const StaticIcon =
    type === "express"
      ? Layers
      : type === "websocket"
        ? Radio
        : type === "database"
          ? Database
          : Box;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1 ${
        isDark
          ? "border-zinc-800 bg-linear-to-br from-black via-zinc-950 to-blue-950/25 hover:border-blue-800/60"
          : "border-stone-200 bg-linear-to-br from-white via-stone-100 to-indigo-50 hover:border-indigo-300"
      }`}
    >
      <div
        className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border transition-colors ${
          isDark
            ? `border-white/5 text-zinc-500 group-hover:border-blue-900/60 group-hover:text-zinc-300 ${color}`
            : "border-stone-200 bg-white text-stone-500 group-hover:border-indigo-300 group-hover:text-stone-700"
        }`}
      >
        <div className={`relative ${hasAnimatedHover ? "h-16 w-16" : "h-12 w-12"}`}>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hasAnimatedHover ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
          >
            <StaticIcon className="size-8" />
          </div>
          {hasAnimatedHover && (
            <div className="absolute inset-0 scale-75 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100">
              <AnimatedIcon type={type} />
            </div>
          )}
        </div>
      </div>
      <h3
        className={`relative z-10 mb-2 text-xl font-bold transition-colors ${
          isDark
            ? "text-white group-hover:text-blue-600"
            : "text-stone-900 group-hover:text-indigo-600"
        }`}
      >
        {name}
      </h3>
      <p
        className={`relative z-10 mb-4 text-sm leading-relaxed ${
          isDark ? "text-zinc-400" : "text-stone-600"
        }`}
      >
        {description}
      </p>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-xl border px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${
              isDark
                ? "border-zinc-700/50 bg-zinc-800/80 text-zinc-400"
                : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className={`absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-35 ${
          isDark ? "bg-blue-900" : "bg-indigo-300"
        }`}
      />
    </article>
  );
}
