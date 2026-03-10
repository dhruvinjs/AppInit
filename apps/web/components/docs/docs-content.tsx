"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  if (filePath.endsWith(".ts.ejs")) return "typescript";
  if (filePath.endsWith(".js.ejs")) return "javascript";
  if (filePath.endsWith("Dockerfile.ejs")) return "dockerfile";
  if (filePath.endsWith(".md.ejs")) return "markdown";
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".ejs")) return "text";
  return "text";
}

function removeEjsExtension(filename: string): string {
  return filename.replace(/\.ejs$/, "");
}

function FileExplorer({
  sections,
  selectedPath,
  onSelect,
  isDark,
}: {
  sections: ManifestSection[];
  selectedPath: string;
  onSelect: (file: ManifestFile) => void;
  isDark: boolean;
}) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={sections[0]?.id}>
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger
            className={`text-xs font-semibold py-2 ${isDark ? "text-zinc-300 hover:text-white" : "text-stone-700 hover:text-stone-900"}`}
          >
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-0.5 pl-2">
              {section.files.map((file) => (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => onSelect(file)}
                  className={`block w-full rounded px-2 py-1.5 text-left text-xs font-mono transition-colors ${selectedPath === file.path
                    ? isDark
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                    : isDark
                      ? "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                >
                  {removeEjsExtension(file.name)}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function CodePreview({
  selectedFile,
  highlightedCode,
  fileContent,
  isLoadingContent,
  isDark,
  mdxSource,
}: {
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  isDark: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
}) {
  return (
    <Card
      className={`h-fit overflow-hidden ${isDark ? "border-white/10 bg-zinc-950" : "border-stone-200 bg-white"
        }`}
    >
      <CardHeader
        className={`border-b pb-4 ${isDark ? "border-white/10" : "border-stone-200"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate font-mono text-sm">
              {selectedFile
                ? removeEjsExtension(selectedFile.name)
                : "Select a file"}
            </CardTitle>
            {selectedFile && (
              <CardDescription className="mt-1.5 truncate font-mono text-[11px]">
                {selectedFile.targetPath}
              </CardDescription>
            )}
          </div>
          {selectedFile && (
            <span
              className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold tracking-wide uppercase ${isDark
                ? "bg-blue-950 text-blue-300"
                : "bg-blue-50 text-blue-700"
                }`}
            >
              {languageFromPath(selectedFile.path)}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoadingContent ? (
          <div
            className={`flex items-center justify-center p-8 text-sm ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-stone-50 text-stone-600"
              }`}
          >
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : selectedFile && mdxSource ? (
          <div
            className={`prose max-h-[calc(100vh-280px)] max-w-none overflow-auto px-6 py-6 text-sm ${isDark ? "prose-invert" : ""
              }`}
          >
            <MDXRemote {...mdxSource} />
          </div>
        ) : selectedFile && highlightedCode ? (
          <div
            className={`shiki-wrapper max-h-[calc(100vh-280px)] overflow-auto p-6 text-sm leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent [&_code]:text-xs [&_code]:font-mono ${isDark ? "dark" : "light"
              }`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : selectedFile ? (
          <pre
            className={`max-h-[calc(100vh-280px)] overflow-auto p-6 text-xs leading-relaxed ${isDark ? "bg-zinc-900 text-zinc-200" : "bg-stone-50 text-stone-800"
              }`}
          >
            <code>{fileContent}</code>
          </pre>
        ) : (
          <div
            className={`flex flex-col items-center justify-center p-12 text-center ${isDark ? "bg-zinc-900 text-zinc-500" : "bg-stone-50 text-stone-500"
              }`}
          >
            <svg
              className="mb-3 h-12 w-12 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm font-medium">
              No file selected
            </p>
            <p className="mt-1 text-xs opacity-50">
              Choose a file from the list to view its code
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TemplateViewer({
  sections,
  selectedFile,
  highlightedCode,
  fileContent,
  isLoadingContent,
  isDark,
  mdxSource,
  onSelectFile,
}: {
  sections: ManifestSection[];
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  isDark: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
  onSelectFile: (file: ManifestFile) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <Card
        className={`sticky top-20 h-fit ${isDark
          ? "border-white/10 bg-zinc-900/50"
          : "border-stone-200 bg-stone-50"
        }`}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            Files
          </CardTitle>
          <CardDescription className="text-xs">
            Select to view source
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-250px)] overflow-auto">
          <FileExplorer
            sections={sections}
            selectedPath={selectedFile?.path ?? ""}
            onSelect={onSelectFile}
            isDark={isDark}
          />
        </CardContent>
      </Card>

      <CodePreview
        selectedFile={selectedFile}
        highlightedCode={highlightedCode}
        fileContent={fileContent}
        isLoadingContent={isLoadingContent}
        isDark={isDark}
        mdxSource={mdxSource}
      />
    </div>
  );
}

export function DocsContent({ 
  isDark,
  activeTemplate,
  selectedFile,
  onSelectFile,
  isFileSelector = false
}: { 
  isDark: boolean;
  activeTemplate?: string;
  selectedFile?: any;
  onSelectFile?: (file: any) => void;
  isFileSelector?: boolean;
}) {
  const [manifest, setManifest] = useState<TemplateManifest | null>(null);
  const [internalSelectedFile, setInternalSelectedFile] = useState<ManifestFile | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );
  const [isLoadingManifest, setIsLoadingManifest] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>(activeTemplate || "typescript");
  
  // Use passed selectedFile if in file selector mode, otherwise use internal state
  const currentSelectedFile = isFileSelector && selectedFile ? selectedFile : internalSelectedFile;

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
      } catch {
        setError("Could not load template manifest.");
      } finally {
        setIsLoadingManifest(false);
      }
    };

    void loadManifest();
  }, []);

  const loadFileContent = async (file: ManifestFile) => {
    setSelectedFile(file);
    setIsLoadingContent(true);
    setHighlightedCode("");
    setMdxSource(null);
    try {
      const response = await fetch(
        `/api/template-source?path=${encodeURIComponent(file.path)}`,
        { cache: "no-store" },
      );
      if (!response.ok) {
        throw new Error("Failed to load file");
      }
      const data = (await response.json()) as { code: string };
      setFileContent(data.code);

      // Check if it's a README file - render as MDX
      if (file.path.includes("Readme.md")) {
        const mdxResult = await serialize(data.code, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: {
                    dark: "github-dark",
                    light: "github-light",
                  },
                },
              ],
            ],
          },
        });
        setMdxSource(mdxResult);
      } else {
        // Syntax highlight the code
        const language = languageFromPath(file.path);
        const html = await codeToHtml(data.code, {
          lang: language,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          defaultColor: false,
        });
        setHighlightedCode(html);
      }
    } catch {
      setFileContent("Failed to load file content.");
      setHighlightedCode("");
      setMdxSource(null);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear selected file when switching tabs
    setSelectedFile(null);
    setFileContent("");
    setHighlightedCode("");
    setMdxSource(null);
  };

  return (
    <section
      id="docs-content"
      className={`relative z-10 w-full`}
    >
      <div className="space-y-8">
        {error ? (
          <div
            className={`rounded-lg border p-4 ${
              isDark
                ? "border-red-500/30 bg-red-950/20"
                : "border-red-300 bg-red-50"
            }`}
          >
            <p className={isDark ? "text-red-200" : "text-red-700"}>
              {error}
            </p>
          </div>
        ) : isLoadingManifest ? (
          <div
            className={`rounded-lg border p-6 ${
              isDark
                ? "border-white/10 bg-zinc-900/40"
                : "border-stone-200 bg-stone-50"
            }`}
          >
            <p className={isDark ? "text-zinc-400" : "text-stone-600"}>
              Loading templates...
            </p>
          </div>
        ) : manifest ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <label
                htmlFor="language-select"
                className={`text-sm font-semibold ${isDark ? "text-zinc-300" : "text-stone-700"}`}
              >
                Select Template:
              </label>
              <select
                id="language-select"
                value={activeTab}
                onChange={(e) => handleTabChange(e.target.value)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isDark
                    ? "border-white/10 bg-zinc-900 text-white hover:border-white/20"
                    : "border-stone-200 bg-white text-stone-900 hover:border-stone-300"
                }`}
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            <TemplateViewer
              sections={activeTab === "typescript" ? manifest.languages.typescript : manifest.languages.javascript}
              selectedFile={selectedFile}
              highlightedCode={highlightedCode}
              fileContent={fileContent}
              isLoadingContent={isLoadingContent}
              isDark={isDark}
              mdxSource={mdxSource}
              onSelectFile={loadFileContent}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
