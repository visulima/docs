# visulima/docs

The documentation site for [Visulima](https://visulima.com): the package docs for
`@visulima/*`, the `packem` bundler docs, the tui-kit registry, and the install scripts.

## How the content is assembled

The site reads the documentation from the repositories it documents, and does not keep
copies of it:

| Source                                              | Provides                                             |
| --------------------------------------------------- | ---------------------------------------------------- |
| [visulima/visulima](https://github.com/visulima/visulima) | Package docs in `packages/*/*/docs`, the tui-kit registry, the code of conduct |
| [visulima/vis](https://github.com/visulima/vis)           | Package docs for `vis`, `vis-mcp`, `task-runner`, `secret-scanner`, `tui` |
| [visulima/packem](https://github.com/visulima/packem)     | Package docs in `docs/`                                       |

`pnpm run sources` clones the first two into `.sources/`. Packem's docs are fetched during
the build. `DOCS_REFS` pins a repository to a commit, and previews of source pull requests
use it.

## Development

```bash
pnpm install
pnpm run sources     # clones visulima/visulima and visulima/vis into .sources/
pnpm run dev
```

To use checkouts that are already on disk, set `DOCS_SOURCE_ROOTS` to a comma-separated list
of their paths. The last checkout wins when two of them define the same package.

## Deploys

`.github/workflows/docs.yml` builds the site and deploys it with the Netlify CLI:

- A push to `main`, or a `source-updated` dispatch, deploys to production.
- A pull request to this repository, or a `source-preview` dispatch from a source
  repository, deploys to an alias named `pr-<number>`.

Each source repository carries `.github/workflows/docs-dispatch.yml`, which sends these
dispatches. A copy of that workflow lives in `templates/docs-dispatch.yml`.

### Secrets

| Where                          | Name                    | Used for                                 |
| ------------------------------ | ----------------------- | ---------------------------------------- |
| visulima/docs                  | `NETLIFY_AUTH_TOKEN`    | Deploying with the Netlify CLI           |
| visulima/docs                  | `NETLIFY_SITE_ID`       | Which Netlify site to deploy to          |
| visulima/visulima, vis, packem | `DOCS_DISPATCH_TOKEN`   | Fine-grained token that can dispatch to visulima/docs |
