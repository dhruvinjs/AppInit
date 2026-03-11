"use client";

import { useState } from "react";
import { ChevronRight, FileCode, Folder } from "lucide-react";

type ExplorerFile = {
  name: string;
  path: string;
  type: "file" | "folder";
  description: string;
  children?: ExplorerFile[];
};

const boilerplateStructure: ExplorerFile[] = [
  {
    name: "src",
    path: "src/",
    type: "folder",
    description: "Source code directory",
    children: [
      {
        name: "index.ts",
        path: "src/index.ts",
        type: "file",
        description: "Application entry point with Express server setup",
      },
      {
        name: "config",
        path: "src/config/",
        type: "folder",
        description: "Configuration management",
        children: [
          {
            name: "env.ts",
            path: "src/config/env.ts",
            type: "file",
            description: "Environment variables validation using Zod",
          },
        ],
      },
      {
        name: "controllers",
        path: "src/controllers/",
        type: "folder",
        description: "Request handlers",
        children: [
          {
            name: "health.controller.ts",
            path: "src/controllers/health.controller.ts",
            type: "file",
            description: "Health check endpoint controller",
          },
        ],
      },
      {
        name: "middleware",
        path: "src/middleware/",
        type: "folder",
        description: "Express middleware",
        children: [
          {
            name: "error.middleware.ts",
            path: "src/middleware/error.middleware.ts",
            type: "file",
            description: "Centralized error handling middleware",
          },
        ],
      },
      {
        name: "routes",
        path: "src/routes/",
        type: "folder",
        description: "API route definitions",
        children: [
          {
            name: "index.ts",
            path: "src/routes/index.ts",
            type: "file",
            description: "Route registration and composition",
          },
        ],
      },
      {
        name: "utils",
        path: "src/utils/",
        type: "folder",
        description: "Utility functions and helpers",
        children: [
          {
            name: "ApiError.ts",
            path: "src/utils/ApiError.ts",
            type: "file",
            description: "Custom API error class for consistent error handling",
          },
        ],
      },
    ],
  },
  {
    name: ".env.example",
    path: ".env.example",
    type: "file",
    description: "Environment variables template",
  },
  {
    name: "package.json",
    path: "package.json",
    type: "file",
    description: "Project dependencies and scripts",
  },
  {
    name: "tsconfig.json",
    path: "tsconfig.json",
    type: "file",
    description: "TypeScript configuration",
  },
];

const fileDescriptions: Record<string, { title: string; description: string }> = {
  "src/index.ts": {
    title: "Application Entry Point",
    description: "Sets up the Express server with middleware, error handling, and route registration. Includes graceful shutdown handling.",
  },
  "src/config/env.ts": {
    title: "Environment Variables Validation",
    description: "Uses Zod schema to validate all environment variables at startup. Ensures type safety and prevents runtime errors from missing configs.",
  },
  "src/controllers/health.controller.ts": {
    title: "Health Check Controller",
    description: "Provides a health check endpoint for load balancers and monitoring. Essential for production deployments.",
  },
  "src/middleware/error.middleware.ts": {
    title: "Error Handling Middleware",
    description: "Centralized error handler that catches all errors and returns consistent JSON responses. Prevents sensitive data leakage.",
  },
  "src/routes/index.ts": {
    title: "Route Registration",
    description: "Composes all route modules and registers them with Express. Makes it easy to add new features and maintain modularity.",
  },
  "src/utils/ApiError.ts": {
    title: "Custom Error Class",
    description: "Standardized error class for API responses. Includes status codes, messages, and optional stack traces in development.",
  },
  "package.json": {
    title: "Project Dependencies",
    description: "Pre-configured with production-ready dependencies like Express, TypeScript, Pino logger, and Zod validation.",
  },
  "tsconfig.json": {
    title: "TypeScript Configuration",
    description: "Optimized for Node.js with strict type checking, proper module resolution, and source map support.",
  },
  ".env.example": {
    title: "Environment Template",
    description: "Documents all required environment variables. Copy to .env and fill in your values.",
  },
};

