// Create or update a client login. The CLI hashes the password locally and
// sends only the hash, so plaintext passwords never travel to the server. A
// bare { password } is also accepted (hashed here) for convenience.
export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const body = await readBody<{
    client?: string;
    label?: string;
    passwordHash?: string;
    password?: string;
  }>(event);

  const client = String(body?.client ?? "").trim().toLowerCase();
  if (!isSafeSlug(client)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid client slug" });
  }

  let passwordHash = body?.passwordHash?.trim();
  if (!passwordHash) {
    if (!body?.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "password or passwordHash required",
      });
    }
    passwordHash = await hashClientPassword(body.password);
  }

  const existing = await getClientRecord(client);
  const label = body?.label?.trim() || existing?.label || client;
  await upsertClient(client, { label, passwordHash });
  return { ok: true, client, label };
});
