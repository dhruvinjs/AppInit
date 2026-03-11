import { ArrowRight, CheckCircle2, Code2, Database, Package, Zap, GitBranch, Shield } from "lucide-react";

export const DOCS_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    label: "Introduction",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    label: "Getting Started",
  },
  {
    id: "features",
    title: "Features",
    label: "Features",
  },
  {
    id: "templates",
    title: "Templates",
    label: "Templates",
  },
  {
    id: "comparison",
    title: "Why AppInit?",
    label: "Why AppInit?",
  },
];

export function DocsSection({ id, isDark }: { id: string; isDark: boolean }) {
  switch (id) {
    case "introduction":
      return <IntroductionSection isDark={isDark} />;
    case "getting-started":
      return <GettingStartedSection isDark={isDark} />;
    case "features":
      return <FeaturesSection isDark={isDark} />;
    case "templates":
      return <TemplatesSection isDark={isDark} />;
    case "comparison":
      return <ComparisonSection isDark={isDark} />;
    default:
      return <IntroductionSection isDark={isDark} />;
  }
}

function IntroductionSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
          AppInit
        </h1>
        <p className={`mt-4 text-xl ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          A powerful Node.js project initialization tool that helps you scaffold production-ready applications with zero setup friction.
        </p>
      </div>

      <div className={`rounded-lg border p-6 ${isDark ? "border-blue-900/30 bg-blue-950/10" : "border-blue-200 bg-blue-50"}`}>
        <h3 className={`font-semibold ${isDark ? "text-blue-200" : "text-blue-900"}`}>
          What is AppInit?
        </h3>
        <p className={`mt-2 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          AppInit is a modern scaffolding tool that provides you with everything you need to build a Node.js application. 
          It comes with sensible defaults for TypeScript, optional database support, WebSocket capabilities, Docker integration, 
          and more—all configured out of the box so you can focus on building your product.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Fast Setup"
          description="Get your project running in seconds with pre-configured tools and best practices."
          isDark={isDark}
        />
        <FeatureCard
          icon={<Shield className="h-6 w-6" />}
          title="Production Ready"
          description="Built with TypeScript, proper error handling, and industry-standard configurations."
          isDark={isDark}
        />
        <FeatureCard
          icon={<GitBranch className="h-6 w-6" />}
          title="Choose Your Stack"
          description="Select from JavaScript or TypeScript templates based on your project needs."
          isDark={isDark}
        />
        <FeatureCard
          icon={<Package className="h-6 w-6" />}
          title="Optional Features"
          description="Add database, WebSocket, or Docker support only when you need it."
          isDark={isDark}
        />
      </div>

      <div>
        <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
          Why Choose AppInit?
        </h2>
        <ul className="mt-6 space-y-3">
          {[
            "No configuration fatigue – everything works out of the box",
            "Industry best practices built-in from day one",
            "TypeScript support with proper tooling",
            "Optional WebSocket, Database, and Docker integration",
            "Multiple template options for different use cases",
            "Clean, understandable boilerplate code",
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
              <span className={isDark ? "text-zinc-300" : "text-stone-700"}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GettingStartedSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
          Getting Started
        </h1>
        <p className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          Get up and running with AppInit in just a few commands.
        </p>
      </div>

      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-stone-900"}`}>
          Installation
        </h2>
        <CodeBlock isDark={isDark}>
          {`# Using npm
npm create app-init@latest my-app

# Using yarn
yarn create app-init my-app

# Using pnpm
pnpm create app-init my-app`}
        </CodeBlock>
      </div>

      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-stone-900"}`}>
          Running Your Project
        </h2>
        <CodeBlock isDark={isDark}>
          {`cd my-app
npm run dev
# or
npm run start:watch`}
        </CodeBlock>
        <p className={`mt-4 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          Your application will be running on <code className={`rounded px-2 py-1 ${isDark ? "bg-zinc-800" : "bg-stone-100"}`}>http://localhost:3000</code>
        </p>
      </div>

      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-stone-900"}`}>
          What's Included?
        </h2>
        <ul className="space-y-3">
          {[
            { title: "TypeScript", desc: "Full TypeScript support with strict mode enabled" },
            { title: "Express.js", desc: "A lightweight and flexible web framework" },
            { title: "ESM", desc: "Modern ES modules with proper configuration" },
            { title: "Development Tools", desc: "Hot reload, linting, and formatting configured" },
          ].map((item, i) => (
            <li key={i} className={`rounded-lg border p-4 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-stone-200 bg-stone-50"}`}>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>{item.title}</h3>
              <p className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeaturesSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
          Features
        </h1>
        <p className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          Everything you need for modern Node.js development.
        </p>
      </div>

      <div className="grid gap-6">
        <FeatureDetailCard isDark={isDark} icon={<Code2 className="h-8 w-8" />} title="Multiple Templates">
          <p className="text-sm">Choose between JavaScript or TypeScript templates. Each template is optimized for specific use cases and includes best practices.</p>
        </FeatureDetailCard>

        <FeatureDetailCard isDark={isDark} icon={<Database className="h-8 w-8" />} title="Optional Database Support">
          <p className="text-sm">Integrate your database of choice with pre-configured migrations and query builders. Supports PostgreSQL, MySQL, SQLite, and more.</p>
        </FeatureDetailCard>

        <FeatureDetailCard isDark={isDark} icon={<Zap className="h-8 w-8" />} title="WebSocket Integration">
          <p className="text-sm">Real-time capabilities built-in. Socket.io integration is ready to use for real-time applications.</p>
        </FeatureDetailCard>

        <FeatureDetailCard isDark={isDark} icon={<Package className="h-8 w-8" />} title="Docker Support">
          <p className="text-sm">Deploy with confidence. Includes pre-configured Dockerfile and docker-compose for development and production.</p>
        </FeatureDetailCard>

        <FeatureDetailCard isDark={isDark} icon={<Shield className="h-8 w-8" />} title="Security Best Practices">
          <p className="text-sm">Environment variable management, CORS configuration, helmet integration, and more out of the box.</p>
        </FeatureDetailCard>
      </div>
    </div>
  );
}

function TemplatesSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
          Templates
        </h1>
        <p className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          Choose the template that fits your needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TemplateCard
          title="TypeScript Starter"
          description="Full TypeScript setup with type safety, ESLint, and Prettier pre-configured."
          features={["TypeScript", "ESLint", "Prettier", "Hot Reload"]}
          isDark={isDark}
        />
        <TemplateCard
          title="JavaScript Starter"
          description="A lightweight JavaScript setup perfect for quick prototyping and learning."
          features={["JavaScript", "ESLint", "Prettier", "Hot Reload"]}
          isDark={isDark}
        />
        <TemplateCard
          title="Full Stack (TypeScript)"
          description="Everything included – database, WebSocket, and Docker support."
          features={["TypeScript", "Database", "WebSocket", "Docker"]}
          isDark={isDark}
        />
        <TemplateCard
          title="API Server (TypeScript)"
          description="Optimized for RESTful APIs with database and authentication ready."
          features={["TypeScript", "Database", "Auth Ready", "Validation"]}
          isDark={isDark}
        />
      </div>
    </div>
  );
}

function ComparisonSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
          Why AppInit?
        </h1>
        <p className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-stone-600"}`}>
          See how AppInit compares to other Node.js initialization tools.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full text-sm ${isDark ? "border-zinc-800" : "border-stone-200"}`}>
          <thead>
            <tr className={`border-b ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-stone-200 bg-stone-100"}`}>
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-center font-semibold">AppInit</th>
              <th className="px-4 py-3 text-center font-semibold">create-t3-app</th>
              <th className="px-4 py-3 text-center font-semibold">Express Generator</th>
            </tr>
          </thead>
          <tbody>
            {[
              { feature: "TypeScript Support", appinit: true, t3: true, express: false },
              { feature: "Multiple Templates", appinit: true, t3: false, express: false },
              { feature: "Database Integration", appinit: true, t3: false, express: false },
              { feature: "WebSocket Ready", appinit: true, t3: false, express: false },
              { feature: "Docker Support", appinit: true, t3: false, express: false },
              { feature: "ESM by Default", appinit: true, t3: true, express: false },
              { feature: "Hot Reload Dev", appinit: true, t3: false, express: false },
              { feature: "Zero Config", appinit: true, t3: true, express: false },
            ].map((row, i) => (
              <tr key={i} className={`border-b ${isDark ? "border-zinc-800" : "border-stone-200"}`}>
                <td className="px-4 py-3">{row.feature}</td>
                <td className="px-4 py-3 text-center">{row.appinit ? "✓" : "—"}</td>
                <td className="px-4 py-3 text-center">{row.t3 ? "✓" : "—"}</td>
                <td className="px-4 py-3 text-center">{row.express ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`rounded-lg border p-6 ${isDark ? "border-green-900/30 bg-green-950/10" : "border-green-200 bg-green-50"}`}>
        <h3 className={`font-semibold ${isDark ? "text-green-200" : "text-green-900"}`}>
          Key Advantages
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className={isDark ? "text-zinc-300" : "text-stone-700"}>
            <strong>Comprehensive:</strong> Unlike Express Generator, AppInit includes modern tooling and TypeScript out of the box
          </li>
          <li className={isDark ? "text-zinc-300" : "text-stone-700"}>
            <strong>Flexible:</strong> More optional features than create-t3-app (WebSocket, Docker, multiple DB support)
          </li>
          <li className={isDark ? "text-zinc-300" : "text-stone-700"}>
            <strong>Maintainable:</strong> Clean, understandable boilerplate that doesn't hide complexity
          </li>
          <li className={isDark ? "text-zinc-300" : "text-stone-700"}>
            <strong>Production-Ready:</strong> Security best practices, environment configuration, and error handling included
          </li>
        </ul>
      </div>
    </div>
  );
}

// Helper Components

function FeatureCard({
  icon,
  title,
  description,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}) {
  return (
    <div className={`rounded-lg border p-6 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-stone-200 bg-stone-50"}`}>
      <div className="mb-3 text-blue-500">{icon}</div>
      <h3 className={`font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>{title}</h3>
      <p className={`mt-2 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>{description}</p>
    </div>
  );
}

function FeatureDetailCard({
  icon,
  title,
  children,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div className={`rounded-lg border p-6 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-stone-200 bg-stone-50"}`}>
      <div className="flex gap-4">
        <div className="shrink-0 text-blue-500">{icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>{title}</h3>
          <div className={`mt-2 ${isDark ? "text-zinc-400" : "text-stone-600"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  title,
  description,
  features,
  isDark,
}: {
  title: string;
  description: string;
  features: string[];
  isDark: boolean;
}) {
  return (
    <div className={`rounded-lg border p-6 transition-all hover:shadow-lg ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-stone-200 bg-stone-50"}`}>
      <h3 className={`font-semibold ${isDark ? "text-white" : "text-stone-900"}`}>{title}</h3>
      <p className={`mt-2 text-sm ${isDark ? "text-zinc-400" : "text-stone-600"}`}>{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {features.map((feature) => (
          <span
            key={feature}
            className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? "bg-blue-950/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ isDark, children }: { isDark: boolean; children: string }) {
  return (
    <div
      className={`overflow-x-auto rounded-lg border p-4 font-mono text-sm ${isDark ? "border-zinc-800 bg-black/50 text-zinc-200" : "border-stone-200 bg-stone-100 text-stone-800"}`}
    >
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  );
}