type FileTreeProps = {
  files: ExplorerFile[];
  selectedPath: string;
  onSelect: (path: string) => void;
  isDark: boolean;
  level?: number;
};

function FileTree({ files, selectedPath, onSelect, isDark, level = 0 }: FileTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "src/": true,
    "src/config/": true,
    "src/controllers/": true,
    "src/middleware/": true,
    "src/routes/": true,
    "src/utils/": true,
  });

  return (
    <div className="space-y-0.5">
      {files.map((file) => (
        <div key={file.path}>
          <button
            onClick={() => {
              if (file.type === "folder") {
                setExpanded((prev) => ({
                  ...prev,
                  [file.path]: !prev[file.path],
                }));
              } else {
                onSelect(file.path);
              }
            }}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
              selectedPath === file.path
                ? isDark
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : isDark
                ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            }`}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            {file.type === "folder" ? (
              <>
                <ChevronRight
                  size={14}
                  className={`transition-transform ${expanded[file.path] ? "rotate-90" : ""}`}
                />
                <Folder size={14} className={isDark ? "text-yellow-500" : "text-yellow-600"} />
              </>
            ) : (
              <>
                <div className="w-3.5" />
                <FileCode size={14} className={isDark ? "text-slate-400" : "text-slate-500"} />
              </>
            )}
            <span>{file.name}</span>
          </button>

          {file.type === "folder" && expanded[file.path] && file.children && (
            <FileTree
              files={file.children}
              selectedPath={selectedPath}
              onSelect={onSelect}
              isDark={isDark}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function BoilerplateExplorer({ isDark }: { isDark: boolean }) {
  const [selectedPath, setSelectedPath] = useState("src/index.ts");
  const fileInfo = fileDescriptions[selectedPath] || {
    title: "Select a file",
    description: "Click on any file in the project structure to learn about its purpose and how it contributes to the application.",
  };

  return (
    <section
      id="explorer"
      className="relative z-10 mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mb-12 text-center">
        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          Explore the Generated Structure
        </h2>
        <p
          className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}
        >
          See how AppInit structures your project for scalability and maintainability
        </p>
      </div>

      {/* Golden Ratio Grid: 1fr (file tree) to 1.618fr (code info) */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.618fr]">
        {/* Left Column: File Tree */}
        <div
          className={`rounded-2xl border p-6 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-zinc-900/60"
              : "border-stone-200 bg-white/90"
          }`}
        >
          <h3
            className={`mb-4 text-sm font-bold tracking-wider uppercase ${
              isDark ? "text-zinc-400" : "text-stone-500"
            }`}
          >
            Project Structure
          </h3>
          <div
            className={`max-h-96 overflow-y-auto rounded-lg p-2 ${
              isDark ? "bg-black/30" : "bg-stone-50"
            }`}
          >
            <FileTree
              files={boilerplateStructure}
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Right Column: File Information */}
        <div
          className={`rounded-2xl border p-8 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-zinc-900/60"
              : "border-stone-200 bg-white/90"
          }`}
        >
          <div className="space-y-6">
            <div>
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {fileInfo.title}
              </h3>
              <p
                className={`mt-3 text-base leading-relaxed ${
                  isDark ? "text-zinc-300" : "text-stone-700"
                }`}
              >
                {fileInfo.description}
              </p>
            </div>

            <div className="space-y-3 border-t pt-6">
              <p
                className={`text-xs font-semibold tracking-wider uppercase ${
                  isDark ? "text-zinc-500" : "text-stone-500"
                }`}
              >
                File Path
              </p>
              <code
                className={`block rounded-lg p-3 text-sm font-mono ${
                  isDark
                    ? "bg-black/50 text-blue-300"
                    : "bg-stone-100 text-blue-700"
                }`}
              >
                {selectedPath}
              </code>
            </div>

            <div className={`rounded-lg border-l-4 p-4 ${
              isDark
                ? "border-l-amber-500 bg-amber-950/30 text-amber-100"
                : "border-l-amber-500 bg-amber-50 text-amber-900"
            }`}>
              <p className="text-sm">
                <strong>Tip:</strong> This structure follows industry best practices for scalable Node.js applications. Easy to extend with new features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
