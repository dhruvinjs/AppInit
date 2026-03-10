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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = item.type === "folder";
  const isSelected = selectedId === item.id;

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
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
        onClick={toggleOpen}
        className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors ${
          isSelected
            ? "bg-blue-500/20 text-blue-400"
            : "text-zinc-400 hover:text-zinc-200"
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
              className={isSelected ? "text-blue-400" : "text-zinc-500"}
            />
          )}
        </span>
        {isFolder && <Folder size={16} className="mr-2 text-amber-400/80" />}
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
}: {
  sections: ManifestSection[];
  selectedPath: string;
  onSelect: (file: ManifestFile) => void;
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
}: {
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#111111] border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="h-12 border-b border-zinc-800/50 bg-[#141414] px-4 flex items-center">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-zinc-500" />
          <span className="text-xs font-mono text-zinc-400">
            {selectedFile
              ? removeEjsExtension(selectedFile.name)
              : "Select a file to view code"}
          </span>
          {selectedFile && (
            <>
              <span className="text-zinc-700">→</span>
              <span className="text-[10px] font-mono text-zinc-500">
                {selectedFile.targetPath}
              </span>
            </>
          )}
        </div>
        {selectedFile && (
          <span className="ml-auto shrink-0 rounded px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase bg-blue-950 text-blue-300">
            {languageFromPath(selectedFile.path)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-auto">
        {isLoadingContent ? (
          <div className="flex items-center text-zinc-400 text-sm">
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
          <div className="w-full h-full prose prose-invert max-w-none overflow-auto px-6 py-6 text-sm">
            <MDXRemote {...mdxSource} />
          </div>
        ) : selectedFile && highlightedCode ? (
          <div
            className="w-full h-full p-6 font-mono text-sm overflow-auto [&_pre]:bg-transparent! [&_pre]:p-0! [&_code]:bg-transparent! [&_code]:text-xs [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : selectedFile ? (
          <pre className="w-full h-full overflow-auto p-6 text-xs leading-relaxed bg-zinc-900 text-zinc-200">
            <code>{fileContent}</code>
          </pre>
        ) : (
          <div className="flex flex-col items-center text-center opacity-40">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h4 className="text-lg font-medium text-white">No file selected</h4>
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
}: {
  sections: ManifestSection[];
  selectedFile: ManifestFile | null;
  highlightedCode: string;
  fileContent: string;
  isLoadingContent: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
  onSelectFile: (file: ManifestFile) => void;
}) {
  return (
    <div className="flex gap-6 h-full">
      {/* File Tree Explorer */}
      <div className="w-80 flex flex-col bg-[#111111] border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between bg-[#141414]">
          <div>
            <h3 className="text-sm font-semibold text-white">Files</h3>
            <p className="text-[10px] text-zinc-500">Project structure</p>
          </div>
          <Settings
            size={14}
            className="text-zinc-600 cursor-pointer hover:text-zinc-400"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <FileExplorer
            sections={sections}
            selectedPath={selectedFile?.path ?? ""}
            onSelect={onSelectFile}
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
      // Show database-related files
      const dbSection = manifest.languages[lang].find(
        (s) => s.id === "rest_api"
      );
      const commonDbFile: ManifestFile = {
        path: "base/common/db.ejs",
        name: "db.ejs",
        targetPath: lang === "typescript" ? "src/config/db.ts" : "src/config/db.js",
      };

      const dbConfigFiles = dbSection
        ? dbSection.files.filter((f) => f.name.includes("db"))
        : [];

      return [
        {
          id: "database_common",
          title: "Common Database Config",
          files: [commonDbFile],
        },
        ...(dbConfigFiles.length > 0
          ? [
              {
                id: "database_specific",
                title: `${lang === "typescript" ? "TypeScript" : "JavaScript"} Database Config`,
                files: dbConfigFiles,
              },
            ]
          : []),
      ];
    }

    if (activeSection === "docker") {
      // Show Docker section with both languages organized
      const tsDockerSection = manifest.languages.typescript.find(
        (s) => s.id === "docker"
      );
      const jsDockerSection = manifest.languages.javascript.find(
        (s) => s.id === "docker"
      );

      // If a language is selected, show only that language's Docker files
      if (lang === "typescript" && tsDockerSection) {
        return [
          {
            id: "docker_typescript",
            title: "TypeScript Dockerfile",
            files: tsDockerSection.files,
          },
        ];
      } else if (lang === "javascript" && jsDockerSection) {
        return [
          {
            id: "docker_javascript",
            title: "JavaScript Dockerfile",
            files: jsDockerSection.files,
          },
        ];
      }
      return [];
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
      <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  if (isLoadingManifest) {
    return (
      <div className="flex items-center justify-center p-12 text-zinc-400">
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
  // Language selector removed - language now controlled by sidebar navigation

  // Get section description
  const getSectionDescription = () => {
    if (activeSection === "database") {
      return {
        title: "Database Support",
        description:
          `StackForge includes built-in support for MongoDB (with Mongoose) and PostgreSQL (with Prisma). Configuration files for ${activeTab === "typescript" ? "TypeScript" : "JavaScript"} shown below. The database setup dynamically adapts based on your selection during project initialization.`,
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
        <div className="bg-[#111111] border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">
            {sectionInfo.title}
          </h2>
          <p className="text-zinc-400 text-sm">
            {sectionInfo.description}
          </p>
        </div>
      )}



      {/* Template Viewer */}
      <div className="flex-1 min-h-0">
        {sections.length > 0 ? (
          <TemplateViewer
            sections={sections}
            selectedFile={selectedFile}
            highlightedCode={highlightedCode}
            fileContent={fileContent}
            isLoadingContent={isLoadingContent}
            mdxSource={mdxSource}
            onSelectFile={loadFileContent}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No files available for this section.
          </div>
        )}
      </div>
    </div>
  );
}
