"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
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
import { codeToHtml } from "shiki";

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
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger
            className={`text-sm font-semibold ${isDark ? "text-zinc-200" : "text-stone-900"}`}
          >
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pl-2">
              {section.files.map((file) => (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => onSelect(file)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-xs transition-colors ${
                    selectedPath === file.path
                      ? isDark
                        ? "bg-blue-950/60 text-blue-300"
                        : "bg-blue-50 text-blue-700"
                      : isDark
                        ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <div className="font-mono">
                    {removeEjsExtension(file.name)}
                  </div>
                  <div
                    className={`mt-0.5 text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}
                  >
                    → {file.targetPath}
                  </div>
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
      className={`h-fit ${
        isDark ? "border-white/10 bg-zinc-950" : "border-stone-200 bg-stone-50"
      }`}
    >
      <CardHeader
        className="border-b pb-4"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 truncate font-mono text-sm">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {selectedFile
                ? removeEjsExtension(selectedFile.name)
                : "No file selected"}
            </CardTitle>
            {selectedFile && (
              <CardDescription className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px]">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                {selectedFile.targetPath}
              </CardDescription>
            )}
          </div>
          {selectedFile && (
            <span
              className={`shrink-0 rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
                isDark
                  ? "border-white/20 bg-zinc-900 text-zinc-400"
                  : "border-stone-300 bg-white text-stone-600"
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
            className={`flex items-center justify-center p-12 text-sm ${
              isDark ? "text-zinc-400" : "text-stone-600"
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
            Loading file content...
          </div>
        ) : selectedFile && mdxSource ? (
          <div
            className={`prose max-h-[calc(100vh-280px)] max-w-none overflow-auto px-8 py-6 ${
              isDark ? "prose-invert" : ""
            }`}
          >
            <MDXRemote {...mdxSource} />
          </div>
        ) : selectedFile && highlightedCode ? (
          <div
            className={`shiki-wrapper max-h-[calc(100vh-280px)] overflow-auto ${
              isDark ? "dark" : "light"
            }`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : selectedFile ? (
          <pre
            className={`max-h-[calc(100vh-280px)] overflow-auto p-6 text-xs leading-relaxed ${
              isDark ? "bg-black text-zinc-200" : "bg-white text-stone-800"
            }`}
          >
            <code>{fileContent}</code>
          </pre>
        ) : (
          <div
            className={`flex flex-col items-center justify-center p-16 text-center ${
              isDark ? "text-zinc-500" : "text-stone-500"
            }`}
          >
            <svg
              className="mb-4 h-16 w-16 opacity-20"
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
              Select a file to view its contents
            </p>
            <p className="mt-1 text-xs opacity-60">
              Choose from the file explorer on the left
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DocsContent({ isDark }: { isDark: boolean }) {
  const [manifest, setManifest] = useState<TemplateManifest | null>(null);
  const [selectedFile, setSelectedFile] = useState<ManifestFile | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );
  const [isLoadingManifest, setIsLoadingManifest] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("typescript");

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
      className={`relative z-10 mx-auto w-full max-w-350 scroll-mt-24 px-6 pb-20 lg:px-10`}
    >
      <div className="space-y-8">
        {error ? (
          <Card
            className={
              isDark
                ? "border-red-500/30 bg-red-950/20"
                : "border-red-300 bg-red-50"
            }
          >
            <CardContent className="pt-6">
              <p className={isDark ? "text-red-200" : "text-red-700"}>
                {error}
              </p>
            </CardContent>
          </Card>
        ) : isLoadingManifest ? (
          <Card
            className={
              isDark
                ? "border-white/10 bg-zinc-900/40"
                : "border-stone-200 bg-white"
            }
          >
            <CardContent className="pt-6">
              <p className={isDark ? "text-zinc-400" : "text-stone-600"}>
                Loading templates...
              </p>
            </CardContent>
          </Card>
        ) : manifest ? (
          <>
            <div className="text-center">
              <h2
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-stone-900"}`}
              >
                Browse Templates
              </h2>
              <p
                className={`mt-2 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}
              >
                Select a language tab and explore the template files
              </p>
            </div>

            <Tabs
              defaultValue="typescript"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex justify-center">
                <TabsList
                  className={`inline-flex ${isDark ? "bg-zinc-900/50" : "bg-stone-100"}`}
                >
                  <TabsTrigger value="typescript" className="gap-2">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                    </svg>
                    TypeScript
                  </TabsTrigger>
                  <TabsTrigger value="javascript" className="gap-2">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                    </svg>
                    JavaScript
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="typescript" className="mt-8">
                <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
                  <Card
                    className={`sticky top-6 h-fit ${
                      isDark
                        ? "border-white/10 bg-zinc-900/40"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                        TypeScript Files
                      </CardTitle>
                      <CardDescription>
                        Select a file to view its contents
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[calc(100vh-200px)] overflow-auto">
                      <FileExplorer
                        sections={manifest.languages.typescript}
                        selectedPath={selectedFile?.path ?? ""}
                        onSelect={loadFileContent}
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
              </TabsContent>

              <TabsContent value="javascript" className="mt-8">
                <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
                  <Card
                    className={`sticky top-6 h-fit ${
                      isDark
                        ? "border-white/10 bg-zinc-900/40"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                        JavaScript Files
                      </CardTitle>
                      <CardDescription>
                        Select a file to view its contents
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[calc(100vh-200px)] overflow-auto">
                      <FileExplorer
                        sections={manifest.languages.javascript}
                        selectedPath={selectedFile?.path ?? ""}
                        onSelect={loadFileContent}
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
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </div>
    </section>
  );
}
