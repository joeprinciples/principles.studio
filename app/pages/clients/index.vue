<script setup lang="ts">
import { FileText, LogOut, Lock, ArrowRight } from "lucide-vue-next";

interface ReportMeta {
  name: string;
  file: string;
  ext: string;
  title: string;
  date: string;
}

const { loggedIn, user, fetch: refreshSession, clear } = useUserSession();

const client = ref("");
const password = ref("");
const error = ref("");
const submitting = ref(false);

const reports = ref<ReportMeta[]>([]);
const reportsPending = ref(false);

useHead({
  title: "Client Reports — First Principles",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

async function loadReports() {
  reportsPending.value = true;
  try {
    const data = await $fetch<{ reports: ReportMeta[] }>("/api/clients/reports");
    reports.value = data.reports;
  } catch {
    reports.value = [];
  } finally {
    reportsPending.value = false;
  }
}

async function onLogin() {
  error.value = "";
  submitting.value = true;
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { client: client.value.trim().toLowerCase(), password: password.value },
    });
    password.value = "";
    await refreshSession();
    await loadReports();
  } catch (e: any) {
    error.value = e?.data?.statusMessage || "Invalid client or password.";
  } finally {
    submitting.value = false;
  }
}

async function onLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  await clear();
  reports.value = [];
}

function fmtDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

onMounted(() => {
  if (loggedIn.value) loadReports();
});
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
    <!-- Logged out: login card -->
    <div v-if="!loggedIn" class="mx-auto max-w-md">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-400/30"
        >
          <Lock class="h-5 w-5 text-teal-400" />
        </div>
        <h1 class="text-2xl font-bold text-white">Client reports</h1>
        <p class="mt-2 text-sm text-zinc-400">
          Enter your access details to view your reports.
        </p>
      </div>

      <form
        class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
        @submit.prevent="onLogin"
      >
        <label class="mb-1.5 block text-xs font-medium text-zinc-400">Client</label>
        <input
          v-model="client"
          type="text"
          autocomplete="username"
          autocapitalize="none"
          spellcheck="false"
          placeholder="your-company"
          class="mb-4 w-full rounded-lg border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/40"
        />
        <label class="mb-1.5 block text-xs font-medium text-zinc-400">Password</label>
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••••••"
          class="mb-2 w-full rounded-lg border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/40"
        />

        <p v-if="error" class="mb-3 mt-1 text-sm text-red-400">{{ error }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-400 disabled:opacity-60"
        >
          {{ submitting ? "Signing in…" : "View reports" }}
          <ArrowRight v-if="!submitting" class="h-4 w-4" />
        </button>
      </form>
    </div>

    <!-- Logged in: this client's report list -->
    <div v-else>
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm text-teal-400">{{ user?.label }}</p>
          <h1 class="mt-1 text-3xl font-bold text-white">Your reports</h1>
        </div>
        <button
          class="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
          @click="onLogout"
        >
          <LogOut class="h-4 w-4" /> Sign out
        </button>
      </div>

      <p v-if="reportsPending" class="text-sm text-zinc-500">Loading…</p>

      <p
        v-else-if="!reports.length"
        class="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center text-sm text-zinc-500"
      >
        No reports have been published yet.
      </p>

      <ul v-else class="space-y-3">
        <li v-for="r in reports" :key="r.file">
          <a
            :href="`/clients/${user?.client}/${r.name}`"
            class="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-teal-400/40 hover:bg-white/[0.05]"
          >
            <div
              class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-400/20"
            >
              <FileText class="h-5 w-5 text-teal-400" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-white group-hover:text-teal-300">
                {{ r.title }}
              </p>
              <p class="mt-0.5 text-xs text-zinc-500">
                {{ fmtDate(r.date) }}
                <span class="ml-1 uppercase tracking-wide text-zinc-600">· {{ r.ext.slice(1) }}</span>
              </p>
            </div>
            <ArrowRight
              class="h-4 w-4 flex-none text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-teal-400"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
