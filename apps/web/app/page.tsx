"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  Box,
  CheckCheck,
  Copy,
  Database,
  Flag,
  Github,
  Layers,
  Radio,
  Server,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type AnimatedIconType = "express" | "websocket" | "database" | "devops";

function AnimatedIcon({ type }: { type: AnimatedIconType }) {
  switch (type) {
    case "express":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect
            x="8"
            y="28"
            width="22"
            height="16"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-65"
          />
          <rect
            x="16"
            y="45"
            width="6"
            height="2"
            fill="currentColor"
            className="opacity-55"
          />
          <path
            d="M19 47 L17 51 L21 51 Z"
            fill="currentColor"
            className="opacity-55"
          />

          <rect
            x="70"
            y="27"
            width="22"
            height="8"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-65"
          />
          <rect
            x="70"
            y="39"
            width="22"
            height="8"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-65"
          />
          <rect
            x="70"
            y="51"
            width="22"
            height="8"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-65"
          />
          <circle cx="75" cy="31" r="1.2" fill="#1d4ed8" />
          <circle cx="75" cy="43" r="1.2" fill="#1d4ed8" />
          <circle cx="75" cy="55" r="1.2" fill="#1d4ed8" />

          <line
            x1="34"
            y1="34"
            x2="66"
            y2="34"
            stroke="#1e3a8a"
            strokeWidth="1.3"
            strokeDasharray="4 3"
            className="opacity-85"
          />
          <line
            x1="66"
            y1="46"
            x2="34"
            y2="46"
            stroke="#1e3a8a"
            strokeWidth="1.3"
            strokeDasharray="4 3"
            className="opacity-85"
          />

          <polygon points="66,34 62,32 62,36" fill="#1d4ed8" />
          <polygon points="34,46 38,44 38,48" fill="#1d4ed8" />

          <circle cx="34" cy="34" r="1.6" fill="#2563eb">
            <animate
              attributeName="cx"
              values="34;66;34"
              dur="2.3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="66" cy="46" r="1.6" fill="#1e40af">
            <animate
              attributeName="cx"
              values="66;34;66"
              dur="2.3s"
              begin="1.15s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.3s"
              begin="1.15s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    case "websocket":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <line
            x1="20"
            y1="40"
            x2="80"
            y2="40"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            className="opacity-20"
          />
          <line
            x1="20"
            y1="60"
            x2="80"
            y2="60"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            className="opacity-20"
          />

          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <circle cx="0" cy="40" r="2" fill="currentColor">
                <animate
                  attributeName="cx"
                  values="20;80"
                  dur="2s"
                  begin={`${i * 0.6}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="2s"
                  begin={`${i * 0.6}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="0" cy="60" r="2" fill="currentColor">
                <animate
                  attributeName="cx"
                  values="80;20"
                  dur="2s"
                  begin={`${i * 0.6 + 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="2s"
                  begin={`${i * 0.6 + 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </React.Fragment>
          ))}

          <rect
            x="10"
            y="35"
            width="10"
            height="30"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="80"
            y="35"
            width="10"
            height="30"
            rx="2"
            fill="currentColor"
          />
        </svg>
      );

    case "database":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M30 60 L70 60 L75 65 L25 65 Z"
            fill="currentColor"
            className="opacity-20"
          />
          <path
            d="M30 70 L70 70 L75 75 L25 75 Z"
            fill="currentColor"
            className="opacity-40"
          />
          <path d="M30 80 L70 80 L75 85 L25 85 Z" fill="currentColor" />

          <rect
            x="40"
            y="20"
            width="20"
            height="15"
            rx="1"
            fill="#065f46"
            className="opacity-0"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="10;50"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              values="20;40"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values="40;30"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>

          <rect
            x="30"
            y="80"
            width="40"
            height="2"
            fill="white"
            className="opacity-0"
          >
            <animate
              attributeName="opacity"
              values="0;0.5;0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values="30;70"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      );

    case "devops":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect
            x="34"
            y="34"
            width="32"
            height="32"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-25"
          />
          <line
            x1="34"
            y1="50"
            x2="66"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-20"
          />
          <line
            x1="50"
            y1="34"
            x2="50"
            y2="66"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-20"
          />

          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="140"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="140;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>

          <line
            x1="30"
            y1="30"
            x2="70"
            y2="30"
            stroke="#1e3a8a"
            strokeWidth="1.5"
            className="opacity-0"
          >
            <animate
              attributeName="y1"
              values="30;70;30"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="30;70;30"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>

          <circle cx="40" cy="40" r="1.8" fill="currentColor">
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="40" r="1.8" fill="currentColor">
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur="1s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="40" cy="60" r="1.8" fill="currentColor">
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur="1s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="60" r="1.8" fill="currentColor">
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur="1s"
              begin="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );

    default:
      return null;
  }
}

