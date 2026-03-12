"use client";

import { ReactNode, useState } from "react";
import {
  BookOpen,
  Rocket,
  Layers,
  Database,
  Wifi,
  Container,
  Shield,
  Zap,
  CheckCircle2,
  Info,
  Lightbulb,
  Terminal,
  FileCode,
  GitBranch,
  Package,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Callout Component for "Why?" sections
export function Callout({
  children,
  variant = "info",
  icon: Icon,
}: {
  children: ReactNode;
  variant?: "info" | "warning" | "success" | "reasoning";
  icon?: React.ElementType;
}) {
  const styles = {
    info:
      "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-200",
    warning:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-200",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-200",
    reasoning:
      "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-500/30 dark:bg-purple-950/20 dark:text-purple-200",
  };

  const icons = {
    info: Info,
    warning: Lightbulb,
    success: CheckCircle2,
    reasoning: Lightbulb,
  };

  const IconComponent = Icon || icons[variant];

  return (
    <div
      className={`rounded-lg border p-4 my-4 flex gap-3 ${styles[variant]}`}
    >
      <IconComponent className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// Code Block Component
export function CodeBlock({
  code,
  language = "bash",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative rounded-lg border border-stone-200 dark:border-zinc-800/50 bg-stone-50 dark:bg-[#0d0d0d] overflow-hidden my-4 transition-all hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-sm">
      <div className="px-4 py-2 border-b border-stone-200 dark:border-zinc-800/50 flex items-center justify-between gap-2 bg-stone-100/90 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-stone-500 dark:text-zinc-500" />
          <span className="text-xs font-mono text-stone-600 dark:text-zinc-400">
            {title ?? language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-stone-200 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-600 dark:text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-stone-900 dark:hover:text-white"
          aria-label="Copy command"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-stone-700 dark:text-zinc-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function AnimatedTabPanel({
  children,
  panelKey,
}: {
  children: ReactNode;
  panelKey: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panelKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Feature Grid Component
export function FeatureGrid({ features }: { features: Array<{ icon: React.ElementType; title: string; description: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-stone-200 dark:border-zinc-800/50 bg-stone-50 dark:bg-zinc-900/30 p-4 hover:bg-stone-100 dark:hover:bg-zinc-900/50 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <feature.icon size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-1">
                {feature.title}
              </h4>
              <p className="text-stone-500 dark:text-zinc-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Section Component
export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
        {title}
      </h2>
      <div className="text-stone-700 dark:text-zinc-300 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

// Introduction Section
export function IntroductionSection() {
  return (
    <DocSection id="introduction" title="Introduction">
      <p className="text-lg text-stone-700 dark:text-zinc-200">
        AppInit is a <strong>type-safe, production-ready Express backend starter</strong> that
        eliminates boilerplate while maintaining full control over your architecture.
      </p>
      
      <Callout variant="reasoning">
        <strong>The Reality Check:</strong> Most Express starters give you a folder
        structure and leave you to figure out TypeScript configuration, database setup,
        WebSocket integration, and deployment. AppInit is different—it's opinionated
        where it matters (type safety, security) and flexible where you need it
        (database choice, WebSocket library).
      </Callout>

      <FeatureGrid
        features={[
          {
            icon: Zap,
            title: "Zero to Production in Minutes",
            description:
              "Complete Express setup with TypeScript, ESLint, Prettier, and environment configuration—all working together from the start.",
          },
          {
            icon: Shield,
            title: "Security by Default",
            description:
              "Helmet.js for HTTP headers, CORS configuration, JWT middleware, and zod validation built-in.",
          },
          {
            icon: Database,
            title: "Type-Safe Database Access",
            description:
              "Choose MongoDB (Mongoose) or PostgreSQL (Prisma) with full TypeScript inference across your entire stack.",
          },
          {
            icon: Wifi,
            title: "Real-Time Ready",
            description:
              "Optional WebSocket support (Socket.io or ws) with proper TypeScript types and connection management.",
          },
        ]}
      />

      <h3 id="what-is-appinit" className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        What is AppInit?
      </h3>
      <p>
        AppInit is a CLI tool that scaffolds Express.js applications with modern best
        practices. Unlike generic templates, it asks you intelligent questions and
        generates a codebase tailored to your specific needs—without unnecessary
        dependencies or unused code.
      </p>

      <h3 id="why-choose" className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        Why Choose AppInit?
      </h3>
      <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-zinc-300">
        <li>
          <strong>TypeScript-First:</strong> Full type safety from database to API response
        </li>
        <li>
          <strong>Production-Ready:</strong> Logging (Pino), error handling, and Docker
          configuration included
        </li>
        <li>
          <strong>Developer Experience:</strong> Hot reload, linting, formatting, and clear
          folder structure
        </li>
        <li>
          <strong>No Lock-In:</strong> Standard Express.js—eject and customize anytime
        </li>
      </ul>
    </DocSection>
  );
}

// Getting Started Section
export function GettingStartedSection() {
  return (
    <DocSection id="getting-started" title="Getting Started">
      <h3 id="installation" className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
        Installation
      </h3>
      
      <p>Run AppInit with your preferred package manager (no installation required):</p>
      
      <Tabs defaultValue="npx" className="my-4">
        <TabsList>
          <TabsTrigger value="npx">npm</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="yarn">Yarn</TabsTrigger>
        </TabsList>
        <TabsContent value="npx">
          <CodeBlock
            code={`npx @dhruvinjs/appinit my-backend`}
            title="Quick Start with npm"
          />
        </TabsContent>
        <TabsContent value="pnpm">
          <CodeBlock
            code={`pnpm dlx @dhruvinjs/appinit my-backend`}
            title="Quick Start with pnpm"
          />
        </TabsContent>
        <TabsContent value="yarn">
          <CodeBlock
            code={`yarn dlx @dhruvinjs/appinit my-backend`}
            title="Quick Start with Yarn"
          />
        </TabsContent>
      </Tabs>

      <p>Or install globally for repeated use:</p>
      
      <Tabs defaultValue="npm" className="my-4">
        <TabsList>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="yarn">Yarn</TabsTrigger>
        </TabsList>
        <TabsContent value="npm">
          <CodeBlock
            code={`npm install -g @dhruvinjs/appinit
appinit my-backend`}
            title="Global Installation with npm"
          />
        </TabsContent>
        <TabsContent value="pnpm">
          <CodeBlock
            code={`pnpm add -g @dhruvinjs/appinit
appinit my-backend`}
            title="Global Installation with pnpm"
          />
        </TabsContent>
        <TabsContent value="yarn">
          <CodeBlock
            code={`yarn global add @dhruvinjs/appinit
appinit my-backend`}
            title="Global Installation with Yarn"
          />
        </TabsContent>
      </Tabs>

      <Callout variant="info">
        <strong>Interactive Mode:</strong> Run without a project name to be prompted for all options:
        <code className="text-blue-700 dark:text-blue-300"> npx @dhruvinjs/appinit</code> |
        <code className="text-blue-700 dark:text-blue-300"> pnpm dlx @dhruvinjs/appinit</code> |
        <code className="text-blue-700 dark:text-blue-300"> yarn dlx @dhruvinjs/appinit</code>
      </Callout>

      <h3 id="running" className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        Running Your Project
      </h3>

      <Tabs defaultValue="development" className="my-4">
        <TabsList>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="docker">Docker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="development">
          <AnimatedTabPanel panelKey="development">
            <Tabs defaultValue="npm" className="my-4">
              <TabsList>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="yarn">Yarn</TabsTrigger>
              </TabsList>
              <TabsContent value="npm">
                <CodeBlock
                  code={`cd my-backend
npm install
npm run dev`}
                  title="Development Mode - npm"
                />
              </TabsContent>
              <TabsContent value="pnpm">
                <CodeBlock
                  code={`cd my-backend
pnpm install
pnpm run dev`}
                  title="Development Mode - pnpm"
                />
              </TabsContent>
              <TabsContent value="yarn">
                <CodeBlock
                  code={`cd my-backend
yarn
yarn dev`}
                  title="Development Mode - Yarn"
                />
              </TabsContent>
            </Tabs>
            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
              Hot reload enabled with nodemon. Changes are reflected immediately.
            </p>
          </AnimatedTabPanel>
        </TabsContent>
        
        <TabsContent value="production">
          <AnimatedTabPanel panelKey="production">
            <Tabs defaultValue="npm" className="my-4">
              <TabsList>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="yarn">Yarn</TabsTrigger>
              </TabsList>
              <TabsContent value="npm">
                <CodeBlock
                  code={`npm run build
npm start`}
                  title="Production Build - npm"
                />
              </TabsContent>
              <TabsContent value="pnpm">
                <CodeBlock
                  code={`pnpm build
pnpm start`}
                  title="Production Build - pnpm"
                />
              </TabsContent>
              <TabsContent value="yarn">
                <CodeBlock
                  code={`yarn build
yarn start`}
                  title="Production Build - Yarn"
                />
              </TabsContent>
            </Tabs>
            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
              TypeScript is compiled to JavaScript. Run the optimized build.
            </p>
          </AnimatedTabPanel>
        </TabsContent>
        
        <TabsContent value="docker">
          <AnimatedTabPanel panelKey="docker">
            <CodeBlock
              code={`docker build -t my-backend .
docker run -p 3000:3000 my-backend`}
              title="Docker Deployment"
            />
            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
              Multi-stage Docker build included. Optimized for production.
            </p>
          </AnimatedTabPanel>
        </TabsContent>
      </Tabs>

      <h3 id="whats-included" className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        What's Included?
      </h3>

      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          "Express.js server",
          "TypeScript configuration",
          "ESLint + Prettier",
          "Environment variables (.env)",
          "Pino logging",
          "CORS & Helmet security",
          "JWT middleware",
          "Zod validation",
          "Folder structure",
          "Git initialization",
          "Docker support",
          "README documentation",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-sm text-stone-700 dark:text-zinc-300 bg-stone-50 dark:bg-zinc-900/30 rounded-lg px-3 py-2 border border-stone-200 dark:border-zinc-800/50"
          >
            <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </DocSection>
  );
}

// Architectural Reasoning Section
export function ArchitecturalReasoningSection() {
  return (
    <DocSection id="reasoning" title="Architectural Reasoning">
      <p className="text-lg">
        Every technology choice in AppInit serves a specific purpose. Here's why we
        picked what we picked.
      </p>

      <div className="space-y-6 mt-6">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <FileCode size={18} className="text-blue-600 dark:text-blue-400" />
            Why TypeScript?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Type-safe Database Access:</strong> With Prisma, your database
              schema becomes the single source of truth for your entire TypeScript stack.
              Mongoose schemas also generate full TypeScript types. This means:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Autocomplete for database queries</li>
                <li>Compile-time errors for invalid data access</li>
                <li>Refactoring confidence across your codebase</li>
              </ul>
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Database size={18} className="text-emerald-600 dark:text-emerald-400" />
            Why Prisma for PostgreSQL?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Prisma is not just an ORM—it's a type-safe database toolkit.</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Schema as Code:</strong> Define your database in <code>schema.prisma</code>, 
                  get TypeScript types automatically
                </li>
                <li>
                  <strong>Zero-Cost Query Builder:</strong> No runtime overhead, full type inference
                </li>
                <li>
                  <strong>Migration System:</strong> Version control your database changes like code
                </li>
                <li>
                  <strong>Prisma Studio:</strong> Visual database browser included
                </li>
              </ul>
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Database size={18} className="text-green-600 dark:text-green-400" />
            Why Mongoose for MongoDB?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Schema flexibility with TypeScript safety:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Schema Validation:</strong> Define data structure with built-in validation
                </li>
                <li>
                  <strong>TypeScript Integration:</strong> Full type inference from schemas
                </li>
                <li>
                  <strong>Middleware Hooks:</strong> Pre/post save logic for business rules
                </li>
                <li>
                  <strong>Virtuals & Methods:</strong> Computed properties and instance methods
                </li>
              </ul>
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Wifi size={18} className="text-cyan-600 dark:text-cyan-400" />
            Why WebSocket Support?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Real-time features are table stakes for modern apps.</strong> We provide
              two options:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Socket.io:</strong> Full-featured, with rooms, namespaces, and fallback
                  mechanisms
                </li>
                <li>
                  <strong>ws:</strong> Lightweight, native WebSocket implementation for simple
                  use cases
                </li>
              </ul>
              Both come with TypeScript types, connection management, and error handling.
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Container size={18} className="text-purple-600 dark:text-purple-400" />
            Why Docker?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Consistent deployment across any environment.</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Multi-stage Builds:</strong> Separate build and runtime images for
                  smaller final size
                </li>
                <li>
                  <strong>Layer Caching:</strong> Smart caching of dependencies for faster builds
                </li>
                <li>
                  <strong>Security:</strong> Non-root user execution, minimal attack surface
                </li>
                <li>
                  <strong>Production-Ready:</strong> Works with Kubernetes, Docker Compose, or
                  standalone
                </li>
              </ul>
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Shield size={18} className="text-amber-600 dark:text-amber-400" />
            Why Security by Default?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Security shouldn't be an afterthought.</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Helmet.js:</strong> Secure HTTP headers (CSP, HSTS, X-Frame-Options)
                </li>
                <li>
                  <strong>CORS:</strong> Configurable cross-origin resource sharing
                </li>
                <li>
                  <strong>JWT Middleware:</strong> Token-based authentication ready to use
                </li>
                <li>
                  <strong>Zod Validation:</strong> Runtime type checking for API inputs
                </li>
              </ul>
            </div>
          </Callout>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Package size={18} className="text-blue-600 dark:text-blue-400" />
            Why Pino for Logging?
          </h3>
          <Callout variant="reasoning">
            <div>
              <strong>Performance matters in production.</strong> Pino is the fastest Node.js
              logger with:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Low Overhead:</strong> Asynchronous logging doesn't block your event
                  loop
                </li>
                <li>
                  <strong>Structured Logs:</strong> JSON output ready for log aggregation tools
                </li>
                <li>
                  <strong>Pretty Mode:</strong> Human-readable development logs
                </li>
                <li>
                  <strong>Child Loggers:</strong> Add context (request ID, user ID) to every log
                </li>
              </ul>
            </div>
          </Callout>
        </div>
      </div>
    </DocSection>
  );
}

// Templates Section
export function TemplatesSection() {
  return (
    <DocSection id="templates" title="Template Options">
      <p className="text-lg">
        AppInit offers flexible templates for different use cases. All templates share
        the same architectural principles but differ in their feature sets.
      </p>

      <Tabs defaultValue="typescript" className="my-6">
        <TabsList>
          <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typescript" className="space-y-6">
          <AnimatedTabPanel panelKey="templates-typescript">
            <div>
              <h3 id="ts-rest-api" className="text-lg font-semibold text-stone-900 dark:text-white mb-3">
                TypeScript REST API
              </h3>
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-api --ts-rest`}
                title="Quick Command"
              />
              <p className="text-stone-700 dark:text-zinc-300 mt-3">
                Full-featured TypeScript REST API with:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-zinc-300 mt-2">
                <li>Express.js + TypeScript</li>
                <li>Zod validation with type inference</li>
                <li>Pino logging</li>
                <li>Optional database (MongoDB/PostgreSQL)</li>
                <li>JWT authentication middleware</li>
                <li>Environment configuration</li>
              </ul>
            </div>

            <div>
              <h3 id="ts-websocket" className="text-lg font-semibold text-stone-900 dark:text-white mb-3">
                TypeScript WebSocket + REST
              </h3>
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-realtime --ts-ws`}
                title="Native WebSocket"
              />
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-realtime --ts-io`}
                title="Socket.io"
              />
              <p className="text-stone-700 dark:text-zinc-300 mt-3">
                Everything from REST API plus:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-zinc-300 mt-2">
                <li>WebSocket server (ws or Socket.io)</li>
                <li>Connection management</li>
                <li>Heartbeat/ping-pong mechanism</li>
                <li>TypeScript types for messages</li>
                <li>Error handling & reconnection logic</li>
              </ul>
            </div>

            <Callout variant="info">
              <strong>Tip:</strong> Use <code>--ts-ws</code> for lightweight WebSocket needs or{" "}
              <code>--ts-io</code> for advanced features like rooms, namespaces, and automatic
              reconnection.
            </Callout>
          </AnimatedTabPanel>
        </TabsContent>
        
        <TabsContent value="javascript" className="space-y-6">
          <AnimatedTabPanel panelKey="templates-javascript">
            <div>
              <h3 id="js-rest-api" className="text-lg font-semibold text-stone-900 dark:text-white mb-3">
                JavaScript REST API
              </h3>
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-api --js-rest`}
                title="Quick Command"
              />
              <p className="text-stone-700 dark:text-zinc-300 mt-3">
                Modern JavaScript REST API with ES modules:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-zinc-300 mt-2">
                <li>Express.js with ES6+ syntax</li>
                <li>ESLint + Prettier configuration</li>
                <li>Pino logging</li>
                <li>Optional database (MongoDB/PostgreSQL)</li>
                <li>JWT authentication middleware</li>
                <li>Environment configuration</li>
              </ul>
            </div>

            <div>
              <h3 id="js-websocket" className="text-lg font-semibold text-stone-900 dark:text-white mb-3">
                JavaScript WebSocket + REST
              </h3>
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-realtime --js-ws`}
                title="Native WebSocket"
              />
              <CodeBlock
                code={`npx @dhruvinjs/appinit my-realtime --js-io`}
                title="Socket.io"
              />
              <p className="text-stone-700 dark:text-zinc-300 mt-3">
                Everything from REST API plus real-time capabilities.
              </p>
            </div>

            <Callout variant="warning">
              <strong>Migration Path:</strong> Starting with JavaScript? You can always add
              TypeScript later. All generated code is designed for easy TypeScript migration.
            </Callout>
          </AnimatedTabPanel>
        </TabsContent>
      </Tabs>

      <h3 className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-4">
        Granular Options
      </h3>
      
      <p className="text-stone-700 dark:text-zinc-300 mb-4">
        Prefer full control? Use granular flags instead of presets:
      </p>

      <CodeBlock
        code={`npx @dhruvinjs/appinit my-backend \\
  --lang ts \\
  --template websocket+rest_api \\
  --db postgresql_prisma \\
  --ws socket.io \\
  --docker \\
  --pm pnpm`}
        title="Granular Configuration"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">Language</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--lang ts | js</code>
        </div>
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">Template</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--template rest_api | websocket+rest_api</code>
        </div>
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">Database</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--db none | mongo | postgresql_prisma</code>
        </div>
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">WebSocket</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--ws ws | socket.io</code>
        </div>
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">Docker</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--docker | --no-docker</code>
        </div>
        <div className="bg-stone-50 dark:bg-zinc-900/30 border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-2">Package Manager</h4>
          <code className="text-xs text-blue-700 dark:text-blue-300">--pm npm | pnpm | yarn</code>
        </div>
      </div>
    </DocSection>
  );
}

// CLI Commands Section
export function CLICommandsSection() {
  return (
    <DocSection id="cli-commands" title="CLI Reference">
      <p className="text-lg">
        Complete reference for all AppInit CLI commands and flags.
      </p>

      <h3 className="text-xl font-semibold text-stone-900 dark:text-white mt-6 mb-3">
        Preset Flags (Recommended)
      </h3>

      <div className="space-y-3">
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--ts-rest</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            TypeScript REST API with all essentials
          </p>
        </div>
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--ts-ws</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            TypeScript REST API + native WebSocket (ws library)
          </p>
        </div>
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--ts-io</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            TypeScript REST API + Socket.io
          </p>
        </div>
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--js-rest</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            JavaScript REST API with ES modules
          </p>
        </div>
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--js-ws</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            JavaScript REST API + native WebSocket
          </p>
        </div>
        <div className="border border-stone-200 dark:border-zinc-800/50 rounded-lg p-4 bg-stone-50 dark:bg-zinc-900/30">
          <code className="text-blue-700 dark:text-blue-300 font-mono">--js-io</code>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mt-2">
            JavaScript REST API + Socket.io
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        Interactive Mode
      </h3>
      
      <Tabs defaultValue="npx" className="my-4">
        <TabsList>
          <TabsTrigger value="npx">npm</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="yarn">Yarn</TabsTrigger>
        </TabsList>
        <TabsContent value="npx">
          <CodeBlock
            code={`npx @dhruvinjs/appinit`}
            title="Interactive with npm"
          />
        </TabsContent>
        <TabsContent value="pnpm">
          <CodeBlock
            code={`pnpm dlx @dhruvinjs/appinit`}
            title="Interactive with pnpm"
          />
        </TabsContent>
        <TabsContent value="yarn">
          <CodeBlock
            code={`yarn dlx @dhruvinjs/appinit`}
            title="Interactive with Yarn"
          />
        </TabsContent>
      </Tabs>
      
      <p className="text-stone-700 dark:text-zinc-300 mt-3">
        Running without arguments launches an interactive wizard that guides you through
        all options with descriptions and defaults.
      </p>

      <h3 className="text-xl font-semibold text-stone-900 dark:text-white mt-8 mb-3">
        Examples
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mb-2">Full-stack TypeScript API with PostgreSQL:</p>
          <CodeBlock
            code={`npx @dhruvinjs/appinit my-api --ts-rest --db postgresql_prisma --docker`}
          />
        </div>
        
        <div>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mb-2">Real-time chat backend with MongoDB:</p>
          <CodeBlock
            code={`npx @dhruvinjs/appinit chat-server --ts-io --db mongo`}
          />
        </div>
        
        <div>
          <p className="text-sm text-stone-500 dark:text-zinc-400 mb-2">Lightweight JavaScript API without database:</p>
          <CodeBlock
            code={`npx @dhruvinjs/appinit simple-api --js-rest --db none --no-docker`}
          />
        </div>
      </div>

      <div className="mt-4">
        <Callout variant="info">
          <strong>Package Manager Choice:</strong> Replace <code className="text-blue-700 dark:text-blue-300">npx</code> with{" "}
          <code className="text-blue-700 dark:text-blue-300">pnpm dlx</code> or{" "}
          <code className="text-blue-700 dark:text-blue-300">yarn dlx</code> in any example above.
        </Callout>
      </div>
    </DocSection>
  );
}

// Template Explorer Section
export function TemplateExplorerSection() {
  return (
    <DocSection id="template-explorer" title="Template Explorer">
      <p className="text-lg mb-4">
        Browse the actual template files that AppInit generates. Explore folder structures,
        configuration files, and boilerplate code.
      </p>

      <Callout variant="info">
        <strong>Live Templates:</strong> These are the actual EJS templates used to generate
        your project. Click on files to see their contents and understand the generated
        structure.
      </Callout>

      <div className="my-6">
        <p className="text-stone-700 dark:text-zinc-300 mb-4">
          The template viewer is available in the original docs view. Navigate there to
          explore:
        </p>
        <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-zinc-300">
          <li>
            <strong>TypeScript Templates:</strong> Full type-safe implementations with
            interfaces and type guards
          </li>
          <li>
            <strong>JavaScript Templates:</strong> Modern ES6+ code with JSDoc comments
          </li>
          <li>
            <strong>Database Configurations:</strong> Mongoose schemas and Prisma models
          </li>
          <li>
            <strong>WebSocket Implementations:</strong> Both Socket.io and ws examples
          </li>
          <li>
            <strong>Docker Files:</strong> Production-ready multi-stage builds
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <a
          href="/docs-templates"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          <FileCode size={16} />
          Open Template Explorer
        </a>
      </div>
    </DocSection>
  );
}



// Navigation Configuration
export const DOCS_SECTIONS = [
  { id: "introduction", label: "Introduction", icon: BookOpen, component: IntroductionSection },
  { id: "getting-started", label: "Getting Started", icon: Rocket, component: GettingStartedSection },
  { id: "reasoning", label: "Architectural Reasoning", icon: Lightbulb, component: ArchitecturalReasoningSection },
  { id: "templates", label: "Templates", icon: Layers, component: TemplatesSection },
  { id: "template-explorer", label: "Template Explorer", icon: FileCode, component: TemplateExplorerSection },
  { id: "cli-commands", label: "CLI Reference", icon: Terminal, component: CLICommandsSection },
];
