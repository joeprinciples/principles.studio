// Re-export the shared scrypt hashing so it is auto-imported in server routes
// (as hashClientPassword / verifyClientPassword) while the CLIs import the same
// implementation directly from lib/passwords.mjs. One implementation, no drift.
// @ts-expect-error — plain .mjs module, no types needed.
export { hashClientPassword, verifyClientPassword } from "../../lib/passwords.mjs";
