"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { codeToHtml } from "shiki";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  FileCode,
  Settings,
} from "lucide-react";

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

// Tree item component for file/folder display
function TreeItem({
  item,
  depth = 0,
  onSelect,
  selectedId,
  isDark,
}: {
  item: {
    id: string;
    name: string;
    type: "file" | "folder";
    children?: ManifestFile[];
  };
  depth?: number;
  onSelect: (file: ManifestFile) => void;
  selectedId: string;
  isDark: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = item.type === "folder";
  const isSelected = selectedId === item.id;
  const hoverBg = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.04)";

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if ('path' in item && 'targetPath' in item) {
      onSelect(item as ManifestFile);
    }
  };

  return (
    <div className="select-none">
      <motion.div
        whileHover={{ backgroundColor: hoverBg }}
        onClick={toggleOpen}
        className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors ${
          isSelected
            ? isDark
              ? "bg-blue-500/20 text-blue-300"
              : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
            : isDark
            ? "text-zinc-400 hover:text-zinc-200"
            : "text-stone-600 hover:text-stone-900"
        }`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="mr-2">
          {isFolder ? (
            isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : (
            <FileText
              size={16}
              className={
                isSelected
                  ? isDark
                    ? "text-blue-300"
                    : "text-blue-600"
                  : isDark
                  ? "text-zinc-500"
                  : "text-stone-400"
              }
            />
          )}
        </span>
        {isFolder && (
          <Folder
            size={16}
            className={`mr-2 ${isDark ? "text-amber-400/80" : "text-amber-500"}`}
          />
        )}
        <span className="text-sm font-medium">{item.name}</span>
      </motion.div>

      <AnimatePresence>
        {isFolder && isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <TreeItem
                key={child.path}
                item={{
                  ...child,
                  id: child.path,
                  name: removeEjsExtension(child.name),
                  type: "file" as const,
                }}
                depth={depth + 1}
                onSelect={onSelect}
                selectedId={selectedId}
                isDark={isDark}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
    <div className="space-y-1">
      {sections.map((section) => (
        <TreeItem
          key={section.id}
          item={{
            id: section.id,
            name: section.title,
            type: "folder",
            children: section.files,
          }}
          onSelect={onSelect}
          selectedId={selectedPath}
          isDark={isDark}
        />
      ))}
    </div>
  );
}

function CodePreview({
  selectedFile,
  highlightedCode,
  fileContent,
  isLoadingContent,
  mdxSource,
  isDark,
}: {
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
  isDark: boolean;
}) {
  return (
    <div
      className={`flex-1 flex flex-col rounded-xl overflow-hidden ${
        isDark
          ? "bg-[#111111] border border-zinc-800/50 shadow-2xl"
          : "bg-white border border-stone-200 shadow-sm"
      }`}
    >
      {/* Header */}
      <div
        className={`h-12 border-b px-4 flex items-center ${
          isDark
            ? "border-zinc-800/50 bg-gradient-to-b from-[#151515] to-[#101010]"
            : "border-stone-200 bg-gradient-to-b from-white to-stone-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <FileCode
            size={14}
            className={isDark ? "text-zinc-500" : "text-stone-400"}
          />
          <span
            className={`text-xs font-mono ${
              isDark ? "text-zinc-400" : "text-stone-600"
            }`}
          >
            {selectedFile
              ? removeEjsExtension(selectedFile.name)
              : "Select a file to view code"}
          </span>
          {selectedFile && (
            <>
              <span className={isDark ? "text-zinc-700" : "text-stone-300"}>
                →
              </span>
              <span
                className={`text-[10px] font-mono ${
                  isDark ? "text-zinc-500" : "text-stone-500"
                }`}
              >
                {selectedFile.targetPath}
              </span>
            </>
          )}
        </div>
        {selectedFile && (
          <span
            className={`ml-auto shrink-0 rounded px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase ${
              isDark
                ? "bg-blue-950 text-blue-300"
                : "bg-blue-50 text-blue-700 border border-blue-100"
            }`}
          >
            {languageFromPath(selectedFile.path)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-auto">
        {isLoadingContent ? (
          <div
            className={`flex items-center text-sm ${
              isDark ? "text-zinc-400" : "text-stone-500"
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
            className={`w-full h-full max-w-none overflow-auto px-6 py-6 text-sm ${
              isDark ? "prose prose-invert" : "prose prose-stone"
            }`}
          >
            <MDXRemote {...mdxSource} />
          </div>
        ) : selectedFile && highlightedCode ? (
          <div
            className="w-full h-full p-6 font-mono text-sm overflow-auto [&_pre]:bg-transparent! [&_pre]:p-0! [&_code]:bg-transparent! [&_code]:text-xs [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : selectedFile ? (
          <pre
            className={`w-full h-full overflow-auto p-6 text-xs leading-relaxed ${
              isDark
                ? "bg-zinc-900 text-zinc-200"
                : "bg-stone-50 text-stone-800 border border-stone-200"
            }`}
          >
            <code>{fileContent}</code>
          </pre>
        ) : (
          <div className="flex flex-col items-center text-center opacity-50">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ring-1 ${
                isDark
                  ? "bg-gradient-to-br from-zinc-800 to-zinc-900 ring-white/5"
                  : "bg-gradient-to-br from-white to-stone-100 ring-stone-200"
              }`}
            >
              <FileText size={32} />
            </div>
            <h4
              className={`text-lg font-medium ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              No file selected
            </h4>
            <p className="text-sm max-w-60 mt-2">
              Choose a file from the explorer on the left to inspect its contents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateViewer({
  sections,
  selectedFile,
  highlightedCode,
  fileContent,
  isLoadingContent,
  mdxSource,
  onSelectFile,
  isDark,
}: {
  sections: ManifestSection[];
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
  onSelectFile: (file: ManifestFile) => void;
  isDark: boolean;
}) {
  return (
    <div className="flex gap-6 h-full">
      {/* File Tree Explorer */}
      <div
        className={`w-80 flex flex-col rounded-xl overflow-hidden ${
          isDark
            ? "bg-[#111111] border border-zinc-800/50 shadow-2xl"
            : "bg-white border border-stone-200 shadow-sm"
        }`}
      >
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark
              ? "border-zinc-800/50 bg-gradient-to-b from-[#151515] to-[#101010]"
              : "border-stone-200 bg-gradient-to-b from-white to-stone-50"
          }`}
        >
          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Files
            </h3>
            <p className={`text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
              Project structure
            </p>
          </div>
          <Settings
            size={14}
            className={`cursor-pointer ${
              isDark
                ? "text-zinc-600 hover:text-zinc-400"
                : "text-stone-400 hover:text-stone-600"
            }`}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <FileExplorer
            sections={sections}
            selectedPath={selectedFile?.path ?? ""}
            onSelect={onSelectFile}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Code Viewer */}
      <CodePreview
        selectedFile={selectedFile}
        highlightedCode={highlightedCode}
        fileContent={fileContent}
        isLoadingContent={isLoadingContent}
        mdxSource={mdxSource}
        isDark={isDark}
      />
    </div>
  );
}

export function DocsContent({
  isDark,
  activeSection,
}: {
  isDark: boolean;
  activeSection: string;
}) {
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
  
  // Maintain language state, update when typescript/javascript sections are selected
  const [currentLanguage, setCurrentLanguage] = useState<"typescript" | "javascript">("typescript");
  
  // Update language when typescript or javascript section is selected
  useEffect(() => {
    if (activeSection === "javascript") {
      setCurrentLanguage("javascript");
    } else if (activeSection === "typescript") {
      setCurrentLanguage("typescript");
    }
    // For other sections (docker, database, websockets), keep the current language
  }, [activeSection]);
  
  const activeTab = currentLanguage;

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

  // Reset selected file when activeSection changes
  useEffect(() => {
    setSelectedFile(null);
    setFileContent("");
    setHighlightedCode("");
    setMdxSource(null);
  }, [activeSection]);

  // Get sections based on active section
  const getSections = (): ManifestSection[] => {
    if (!manifest) return [];

    const lang = activeTab === "typescript" ? "typescript" : "javascript";

    // Handle special sections
    if (activeSection === "database") {
      return [];
    }

    if (activeSection === "docker") {
      const findDockerFiles = (sections: ManifestSection[]) =>
        sections
          .flatMap((section) => section.files)
          .filter(
            (file) =>
              /dockerfile/i.test(file.name) ||
              /docker/i.test(file.path) ||
              /docker/i.test(file.targetPath),
          );

      const tsDockerSection = manifest.languages.typescript.find(
        (s) => s.id === "docker",
      );
      const jsDockerSection = manifest.languages.javascript.find(
        (s) => s.id === "docker",
      );

      const tsDockerFiles =
        tsDockerSection?.files?.length
          ? tsDockerSection.files
          : findDockerFiles(manifest.languages.typescript);
      const jsDockerFiles =
        jsDockerSection?.files?.length
          ? jsDockerSection.files
          : findDockerFiles(manifest.languages.javascript);

      const sectionsOut: ManifestSection[] = [];

      if (tsDockerFiles.length > 0) {
        sectionsOut.push({
          id: "docker_typescript",
          title: "TypeScript Dockerfile",
          files: tsDockerFiles,
        });
      }
      if (jsDockerFiles.length > 0) {
        sectionsOut.push({
          id: "docker_javascript",
          title: "JavaScript Dockerfile",
          files: jsDockerFiles,
        });
      }

      return sectionsOut;
    }

    if (activeSection === "websockets") {
      // Show WebSocket sections
      return manifest.languages[lang].filter(
        (s) => s.id.includes("websocket")
      );
    }

    // For TypeScript and JavaScript, show all sections
    return manifest.languages[lang];
  };

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

  // Removed handleTabChange - language now controlled by sidebar navigation

  if (error) {
    return (
      <div
        className={`rounded-lg border p-4 ${
          isDark
            ? "border-red-500/30 bg-red-950/20 text-red-200"
            : "border-red-200 bg-red-50 text-red-700"
        }`}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (isLoadingManifest) {
    return (
      <div
        className={`flex items-center justify-center p-12 ${
          isDark ? "text-zinc-400" : "text-stone-500"
        }`}
      >
        <svg
          className="mr-2 h-5 w-5 animate-spin"
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
        Loading templates...
      </div>
    );
  }

  if (!manifest) {
    return null;
  }

  const sections = getSections();
  const templateMotionKey = `${activeSection}-${activeTab}`;
  // Language selector removed - language now controlled by sidebar navigation

  // Get section description
  const getSectionDescription = () => {
    if (activeSection === "database") {
      return {
        title: "Database Support",
        description:
          `AppInit includes built-in support for MongoDB (with Mongoose) and PostgreSQL (with Prisma). Configuration files for ${activeTab === "typescript" ? "TypeScript" : "JavaScript"} shown below. The database setup dynamically adapts based on your selection during project initialization.`,
        features: [
          "MongoDB with Mongoose ORM",
          "PostgreSQL with Prisma ORM",
          "Connection pooling and error handling",
          "Environment-based configuration",
        ],
      };
    }
    if (activeSection === "docker") {
      return {
        title: "Docker Support",
        description:
          `Production-ready Dockerfile for ${activeTab === "typescript" ? "TypeScript" : "JavaScript"} templates. Includes multi-stage builds, proper caching, and security best practices. Switch languages to see different configurations.`,
        features: [
          "Multi-stage builds for optimization",
          "Node.js Alpine base image",
          "Proper layer caching",
          "Non-root user execution",
        ],
      };
    }
    if (activeSection === "websockets") {
      return {
        title: "WebSocket Support",
        description:
          "Real-time communication support with both Socket.io and native ws library implementations.",
        features: [
          "Socket.io for full-featured WebSocket",
          "Native ws for lightweight connections",
          "Ping/pong heartbeat mechanism",
          "Error handling and reconnection logic",
        ],
      };
    }
    return null;
  };

  const sectionInfo = getSectionDescription();

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Section Info */}
      {sectionInfo && (
        <div
          className={`rounded-xl p-6 ${
            isDark
              ? "bg-[#111111]/80 border border-zinc-800/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              : "bg-white/90 border border-stone-200 shadow-sm"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-2 ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            {sectionInfo.title}
          </h2>
          <p className={`text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
            {sectionInfo.description}
          </p>
          {sectionInfo.features && sectionInfo.features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {sectionInfo.features.map((feature) => (
                <span
                  key={feature}
                  className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md ${
                    isDark
                      ? "text-zinc-300 bg-zinc-900/70 border border-zinc-800/60"
                      : "text-stone-700 bg-stone-100 border border-stone-200"
                  }`}
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      )}



      {/* Template Viewer */}
      <div className="flex-1 min-h-0">
        {sections.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={templateMotionKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              <TemplateViewer
                sections={sections}
                selectedFile={selectedFile}
                highlightedCode={highlightedCode}
                fileContent={fileContent}
                isLoadingContent={isLoadingContent}
                mdxSource={mdxSource}
                onSelectFile={loadFileContent}
                isDark={isDark}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div
            className={`flex items-center justify-center h-full ${
              isDark ? "text-zinc-500" : "text-stone-500"
            }`}
          >
            No files available for this section.
          </div>
        )}
      </div>
    </div>
  );
}
