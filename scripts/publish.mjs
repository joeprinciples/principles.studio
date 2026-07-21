#!/usr/bin/env node
// Publish audit/report files into a client's folder — instantly live, no rebuild.
//
//   Local dev (copies into .data/client-reports/<client>/):
//     node scripts/publish.mjs greenfields ./out/*.md --local
//
//   Production (uploads to the live admin API). Needs PRINCIPLES_ADMIN_URL +
//   PRINCIPLES_ADMIN_TOKEN in env:
//     node scripts/publish.mjs greenfields ./out/audit.md ./out/review.html
//
// Accepts any number of .md/.html files (shell globs expand to many → bulk push).
import { promises as fs } from "node:fs";
import { basename, extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_DIR = join(__dirname, "..");

const args = process.argv.slice(2);
const local = args.includes("--local");
const positional = args.filter((a) => !a.startsWith("--"));
const client = (positional[0] || "").trim().toLowerCase();
const files = positional.slice(1);

if (!/^[a-z0-9][a-z0-9-]*$/.test(client) || !files.length) {
  console.error("Usage: publish <client> <file...> [--local]");
  process.exit(1);
}

for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (ext !== ".md" && ext !== ".html") {
    console.error(`Only .md/.html allowed: ${f}`);
    process.exit(1);
  }
}

const dataDir = process.env.NUXT_CLIENT_DATA_DIR || join(SITE_DIR, ".data");

async function main() {
  if (local) {
    const dir = join(dataDir, "client-reports", client);
    await fs.mkdir(dir, { recursive: true });
    for (const f of files) {
      await fs.copyFile(f, join(dir, basename(f)));
      console.log(`✔ ${basename(f)}`);
    }
    console.log(`Published ${files.length} file(s) to ${dir}`);
    return;
  }

  const base = process.env.PRINCIPLES_ADMIN_URL;
  const token = process.env.PRINCIPLES_ADMIN_TOKEN;
  if (!base || !token) {
    console.error("Set PRINCIPLES_ADMIN_URL and PRINCIPLES_ADMIN_TOKEN (or use --local).");
    process.exit(1);
  }
  const form = new FormData();
  form.set("client", client);
  for (const f of files) {
    const buf = await fs.readFile(f);
    form.append("files", new Blob([buf]), basename(f));
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/api/admin/publish`, {
    method: "POST",
    headers: { "x-admin-token": token },
    body: form,
  });
  if (!res.ok) {
    console.error(`Failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const json = await res.json();
  console.log(`✔ Published to ${client}: ${json.written.join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
