// Gated report delivery. This is the security boundary the old StatiCrypt setup
// never had: a logged-in client can only ever read files under THEIR OWN slug,
// enforced server-side, regardless of what URL they type.
import { promises as fs } from "node:fs";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

export default defineEventHandler(async (event) => {
  const client = String(getRouterParam(event, "client") ?? "").toLowerCase();
  const reportParam = getRouterParam(event, "report") ?? "";

  // Not logged in → send them to the login page rather than a raw 401.
  const session = await getUserSession(event);
  if (!session?.user) {
    return sendRedirect(event, "/clients", 302);
  }

  // Ownership: the session's client must match the slug in the URL.
  if (!isSafeSlug(client) || session.user.client !== client) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }

  // No report specified → back to the index (which lists this client's reports).
  if (!reportParam || reportParam === "/") {
    return sendRedirect(event, "/clients", 302);
  }

  const resolved = await resolveReport(client, reportParam);
  if (!resolved) {
    throw createError({ statusCode: 404, statusMessage: "Report not found" });
  }

  const raw = await fs.readFile(resolved.path, "utf8");
  setHeader(event, "cache-control", "no-store");
  setHeader(event, "content-type", "text/html; charset=utf-8");
  setHeader(event, "x-robots-tag", "noindex, nofollow");

  // HTML reports are self-contained styled documents → serve verbatim.
  if (resolved.ext === ".html") return raw;

  // Markdown reports → strip optional frontmatter, render, wrap in the brand shell.
  const { body, title } = splitFrontmatter(raw);
  const bodyHtml = await marked.parse(body);
  return renderMarkdownReport({
    title: title || deriveTitle(bodyHtml, reportParam),
    bodyHtml,
    client,
    label: String(session.user.label ?? client),
  });
});

function splitFrontmatter(raw: string): { body: string; title: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { body: raw, title: "" };
  const title =
    m[1].match(/^\s*title\s*:\s*["']?(.+?)["']?\s*$/im)?.[1]?.trim() ?? "";
  return { body: raw.slice(m[0].length), title };
}

function deriveTitle(html: string, fallback: string): string {
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "");
  return (h1 || fallback.replace(/[-_]+/g, " ")).trim();
}
