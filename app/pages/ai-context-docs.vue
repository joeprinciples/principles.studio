<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 pt-32 pb-0 sm:pt-48 lg:px-8 lg:pt-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            AI Context Docs
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            A VS Code extension that maintains a .context/ folder mapping your
            codebase for AI assistants. Modules describe what each part of your
            project does, which files belong to it, and when it was last updated
            — so any AI can orient itself instantly.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=FirstPrinciples.ai-codebase-context"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              VS Code Marketplace
            </a>
            <a
              href="https://open-vsx.org/extension/FirstPrinciples/ai-codebase-context"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              Open VSX (Cursor)
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshots -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10">
          <figure
            v-for="shot in screenshots"
            :key="shot.src"
            class="max-w-[890px]"
          >
            <img
              :src="shot.src"
              :alt="shot.caption"
              class="w-full rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <figcaption
              class="mt-3 text-base not-italic text-white/75 sm:text-lg"
            >
              {{ shot.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-4xl">
          <h2
            class="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Frequently asked questions
          </h2>
          <dl class="mt-16 divide-y divide-white/10">
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              class="py-8 first:pt-0 last:pb-0"
            >
              <dt>
                <button
                  class="flex w-full items-start justify-between text-left text-white"
                  @click="toggleFaq(index)"
                >
                  <span class="text-lg font-bold sm:text-xl">{{
                    faq.question
                  }}</span>
                  <span class="ml-6 flex h-7 items-center">
                    <Plus
                      v-if="openFaq !== index"
                      class="size-6"
                      aria-hidden="true"
                    />
                    <Minus v-else class="size-6" aria-hidden="true" />
                  </span>
                </button>
              </dt>
              <dd v-if="openFaq === index" class="mt-4 pr-12">
                <p class="text-base/7 text-white/80 sm:text-lg/8">
                  {{ faq.answer }}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Plus, Minus } from "lucide-vue-next";

const screenshots = [
  {
    src: "/screenshots/ai-context-docs/1.png",
    caption:
      "The Context Map panel shows your project overview, modules, categories, and tracked files with staleness indicators.",
  },
];

const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

const faqs = [
  {
    question: "What is AI Context Docs?",
    answer:
      "AI Context Docs is a VS Code extension that creates and maintains a .context/ folder in your project. This folder contains module files that describe what each part of your codebase does, which files belong to it, and when it was last updated — giving any AI assistant instant orientation.",
  },
  {
    question: "How does it work with AI assistants?",
    answer:
      "The .context/ folder contains structured markdown files with JSON frontmatter. AI assistants like Claude Code, Cursor, Copilot, and Windsurf can read these files to understand your project structure, then update them as they make changes. It also integrates with CLAUDE.md to automatically inject context management instructions.",
  },
  {
    question: "What does the .context/ folder contain?",
    answer:
      "An _overview.md file with the project summary and module index, a _config.json with scan settings and category mappings, and individual module files organised by category (frontend, backend, shared, assets). Each module file has JSON frontmatter listing tracked files and a markdown body for architecture notes and patterns.",
  },
  {
    question: "How does staleness tracking work?",
    answer:
      "The extension watches your source files for changes. When a tracked file is modified after its module was last updated, that module is flagged as stale in the sidebar. This helps you and your AI assistants know which documentation needs refreshing.",
  },
  {
    question: "Which editors are supported?",
    answer:
      "AI Context Docs is available on the VS Code Marketplace and Open VSX Registry, and works in VS Code, Cursor, Windsurf, and any editor that supports VS Code extensions.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. AI Context Docs is free and open source under the MIT license with Commons Clause.",
  },
];

useHead({
  title: "AI Context Docs — VS Code Extension | first principles",
  meta: [
    {
      name: "description",
      content:
        "A VS Code extension that maintains a .context/ folder mapping your codebase for AI assistants. Auto-scans project structure, tracks staleness, and integrates with Claude Code, Cursor, and Copilot.",
    },
  ],
  script: [
    useProductSchema({
      name: "AI Context Docs",
      description:
        "A VS Code extension that maintains a .context/ folder mapping your codebase for AI assistants. Auto-scans project structure, creates categorised module files, and tracks staleness so documentation stays fresh.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux",
      faqs: [
        { question: "What is AI Context Docs?", answer: "AI Context Docs is a VS Code extension that creates and maintains a .context/ folder in your project. This folder contains module files that describe what each part of your codebase does, which files belong to it, and when it was last updated — giving any AI assistant instant orientation." },
        { question: "How does it work with AI assistants?", answer: "The .context/ folder contains structured markdown files with JSON frontmatter. AI assistants like Claude Code, Cursor, Copilot, and Windsurf can read these files to understand your project structure, then update them as they make changes." },
        { question: "What does the .context/ folder contain?", answer: "An _overview.md file with the project summary and module index, a _config.json with scan settings and category mappings, and individual module files organised by category. Each module file has JSON frontmatter listing tracked files and a markdown body for architecture notes." },
        { question: "How does staleness tracking work?", answer: "The extension watches your source files for changes. When a tracked file is modified after its module was last updated, that module is flagged as stale in the sidebar." },
        { question: "Which editors are supported?", answer: "AI Context Docs is available on the VS Code Marketplace and Open VSX Registry, and works in VS Code, Cursor, Windsurf, and any editor that supports VS Code extensions." },
        { question: "Is it free?", answer: "Yes. AI Context Docs is free and open source under the MIT license with Commons Clause." },
      ],
    }),
  ],
});
</script>
