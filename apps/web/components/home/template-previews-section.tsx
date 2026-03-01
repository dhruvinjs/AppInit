"use client";

import { useEffect, useState } from "react";

type ManifestFile = {
  path: string;
  name: string;
  targetPath: string;
};

type ManifestSection = {
  id: string;
  title: string;
  files: ManifestFile[];
};

type TemplateManifest = {
  languages: {
    typescript: ManifestSection[];
    javascript: ManifestSection[];
  };
};

function languageFromPath(filePath: string): string {
  if (filePath.endsWith(".ts.ejs")) return "ts";
  if (filePath.endsWith(".js.ejs")) return "js";
  if (filePath.endsWith("Dockerfile.ejs")) return "dockerfile";
  if (filePath.endsWith(".md.ejs")) return "md";
  if (filePath.endsWith(".json")) return "json";
  return "text";
}

function FileTree({
  title,
  sections,
  selectedPath,
  onSelect,
  isDark,
}: {
  title: string;
  sections: ManifestSection[];
  selectedPath: string;
  onSelect: (path: string) => void;
  isDark: boolean;
}) {
  return (
    <div className="space-y-2">
      <p
        className={`px-2 text-xs font-semibold ${isDark ? "text-zinc-500" : "text-stone-500"}`}
      >
        {title}
      </p>
      {sections.map((section) => (
        <div key={section.id} className="space-y-1">
          <p
            className={`px-3 text-[11px] font-semibold ${isDark ? "text-zinc-400" : "text-stone-600"}`}
          >
            {section.title}
          </p>
          {section.files.map((file) => {
            const active = selectedPath === file.path;
            return (
              <button
                key={file.path}
                type="button"
                onClick={() => onSelect(file.path)}
                className={`flex w-full items-center rounded-md px-3 py-1 text-left text-xs transition-colors ${
                  active
                    ? isDark
                      ? "bg-blue-950/60 text-blue-300"
                      : "bg-blue-50 text-blue-700"
                    : isDark
                      ? "text-zinc-300 hover:bg-zinc-800"
                      : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {file.name}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function TemplatePreviewsSection({ isDark }: { isDark: boolean }) {
  const [manifest, setManifest] = useState<TemplateManifest | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [selectedTargetPath, setSelectedTargetPath] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [isLoadingManifest, setIsLoadingManifest] = useState(true);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const response = await fetch("/api/template-manifest", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to load template manifest");
        }

        const data = (await response.json()) as TemplateManifest;
        setManifest(data);
        const firstFile =
          data.languages.typescript[0]?.files[0] ||
          data.languages.javascript[0]?.files[0];
        setSelectedPath(firstFile?.path ?? "");
        setSelectedTargetPath(firstFile?.targetPath ?? "");
      } catch {
        setError("Could not load template manifest.");
      } finally {
        setIsLoadingManifest(false);
      }
    };

    void loadManifest();
  }, []);

  useEffect(() => {
    if (!selectedPath) {
      return;
    }

    const loadFile = async () => {
      setIsLoadingCode(true);
      try {
        const response = await fetch(
          `/api/template-source?path=${encodeURIComponent(selectedPath)}`,
          { cache: "no-store" },
        );
        if (!response.ok) {
          throw new Error("Failed to load file");
        }

        const data = (await response.json()) as { code: string };
        setSelectedCode(data.code);
      } catch {
        setSelectedCode("Failed to load file content.");
      } finally {
        setIsLoadingCode(false);
      }
    };

    void loadFile();
  }, [selectedPath]);

  return (
    <section
      id="template-previews"
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 border-t px-6 py-24 lg:px-10 ${
        isDark ? "border-white/5" : "border-stone-200"
      }`}
    >
      <h2
        className={`text-4xl font-black tracking-tighter uppercase ${isDark ? "text-white" : "text-stone-900"}`}
      >
        Template Explorer
      </h2>

      {error ? (
        <div
          className={`mt-8 rounded-2xl border p-5 ${isDark ? "border-red-500/30 bg-red-950/20 text-red-200" : "border-red-300 bg-red-50 text-red-700"}`}
        >
          {error}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside
            className={`rounded-2xl border p-3 ${isDark ? "border-white/10 bg-zinc-900/50" : "border-stone-200 bg-white"}`}
          >
            {isLoadingManifest || !manifest ? (
              <p
                className={`px-2 py-2 text-xs ${isDark ? "text-zinc-400" : "text-stone-600"}`}
              >
                Loading templates...
              </p>
            ) : (
              <div className="max-h-175 space-y-4 overflow-auto">
                <FileTree
                  title="TypeScript Template"
                  sections={manifest.languages.typescript}
                  selectedPath={selectedPath}
                  onSelect={(path) => {
                    setSelectedPath(path);
                    const file =
                      manifest.languages.typescript
                        .flatMap((section) => section.files)
                        .find((f) => f.path === path) ||
                      manifest.languages.javascript
                        .flatMap((section) => section.files)
                        .find((f) => f.path === path);
                    setSelectedTargetPath(file?.targetPath ?? "");
                  }}
                  isDark={isDark}
                />
                <FileTree
                  title="JavaScript Template"
                  sections={manifest.languages.javascript}
                  selectedPath={selectedPath}
                  onSelect={(path) => {
                    setSelectedPath(path);
                    const file =
                      manifest.languages.javascript
                        .flatMap((section) => section.files)
                        .find((f) => f.path === path) ||
                      manifest.languages.typescript
                        .flatMap((section) => section.files)
                        .find((f) => f.path === path);
                    setSelectedTargetPath(file?.targetPath ?? "");
                  }}
                  isDark={isDark}
                />
              </div>
            )}
          </aside>

          <article
            className={`overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-zinc-950" : "border-stone-200 bg-stone-50"}`}
          >
            <div
              className={`flex items-center justify-between border-b px-4 py-3 text-xs ${isDark ? "border-white/10 text-zinc-400" : "border-stone-200 text-stone-500"}`}
            >
              <span className="font-mono">
                {selectedPath || "Select a file"}
              </span>
              <span className="rounded-md border px-2 py-0.5 font-mono">
                {selectedPath ? languageFromPath(selectedPath) : "text"}
              </span>
            </div>
            <div
              className={`border-b px-4 py-2 text-[11px] ${isDark ? "border-white/10 text-zinc-500" : "border-stone-200 text-stone-500"}`}
            >
              Generated as:{" "}
              <span className="font-mono">{selectedTargetPath || "n/a"}</span>
            </div>
            <pre className="max-h-175 overflow-auto p-4 text-xs leading-relaxed">
              <code className={isDark ? "text-zinc-200" : "text-stone-800"}>
                {isLoadingCode ? "Loading file..." : selectedCode}
              </code>
            </pre>
          </article>
        </div>
      )}
    </section>
  );
}