function TemplateCard({
  name,
  type,
  color,
  description,
  tags,
}: {
  name: string;
  type: AnimatedIconType;
  color: string;
  description: string;
  tags: string[];
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
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-black via-zinc-950 to-blue-950/25 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-800/60">
      <div
        className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/5 text-zinc-500 transition-colors group-hover:border-blue-900/60 group-hover:text-zinc-300 ${color}`}
      >
        <div
          className={`relative ${hasAnimatedHover ? "h-16 w-16" : "h-12 w-12"}`}
        >
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
      <h3 className="relative z-10 mb-2 text-xl font-bold text-white transition-colors group-hover:text-blue-600">
        {name}
      </h3>
      <p className="relative z-10 mb-4 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-zinc-700/50 bg-zinc-800/80 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-900 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-35" />
    </article>
  );
}

const templateCards = [
  {
    name: "Express.js",
    type: "express" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/70 to-black",
    description:
      "The gold standard REST setup with health checks and centralized async error management.",
    tags: ["rest", "middleware", "ts/js"],
  },
  {
    name: "Native WebSockets",
    type: "websocket" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-900/60 to-black",
    description:
      "Ultra-lightweight realtime layer with ws for high-throughput messaging.",
    tags: ["ws", "tcp", "performance"],
  },
  {
    name: "Socket.io",
    type: "websocket" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-900/75 to-black",
    description:
      "Feature-rich realtime engine with rooms, events, and reconnect support.",
    tags: ["rooms", "events", "broadcast"],
  },
  {
    name: "Prisma + Postgres",
    type: "database" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/50 to-black",
    description:
      "Fully typed relational database flow with Prisma schema and generated client.",
    tags: ["sql", "orm", "prisma"],
  },
  {
    name: "MongoDB",
    type: "database" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/40 to-black",
    description:
      "NoSQL integration with Mongoose using clean model and connection setup.",
    tags: ["nosql", "mongoose", "schema"],
  },
  {
    name: "DevOps Bundle",
    type: "devops" as const,
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/35 to-black",
    description:
      "Optional Dockerfile and Git initialization for fast local-to-production flow.",
    tags: ["docker", "git"],
  },
];

export default function Home() {
  const command = "npx @dhruvinjs/appinit my-test-app";
  const [isCopied, setIsCopied] = useState(false);
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-300 selection:bg-blue-500/30 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[50%] w-[50%] rounded-full bg-blue-900/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[24px_24px] opacity-[0.03]" />
      </div>

      <nav className="relative z-10 mx-auto flex w-full max-w-350 items-center justify-between px-6 py-8 lg:px-10">
        <div className="flex cursor-default items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform duration-500 hover:scale-110">
            <Terminal className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-widest text-white uppercase italic">
            APPINIT
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="#flags"
            className="hidden text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:text-white md:inline"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("flags");
            }}
          >
            Flags
          </Link>
          <Button
            asChild
            className="rounded-full bg-white px-6 py-2.5 text-black hover:bg-blue-500 hover:text-white"
          >
            <Link href="https://github.com/dhruvinjs/AppInit" target="_blank">
              <Github size={16} />
              GitHub
            </Link>
          </Button>
        </div>
      </nav>

      <header className="relative z-10 mx-auto grid w-full max-w-350 grid-cols-1 gap-8 px-6 pt-10 pb-28 lg:px-10 xl:grid-cols-[1fr_minmax(0,760px)_1fr] xl:pb-40">
        <aside className="hidden xl:flex xl:flex-col xl:justify-center">
          <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-xl">
            <p className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              What You Get
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> REST
                or WebSocket starter
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700" /> TS or
                JS output
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700" /> DB +
                Docker options
              </li>
            </ul>
          </div>
        </aside>

        <div className="text-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase backdrop-blur-md">
            <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
            Architect your backend in seconds
          </div>

          <h1 className="text-5xl leading-[0.9] font-black tracking-tighter text-balance text-white sm:text-7xl md:text-[100px]">
            READY FOR <br />
            <span className="bg-linear-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              PRODUCTION.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed font-medium text-zinc-500 md:text-xl">
            appinit scaffolds clean Node.js backends with project structure,
            health checks, error handling, database setup, and optional Docker.
          </p>

          <div className="group relative mx-auto mt-12 max-w-xl">
            <div className="absolute -inset-2 rounded-2xl bg-blue-600 opacity-10 blur-2xl transition duration-1000 group-hover:opacity-30" />
            <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-5 font-mono text-sm shadow-2xl backdrop-blur-2xl transition-colors group-hover:border-white/10">
              <div className="flex min-w-0 items-center gap-4">
                <span className="font-bold text-blue-500 select-none">❯</span>
                <span className="truncate tracking-tight text-zinc-200">
                  {command}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="group/btn rounded-xl bg-zinc-800/50 p-2.5 text-zinc-400 transition-all hover:bg-blue-600 hover:text-white"
                aria-label="Copy command"
              >
                {isCopied ? (
                  <CheckCheck size={18} className="text-emerald-400" />
                ) : (
                  <Copy
                    size={18}
                    className="transition-transform group-hover/btn:scale-110"
                  />
                )}
              </button>
              <div className="absolute top-0 -left-full h-full w-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-full" />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              asChild
              className="border border-blue-800/70 bg-linear-to-r from-blue-950 to-blue-800 px-5 text-white shadow-[0_10px_30px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-0.5 hover:from-blue-900 hover:to-blue-700 hover:shadow-[0_14px_36px_rgba(30,58,138,0.45)]"
            >
              <Link
                href="#flags"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("flags");
                }}
              >
                See CLI Flags <ArrowDown className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <aside className="hidden xl:flex xl:flex-col xl:justify-center">
          <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-xl">
            <p className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              Best For
            </p>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <Layers className="size-4 text-blue-400" /> MVP APIs
              </p>
              <p className="flex items-center gap-2">
                <Layers className="size-4 text-blue-600" /> Realtime services
              </p>
              <p className="flex items-center gap-2">
                <Layers className="size-4 text-blue-800" /> Team starter repos
              </p>
            </div>
          </div>
        </aside>
      </header>

      <section
        id="stacks"
        className="relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t border-white/5 px-6 py-24 lg:px-10"
      >
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase md:text-5xl">
              Core Stacks
            </h2>
            <p className="mt-4 text-lg font-medium text-zinc-500">
              Standardized templates for high-performance Node.js environments.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              TypeScript + JavaScript
            </span>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              Docker Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {templateCards.map((card) => (
            <TemplateCard key={card.name} {...card} />
          ))}
        </div>
      </section>

      <section
        id="flags"
        className="relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t border-white/5 px-6 py-24 lg:px-10"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">
            <Flag className="size-4 text-blue-400" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">
            Flag Presets
          </h2>
        </div>

        <p className="mb-10 max-w-3xl text-zinc-500">
          Use presets for quick starts or combine granular flags for full
          control over template, language, websocket engine, database, Docker,
          and package manager.
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Presets
            </h3>
            <div className="space-y-3 font-mono text-sm text-zinc-200">
              <p className="rounded-lg bg-black/30 px-3 py-2">
                appinit my-app --ts-rest
              </p>
              <p className="rounded-lg bg-black/30 px-3 py-2">
                appinit my-app --ts-io
              </p>
              <p className="rounded-lg bg-black/30 px-3 py-2">
                appinit my-app --js-ws
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Full Config
            </h3>
            <div className="space-y-3 font-mono text-sm text-zinc-200">
              <p className="rounded-lg bg-black/30 px-3 py-2">
                appinit my-app --template websocket+rest_api --lang ts
              </p>
              <p className="rounded-lg bg-black/30 px-3 py-2">
                --db postgresql_prisma --ws socket.io --docker --pm pnpm
              </p>
            </div>
          </article>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.16),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-350 flex-col items-center justify-center text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/55 px-4 py-2 backdrop-blur-xl">
            <span className="rounded-md border border-white/15 bg-zinc-950 p-1.5">
              <Server className="size-3.5 text-zinc-300" />
            </span>
            <span className="text-xs font-black tracking-[0.2em] text-zinc-400">
              dhruvinjs/appinit
            </span>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-zinc-500">
            Open-source infrastructure for the modern backend engineer. Build
            with confidence, scale with ease.
          </p>

          <div className="mt-10 flex items-center gap-8 text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">
            <Link
              href="#flags"
              className="transition-colors hover:text-zinc-300"
            >
              Docs
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className="transition-colors hover:text-zinc-300"
            >
              Twitter
            </Link>
            <Link
              href="#stacks"
              className="transition-colors hover:text-zinc-300"
            >
              Changelog
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
