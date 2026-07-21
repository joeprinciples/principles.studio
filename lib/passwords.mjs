// Single source of truth for client-password hashing, imported by BOTH the
// server (server/utils/passwords.ts re-exports this) and the CLIs
// (scripts/*.mjs). Keep it dependency-free (node:crypto only) so the plain-node
// scripts and the bundled Nitro server produce/verify identical hashes.
//
// Format: scrypt$<N>$<r>$<p>$<saltBase64>$<keyBase64>
import { scrypt as _scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);

const N = 16384; // CPU/memory cost
const R = 8; // block size
const P = 1; // parallelisation
const KEYLEN = 64;

/** Hash a plaintext password into a self-describing scrypt string. */
export async function hashClientPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString(
    "base64"
  )}`;
}

/** Constant-time verify of a plaintext password against a stored hash. */
export async function verifyClientPassword(stored, password) {
  if (typeof stored !== "string") return false;
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, nStr, rStr, pStr, saltB64, keyB64] = parts;
  const params = { N: Number(nStr), r: Number(rStr), p: Number(pStr) };
  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(keyB64, "base64");
  const actual = await scrypt(password, salt, expected.length, params);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
