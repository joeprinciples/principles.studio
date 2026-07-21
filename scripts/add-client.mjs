#!/usr/bin/env node
// Create / update a client login.
//
//   Local (writes .data/clients/clients.json for dev):
//     node scripts/add-client.mjs greenfields --label "Greenfields" --local
//
//   Production (POSTs the *hash* to the live admin API — plaintext never leaves
//   this machine). Needs PRINCIPLES_ADMIN_URL + PRINCIPLES_ADMIN_TOKEN in env:
//     node scripts/add-client.mjs greenfields --label "Greenfields"
//
// Password is read from the PASSWORD env var if set, otherwise prompted (hidden).
import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";
import { hashClientPassword } from "../lib/passwords.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_DIR = join(__dirname, "..");

const args = process.argv.slice(2);
const client = (args[0] || "").trim().toLowerCase();
const flag = (name, def = undefined) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : def;
};
const local = args.includes("--local");
const label = flag("label") || client;

if (!/^[a-z0-9][a-z0-9-]*$/.test(client)) {
  console.error("Usage: add-client <slug> [--label \"Name\"] [--local]");
  process.exit(1);
}

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const stdout = process.stdout;
    rl.question(question, (answer) => {
      rl.close();
      stdout.write("\n");
      resolve(answer);
    });
    rl._writeToOutput = (str) => {
      if (str.includes(question)) stdout.write(str);
      else stdout.write("*");
    };
  });
}

const dataDir = process.env.NUXT_CLIENT_DATA_DIR || join(SITE_DIR, ".data");

async function main() {
  let password = process.env.PASSWORD;
  if (!password) password = await promptHidden(`Password for "${client}": `);
  if (!password || password.length < 4) {
    console.error("Password too short.");
    process.exit(1);
  }
  const passwordHash = await hashClientPassword(password);

  if (local) {
    const file = join(dataDir, "clients", "clients.json");
    await fs.mkdir(join(dataDir, "clients"), { recursive: true });
    const all = existsSync(file) ? JSON.parse(await fs.readFile(file, "utf8")) : {};
    all[client] = { label, passwordHash };
    await fs.writeFile(file, JSON.stringify(all, null, 2) + "\n", "utf8");
    console.log(`✔ ${client} written to ${file}`);
    return;
  }

  const base = process.env.PRINCIPLES_ADMIN_URL;
  const token = process.env.PRINCIPLES_ADMIN_TOKEN;
  if (!base || !token) {
    console.error("Set PRINCIPLES_ADMIN_URL and PRINCIPLES_ADMIN_TOKEN (or use --local).");
    process.exit(1);
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/api/admin/clients`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-admin-token": token },
    body: JSON.stringify({ client, label, passwordHash }),
  });
  if (!res.ok) {
    console.error(`Failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  console.log(`✔ ${client} saved on ${base}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
