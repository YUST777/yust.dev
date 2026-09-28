#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const scriptPath = path.join(__dirname, "scrape-linkedin-followers.py");
const jsonPath = path.join(rootDir, "src", "data", "linkedin.json");

if (!fs.existsSync(jsonPath)) {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        followers: 1994,
        connections: "500+",
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    ) + "\n"
  );
}

try {
  const result = spawnSync("python3", [scriptPath, "--sync"], {
    stdio: "inherit",
    cwd: rootDir,
    timeout: 20000,
  });

  if (result.status === 0) {
    process.exit(0);
  }
} catch (error) {
  // Ignored in headless/CI environments where browser cookie or python isn't present
}

console.log("[i] LinkedIn live sync skipped; continuing with committed src/data/linkedin.json");
process.exit(0);
