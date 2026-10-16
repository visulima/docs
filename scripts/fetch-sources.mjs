// Clones the repositories whose packages the site documents, at their main branch, into
// .sources/. Idempotent: an existing checkout is moved to the latest main.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { refOverride } from "./refs.js";

const root = resolve(fileURLToPath(import.meta.url), "..", "..");
const sources = [
    { repo: "visulima/visulima", dir: ".sources/visulima" },
    { repo: "visulima/vis", dir: ".sources/vis" },
];

const git = (args, cwd) => execFileSync("git", args, { cwd, stdio: "inherit" });

for (const { repo, dir } of sources) {
    const target = resolve(root, dir);
    const ref = refOverride(repo) || "main";

    if (existsSync(resolve(target, ".git"))) {
        git(["fetch", "--depth", "1", "origin", ref], target);
        git(["reset", "--hard", "FETCH_HEAD"], target);
    } else {
        git(["init", "--quiet", target], root);
        git(["-C", target, "fetch", "--depth", "1", `https://github.com/${repo}.git`, ref], root);
        git(["-C", target, "checkout", "--quiet", "FETCH_HEAD"], root);
    }
}
