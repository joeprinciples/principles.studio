# Deploying principles.studio (Coolify on Hetzner)

Nuxt 4 app deployed as a **Node server** (`nuxt build` → `node .output/server/index.mjs`).
Marketing pages are prerendered at build time and served as static HTML; the Node
server exists for the gated client area (`/clients/*`) and the admin publish API
(`/api/admin/*`). Client reports live as files on a persistent volume — publishing
an audit is a file drop with **no rebuild**.

## Coolify application settings

| Setting | Value |
|---|---|
| Source | GitHub repo `joeprinciples/principles.studio`, branch `main` |
| Base directory | `/` (the repo root *is* the app) |
| Build pack | Dockerfile (the repo's `Dockerfile`) — or Nixpacks with build `npm run build`, start `node .output/server/index.mjs` |
| Port | `3000` |
| Health check path | `/` |

Node 22 LTS (the Dockerfile pins `node:22-bookworm-slim`).

## Environment variables (Coolify → Environment Variables)

| Variable | Required | Purpose |
|---|---|---|
| `NUXT_SESSION_PASSWORD` | **Yes** | 32+ char secret that encrypts session cookies. `openssl rand -base64 32`. |
| `NUXT_ADMIN_TOKEN` | **Yes** | Secret guarding `/api/admin/*` (publish + add-client). The admin API returns 503 until this is set (fail-closed). `openssl rand -hex 32`. |
| `NUXT_CLIENT_DATA_DIR` | **Yes** | `/data` — must point inside the persistent volume (below), or reports/logins are lost on redeploy. |

## Persistent storage (required)

Add a **volume mount** in Coolify: `/data`. It holds:

```
/data/clients/clients.json            # one entry per client login (hashed pw)
/data/client-reports/<client>/*.md    # audits (rendered in the brand layout)
/data/client-reports/<client>/*.html  # self-contained reports (served as-is)
```

Neither the client list nor the reports ever live in the git repo.

## First-time setup

1. Deploy the app with the env vars + volume above.
2. Point DNS (below) and confirm `https://principles.studio` loads.
3. Create each client login (run locally; hashes the password on your machine and
   POSTs only the hash):
   ```
   export PRINCIPLES_ADMIN_URL=https://principles.studio
   export PRINCIPLES_ADMIN_TOKEN=<same value as NUXT_ADMIN_TOKEN on the server>
   npm run add-client greenfields   --label "Greenfields"
   npm run add-client moneyhelpdesk --label "MoneyHelpDesk"
   npm run add-client kress         --label "Kress"
   ```
4. Publish their existing reports (the migrated files are in `.data/client-reports/`
   locally, or wherever you author them):
   ```
   npm run publish greenfields   ./greenfields/search-strategy-audit.html
   npm run publish moneyhelpdesk  ./moneyhelpdesk/*.html
   npm run publish kress          ./kress/website-strategy.html
   ```

## Publishing audits day-to-day (the fast path)

Write an audit as Markdown (`.md`, optional `--- title: ... ---` header) or a full
styled `.html` document, then:

```
npm run publish <client> ./path/to/audit.md            # one
npm run publish <client> ./out/*.md ./out/*.html       # a whole batch at once
```

It uploads straight into the client's folder on the volume — **live immediately, no
rebuild, no commit.** Markdown is wrapped in the branded report layout
(`server/utils/reportLayout.ts`); HTML is served verbatim. The client's report index
at `/clients` is generated automatically from the folder (newest first).

## DNS / Cloudflare

Point `principles.studio` (and `www`) `A` records at the VPS IP, proxied (orange
cloud). Coolify provisions TLS; set SSL/TLS mode to **Full (strict)** in Cloudflare.
Optional later: Cloudflare Access as a second gate in front of `/clients/*`.

## Make the repo private

The repo is currently public. Since reports live only on the volume, nothing
sensitive is in it — but for good hygiene: `gh repo edit joeprinciples/principles.studio --visibility private`
(or GitHub → Settings → Danger Zone). Re-authorise Coolify's GitHub access afterward.

## Backups

Add a Coolify **Scheduled Task** on the app (daily, 3am) tarring the volume, e.g.:
```
cron:    0 3 * * *
command: tar czf /data/backups/data-$(date +\%Y\%m\%d).tgz -C /data clients client-reports
```
Also enable Hetzner's server-level backups (one click) so the volume is covered for
real disaster recovery.

## Local sanity checks before pushing

```
npm run build                          # prod build — prerenders marketing pages
npm run start                          # serve on :3000 (needs .env — see .env.example)
# client flow: open /clients, log in, open a report; try another client's URL → 403
```
