// One login per client company. Verifies against clients.json on the volume and
// opens a sealed-cookie session carrying only the client slug + label.
export default defineEventHandler(async (event) => {
  // Throttle by client IP: 8 attempts / 10 min. Cloudflare sets the forwarded IP.
  sweepRateLimits();
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const gate = rateLimit(`login:${ip}`, 8, 10 * 60 * 1000);
  if (!gate.ok) {
    setHeader(event, "retry-after", String(gate.retryAfter));
    throw createError({
      statusCode: 429,
      statusMessage: "Too many attempts. Try again shortly.",
    });
  }

  const body = await readBody<{ client?: string; password?: string }>(event);
  const client = String(body?.client ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const invalid = () =>
    createError({ statusCode: 401, statusMessage: "Invalid client or password" });

  if (!isSafeSlug(client) || !password) throw invalid();

  const record = await getClientRecord(client);
  // Verify even when the client is unknown-ish to keep timing uniform.
  const ok = record
    ? await verifyClientPassword(record.passwordHash, password)
    : await verifyClientPassword(
        "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAA",
        password
      );
  if (!record || !ok) throw invalid();

  await setUserSession(event, {
    user: { client, label: record.label },
    loggedInAt: Date.now(),
  });
  return { ok: true, client, label: record.label };
});
