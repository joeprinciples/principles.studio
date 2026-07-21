// Bulk report publishing: the CLI POSTs one or more .md/.html files here and
// they land in the client's folder on the volume — instantly live, no rebuild.
import { promises as fs } from "node:fs";
import { join, basename, extname } from "node:path";

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const parts = await readMultipartFormData(event);
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: "No form data" });
  }

  // The client slug can come as a form field or the ?client= query param.
  const query = getQuery(event);
  const field = parts.find((p) => p.name === "client" && !p.filename);
  const client = String(field?.data?.toString() ?? query.client ?? "")
    .trim()
    .toLowerCase();
  if (!isSafeSlug(client)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid client slug" });
  }
  if (!(await getClientRecord(client))) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown client "${client}" — add it first`,
    });
  }

  const dir = reportsDir(client);
  await fs.mkdir(dir, { recursive: true });

  const written: string[] = [];
  for (const p of parts) {
    if (!p.filename) continue;
    const name = basename(p.filename);
    const ext = extname(name).toLowerCase();
    if (ext !== ".md" && ext !== ".html") {
      throw createError({
        statusCode: 400,
        statusMessage: `Only .md/.html allowed, got "${name}"`,
      });
    }
    if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Unsafe filename "${name}"`,
      });
    }
    await fs.writeFile(join(dir, name), p.data);
    written.push(name);
  }

  if (!written.length) {
    throw createError({ statusCode: 400, statusMessage: "No files uploaded" });
  }
  return { ok: true, client, written };
});
