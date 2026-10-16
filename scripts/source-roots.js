// Checkouts of the repositories whose packages the site documents. Each one has the
// same layout as the monorepo: packages/<category>/<name>. CI checks them out into
// .sources/; for local work point DOCS_SOURCE_ROOTS (comma-separated) somewhere else.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configured = process.env.DOCS_SOURCE_ROOTS ? process.env.DOCS_SOURCE_ROOTS.split(",") : [".sources/visulima", ".sources/vis"];

export const SOURCE_ROOTS = configured.map((entry) => resolve(webRoot, entry.trim()));

for (const root of SOURCE_ROOTS) {
    if (!existsSync(join(root, "packages"))) {
        throw new Error(`Source checkout missing packages/: ${root}. Check it out, or set DOCS_SOURCE_ROOTS.`);
    }
}

