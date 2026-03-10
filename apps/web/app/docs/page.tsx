"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Code2, FileCode, Terminal, Database, Box, Layers, ChevronDown, ChevronRight, Settings, FileText } from "lucide-react";
import { DocsContent } from "@/components/docs/docs-content";

const NAV_ITEMS = [
  { id: "TypeScript", icon: Code2, label: "TypeScript", category: "TEMPLATES" },
  { id: "JavaScript", icon: FileCode, label: "JavaScript", category: "TEMPLATES" },
  { id: "WebSockets", icon: Terminal, label: "WebSockets", category: "TEMPLATES" },
  { id: "Database Support", icon: Database, label: "Database Support", category: "FEATURES" },
  { id: "Docker", icon: Box, label: "Docker", category: "FEATURES" },
];

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [activeTemplate, setActiveTemplate] = useState("TypeScript");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  return (
    <div className={`flex h-screen ${isDark ? "bg-[#0a0a0a]" : "bg-white"} text-zinc-300 font-sans antialiased overflow-hidden`}>
      
      {/* Global Sidebar (Left) */}
      <aside className={`w-64 border-r flex flex-col shrink-0 ${isDark ? "border-zinc-800/50 bg-[#0d0d0d]" : "border-stone-200 bg-stone-50"}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Layers size={18} className="text-white" />
            </div>
            <h1 className={`font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>AppInit</h1>
          </div>

          <nav className="space-y-6">
            <div>
              <p className={`text-[10px] font-bold tracking-widest mb-4 ${isDark ? "text-zinc-500" : "text-stone-500"}`}>TEMPLATES</p>
              <div className="space-y-1">
                {NAV_ITEMS.filter(n => n.category === "TEMPLATES").map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTemplate(item.id);
                      setSelectedFile(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeTemplate === item.id 
                        ? isDark 
                          ? "bg-zinc-800 text-white shadow-sm" 
                          : "bg-blue-100 text-blue-900"
                        : isDark
                        ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={`text-[10px] font-bold tracking-widest mb-4 ${isDark ? "text-zinc-500" : "text-stone-500"}`}>FEATURES</p>
              <div className="space-y-1">
                {NAV_ITEMS.filter(n => n.category === "FEATURES").map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTemplate(item.id);
                      setSelectedFile(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeTemplate === item.id 
                        ? isDark 
                          ? "bg-zinc-800 text-white" 
                          : "bg-blue-100 text-blue-900"
                        : isDark
                        ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <header className={`h-14 border-b flex items-center justify-between px-8 backdrop-blur-sm ${isDark ? "border-zinc-800/50 bg-[#0d0d0d]/50" : "border-stone-200 bg-stone-50/50"}`}>
          <div className="flex items-center gap-4">
            <span className={`text-xs ${isDark ? "text-zinc-500" : "text-stone-500"}`}>Workspace / {activeTemplate}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
              Explore
            </button>
          </div>
        </header>

        <div className="flex-1 flex p-6 gap-6 overflow-hidden">
          
          {/* File Tree Explorer */}
          <div className={`w-80 flex flex-col rounded-xl overflow-hidden shadow-2xl border ${isDark ? "bg-[#111111] border-zinc-800/50" : "bg-white border-stone-200"}`}>
            <div className={`p-4 border-b flex items-center justify-between ${isDark ? "border-zinc-800/50 bg-[#141414]" : "border-stone-200 bg-stone-50"}`}>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>Files</h3>
                <p className={`text-[10px] ${isDark ? "text-zinc-500" : "text-stone-500"}`}>Project structure for {activeTemplate}</p>
              </div>
              <Settings size={14} className={`cursor-pointer transition-colors ${isDark ? "text-zinc-600 hover:text-zinc-400" : "text-stone-600 hover:text-stone-400"}`} />
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <DocsContent isDark={isDark} activeTemplate={activeTemplate} selectedFile={selectedFile} onSelectFile={setSelectedFile} isFileSelector={true} />
            </div>
          </div>

          {/* Code Viewer */}
          <div className={`flex-1 flex flex-col rounded-xl overflow-hidden shadow-2xl border ${isDark ? "bg-[#111111] border-zinc-800/50" : "bg-white border-stone-200"}`}>
            <div className={`h-12 border-b px-4 flex items-center ${isDark ? "border-zinc-800/50 bg-[#141414]" : "border-stone-200 bg-stone-50"}`}>
              <div className="flex items-center gap-2">
                <FileCode size={14} className={isDark ? "text-zinc-500" : "text-stone-500"} />
                <span className={`text-xs font-mono ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
                  {selectedFile ? selectedFile.name : "Select a file to view code"}
                </span>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-auto">
              {selectedFile ? (
                <div className={`w-full h-full p-6 font-mono text-sm overflow-auto ${isDark ? "bg-[#0a0a0a]" : "bg-stone-50"}`}>
                  <div className={isDark ? "text-zinc-600" : "text-stone-600"}>
                    {/* Placeholder code display */}
                    <div className="space-y-1">
                      {[...Array(25)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <span className={`w-8 text-right pr-2 opacity-30 select-none ${isDark ? "text-zinc-700" : "text-stone-400"}`}>{i + 1}</span>
                          <span className={i === 0 ? "text-blue-400" : i % 3 === 0 ? "text-purple-400" : isDark ? "text-zinc-400" : "text-stone-700"}>
                            {i === 0 ? `// Source code for ${selectedFile.name}` : `const data${i} = fetchSomething("${activeTemplate.toLowerCase()}");`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center opacity-40">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? "bg-zinc-800" : "bg-stone-200"}`}>
                    <FileText size={32} />
                  </div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-stone-900"}`}>No file selected</h4>
                  <p className={`text-sm max-w-[240px] mt-2 ${isDark ? "text-zinc-500" : "text-stone-500"}`}>
                    Choose a file from the explorer on the left to inspect its contents.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
