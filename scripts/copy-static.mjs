import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const assetsDir = resolve(distDir, "assets");

mkdirSync(distDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

cpSync(resolve("public/index.html"), resolve(distDir, "index.html"));
cpSync(resolve("src/styles/tailwind.css"), resolve(assetsDir, "styles.css"));

console.log("✓ Copied static assets to dist/");
