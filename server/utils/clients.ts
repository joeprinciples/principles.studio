// Client store + report filesystem access. Everything lives on the persistent
// volume (NUXT_CLIENT_DATA_DIR, e.g. /data in prod; ./.data in local dev), never
// in the repo. One login per client company.
import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import { resolve, join, extname, basename } from "node:path";

export interface ClientRecord {
  label: string;
  passwordHash: string;
}
export type ClientsFile = Record<string, ClientRecord>;

export interface ReportMeta {
  /** URL-safe file stem, e.g. "search-strategy-audit" */
  name: string;
  /** Full filename on disk, e.g. "search-strategy-audit.html" */
  file: string;
  /** ".md" | ".html" */
  ext: string;
  /** Human title for the index (from <title> / first heading / stem) */
  title: string;
  /** ISO date string, from filename prefix or file mtime */
  date: string;
}

/** Absolute path to the data volume. Falls back to ./.data for local dev. */
export function getDataDir(): string {
  const configured = useRuntimeConfig().clientDataDir?.trim();
  return configured ? resolve(configured) : resolve(process.cwd(), ".data");
}

function clientsFilePath(): string {
  return join(getDataDir(), "clients", "clients.json");
}

export function reportsDir(client: string): string {
  return join(getDataDir(), "client-reports", client);
}

export async function readClients(): Promise<ClientsFile> {
  const path = clientsFilePath();
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(await fs.readFile(path, "utf8")) as ClientsFile;
  } catch {
    return {};
  }
}

export async function getClientRecord(
  client: string
): Promise<ClientRecord | null> {
  const all = await readClients();
  return all[client] ?? null;
}

export async function upsertClient(
  client: string,
  record: ClientRecord
): Promise<void> {
  const path = clientsFilePath();
  await fs.mkdir(join(getDataDir(), "clients"), { recursive: true });
  const all = await readClients();
  all[client] = record;
  await fs.writeFile(path, JSON.stringify(all, null, 2) + "\n", "utf8");
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;
/** Reject anything that isn't a plain slug (blocks path traversal). */
export function isSafeSlug(s: string): boolean {
  return typeof s === "string" && s.length <= 100 && SLUG_RE.test(s);
}

const DATE_PREFIX_RE = /^(\d{4}-\d{2}(?:-\d{2})?)[-_]?/;

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function extractTitle(raw: string, ext: string, stem: string): string {
  if (ext === ".html") {
    const m = raw.match(/<title>([^<]*)<\/title>/i);
    if (m?.[1]?.trim()) return decodeEntities(m[1].trim());
  } else if (ext === ".md") {
    // YAML frontmatter title: "..."
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fm) {
      const t = fm[1].match(/^\s*title\s*:\s*["']?(.+?)["']?\s*$/im);
      if (t?.[1]?.trim()) return t[1].trim();
    }
    // otherwise first markdown heading
    const h = raw.match(/^#\s+(.+)$/m);
    if (h?.[1]?.trim()) return h[1].trim();
  }
  // Fall back to a prettified filename stem.
  return stem
    .replace(DATE_PREFIX_RE, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** List a client's reports, newest first. */
export async function listReports(client: string): Promise<ReportMeta[]> {
  const dir = reportsDir(client);
  if (!existsSync(dir)) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: ReportMeta[] = [];
  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = extname(e.name).toLowerCase();
    if (ext !== ".md" && ext !== ".html") continue;
    const stem = basename(e.name, ext);
    if (stem.startsWith("index")) continue; // reserved / auto-generated
    const full = join(dir, e.name);
    const raw = await fs.readFile(full, "utf8");
    const stat = await fs.stat(full);
    const prefix = stem.match(DATE_PREFIX_RE)?.[1];
    const date = prefix
      ? (prefix.length === 7 ? `${prefix}-01` : prefix)
      : stat.mtime.toISOString().slice(0, 10);
    out.push({
      name: stem,
      file: e.name,
      ext,
      title: extractTitle(raw, ext, stem),
      date,
    });
  }
  out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return out;
}

/** Resolve a requested report name to a real file on disk, or null. */
export async function resolveReport(
  client: string,
  name: string
): Promise<{ path: string; ext: string } | null> {
  // name may arrive with or without extension; strip any and re-match against
  // the directory so a caller can never smuggle in "../" or absolute paths.
  const wanted = basename(name).replace(/\.(md|html)$/i, "");
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(wanted)) return null;
  const dir = reportsDir(client);
  for (const ext of [".md", ".html"]) {
    const candidate = join(dir, wanted + ext);
    if (existsSync(candidate)) return { path: candidate, ext };
  }
  return null;
}
