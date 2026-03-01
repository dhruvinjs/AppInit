import { NextResponse } from "next/server";
import { templateDocsSources } from "appinit-templates/docs";

// Map of include paths to their resolved content
const commonIncludes: Record<string, { js: string; ts: string }> = {
  "common/src/utils/logger.ejs": {
    ts: `import pino from "pino";
import { config } from "../config/env";

const logger =
  config.nodeEnv === "development"
    ? pino(
        { level: "debug" },
        pino.transport({
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }),
      )
    : pino({ level: "info" });

export { logger };`,
    js: `import pino from "pino";
import { config } from "../config/env.js";

const logger =
  config.nodeEnv === "development"
    ? pino(
        { level: "debug" },
        pino.transport({
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }),
      )
    : pino({ level: "info" });

export { logger };`,
  },
  "common/src/utils/ApiError.ejs": {
    ts: `class ApiError extends Error {
  statusCode: number;
  success: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;`,
    js: `class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;`,
  },
  "common/src/middleware/asyncHandler.ejs": {
    ts: "", // TypeScript doesn't have asyncHandler
    js: `export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res)).catch(next);
  };
};`,
  },
  "common/src/routes/health.routes.ejs": {
    ts: `import { Router } from "express";
import { getHealth } from "../controllers/health.controller";

const router = Router();

router.get("/", getHealth);

export default router;`,
    js: `import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealth);

export default router;`,
  },
  "common/src/routes/index.ejs": {
    ts: `import { Router } from "express";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/health", healthRoutes);

export default router;`,
    js: `import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

export default router;`,
  },
};

// Remove EJS template syntax to show clean code examples
function cleanEjsTemplate(code: string, filePath: string): string {
  // Determine if it's a JavaScript or TypeScript file
  const isJs = filePath.includes("/javascript/");
  const lang = isJs ? "js" : "ts";

  // Special handling for README files - render with example values
  if (filePath.includes("Readme.md")) {
    return (
      code
        .replace(/<%=\s*name\s*%>/g, "my-awesome-api")
        .replace(/<%=\s*websocket_package\s*%>/g, "socket.io")
        // Remove websocket conditionals - show WebSocket example
        .replace(
          /<%_\s*if\s*\(template\.includes\("websocket"\)\)\s*{\s*_%>/g,
          "",
        )
        // Remove database conditionals - show PostgreSQL Prisma example
        .replace(/<%_\s*if\s*\(database\s*===\s*"mongo"\)\s*{\s*_%>/g, "<!-- ")
        .replace(
          /<%_\s*}\s*else\s*if\s*\(database\s*===\s*"postgresql_prisma"\)\s*{\s*_%>/g,
          " -->",
        )
        .replace(/<%_\s*}\s*else\s*{\s*_%>/g, "<!-- ")
        .replace(/<%_\s*}\s*_%>/g, " -->")
        .replace(
          /<%_\s*if\s*\(database\s*===\s*"postgresql_prisma"\)\s*{\s*_%>/g,
          "",
        )
        .replace(/<%_\s*if\s*\(Dockerfile\)\s*{\s*_%>/g, "")
        // Clean up any remaining EJS tags
        .replace(/<%.*?%>/g, "")
        // Remove HTML comments
        .replace(/<!--\s*/g, "")
        .replace(/\s*-->/g, "")
        // Remove excessive blank lines
        .replace(/\n\s*\n\s*\n+/g, "\n\n")
        .trim()
    );
  }

  // Check if the code is just an include statement
  const includeMatch = code
    .trim()
    .match(/^<%[-_=]\s*await include\("([^"]+)"\)\s*%>\s*$/s);
  if (includeMatch) {
    let includePath = includeMatch[1];
    if (includePath) {
      // Normalize the path - remove ../../../base/ prefix
      includePath = includePath.replace(/^(\.\.\/)+base\//, "");

      const resolvedContent = commonIncludes[includePath]?.[lang];
      if (resolvedContent) {
        return resolvedContent;
      }
    }
    return "// This file includes shared code from common templates\n// The actual implementation is generated at build time";
  }

  // Replace inline includes with their content
  let processed = code;
  const inlineIncludeRegex = /<%[-_=]\s*await include\("([^"]+)"\)\s*%>/g;
  processed = processed.replace(inlineIncludeRegex, (match, includePath) => {
    // Normalize the path
    const normalizedPath = includePath.replace(/^(\.\.\/)+base\//, "");
    const resolvedContent = commonIncludes[normalizedPath]?.[lang];
    return (
      resolvedContent ||
      "// The actual implementation is generated at build time"
    );
  });

  return (
    processed
      // Remove EJS output tags
      .replace(/<%=.*?%>/g, "")
      // Remove EJS scriptlet tags (opening)
      .replace(/<%_\s*if\s*\(.*?\)\s*{\s*_%>/g, "")
      .replace(/<%_\s*}\s*else\s*{\s*_%>/g, "")
      .replace(/<%_\s*}\s*_%>/g, "")
      // Remove other EJS tags
      .replace(/<%.*?%>/g, "")
      // Remove excessive blank lines (more than 2 consecutive)
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      // Trim leading/trailing whitespace
      .trim()
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 },
    );
  }

  if (relativePath.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const code = templateDocsSources[relativePath];

  if (!code) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Clean the EJS template syntax for display
  const cleanedCode = cleanEjsTemplate(code, relativePath);

  return NextResponse.json({ code: cleanedCode });
}
