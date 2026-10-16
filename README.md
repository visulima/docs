<p align="center">
  <a href="https://visulima.com">
    <img src="https://raw.githubusercontent.com/visulima/visulima/main/.github/assets/visulima_logo.svg" width="160" alt="Visulima" />
  </a>
</p>

<h1 align="center">Visulima docs</h1>

<p align="center">
  <strong>The documentation site for <a href="https://visulima.com">visulima.com</a>: the package docs for every <code>@visulima/*</code> package, the packem bundler, and the tui-kit registry.</strong>
</p>

<div align="center">

[![MIT licence](https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge)](./LICENSE.md)
[![Docs](https://img.shields.io/badge/docs-visulima.com-294E80?style=for-the-badge)](https://visulima.com/docs)

</div>

---

## What this repository is

The docs are not copied here. Each package's documentation lives in the repository that
owns the package, and this site builds from those sources on every change.

| Source | Provides |
| --- | --- |
| [visulima/visulima](https://github.com/visulima/visulima) | Docs for the packages in `packages/*/*/docs`, the tui-kit registry, and the code of conduct |
| [visulima/vis](https://github.com/visulima/vis) | Docs for `vis`, `vis-mcp`, `task-runner`, `task-runner-client`, `secret-scanner` and `tui` |
| [visulima/packem](https://github.com/visulima/packem) | Docs for packem, from its `docs/` folder |

This repository holds the site itself: the TanStack Start app, the build scripts that
collect the docs, the routes, and the styling.

## Quick start

Requirements: Node.js `^22.14.0 || >=24.10.0` and pnpm `11.28.2`.

```bash
pnpm install
pnpm run sources   # clone visulima/visulima and visulima/vis into .sources/
pnpm run dev
```

`pnpm run build` produces the production bundle in `dist/`. The build also needs
`src/data/stats.json`, which `scripts/fetch-stats.js` writes from npm and GitHub
statistics. Without a GitHub token that fetch is slow, because it is rate-limited.

To build against checkouts you already have, set `DOCS_SOURCE_ROOTS` to a comma-separated
list of their paths. When two checkouts define the same package, the later one wins.

## Preview a change to a package

Pull requests to a source repository get a docs preview automatically. The source
repository sends a dispatch here, and the docs for that exact commit are deployed to
`pr-<number>` on Netlify. The source commit is pinned with `DOCS_REFS`, so the preview shows
the commit under review and not the latest `main`.

## Deploys

`.github/workflows/docs.yml` builds the site and deploys it with the Netlify CLI:

| Trigger | Result |
| --- | --- |
| Push to `main` | Production deploy |
| `source-updated` dispatch | Production deploy, with the latest `main` of each source |
| Pull request to `main` | Preview at `pr-<number>` |
| `source-preview` dispatch | Preview at `pr-<number>`, built from the source commit |

Each source repository carries `.github/workflows/docs-dispatch.yml`. A copy lives in
[`templates/docs-dispatch.yml`](templates/docs-dispatch.yml).

### Secrets

| Repository | Name | Used for |
| --- | --- | --- |
| visulima/docs | `NETLIFY_AUTH_TOKEN` | Deploying with the Netlify CLI |
| visulima/docs | `NETLIFY_SITE_ID` | The Netlify site to deploy to |
| visulima/visulima, visulima/vis, visulima/packem | `DOCS_DISPATCH_TOKEN` | A fine-grained token with contents write on this repository |

## Project layout

| Path | Contents |
| --- | --- |
| `src/routes` | TanStack Router routes, including the docs pages |
| `src/content/docs` | Site-level docs, written in MDX. Package docs are generated here at build time |
| `scripts/` | `fetch-sources`, `generate-packages`, `copy-package-docs`, `generate-registry`, `copy-install-scripts` |
| `templates/` | The dispatch workflow that source repositories copy |

## Contributing

Pull requests are welcome. Keep changes to the site in this repository. Changes to a
package's docs belong in that package's repository, and the site picks them up on the next
dispatch.

## License

MIT. See [LICENSE.md](LICENSE.md). The design assets are licensed under CC BY-NC-ND 4.0, see [LICENSE-DESIGN.md](LICENSE-DESIGN.md).
