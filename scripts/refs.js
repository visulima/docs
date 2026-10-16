// Overrides for the repositories the site reads from, set by a preview dispatch.
// Commit or branch to use for a repository instead of its default branch, set by the
// preview dispatch as DOCS_REFS="visulima/vis=<sha>,visulima/packem=<sha>".
export const refOverride = (repo) => {
    const entries = (process.env.DOCS_REFS || "")
        .split(",")
        .map((entry) => entry.trim().split("="))
        .filter(([name, ref]) => name && ref);

    return Object.fromEntries(entries)[repo];
};
