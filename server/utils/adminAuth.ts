// Guard for /api/admin/*. Fails closed: if NUXT_ADMIN_TOKEN is unset the admin
// surface is disabled entirely (mirrors ThyroidTools' admin design).
import { timingSafeEqual } from "node:crypto";

export function requireAdmin(event: any): void {
  const expected = useRuntimeConfig().adminToken?.trim();
  if (!expected) {
    throw createError({
      statusCode: 503,
      statusMessage: "Admin API disabled (NUXT_ADMIN_TOKEN not set)",
    });
  }
  const auth = getHeader(event, "authorization") ?? "";
  const provided =
    getHeader(event, "x-admin-token") ?? auth.replace(/^Bearer\s+/i, "");
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 401, statusMessage: "Bad admin token" });
  }
}
