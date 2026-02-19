<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8 lg:py-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            AI Task Manager
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            A lightweight task management panel for VS Code, Cursor, and other
            editors. Track tasks across multiple projects using simple Markdown
            files — designed to work seamlessly with AI coding assistants.
          </p>
          <div class="mt-4">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=FirstPrinciples.ai-task-manager"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-[#0e0d17]/60 px-4 py-2 text-sm text-white hover:bg-teal-500/20 transition"
            >
              Available on VS Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshots -->
    <section
      class="py-24 sm:py-32"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <figure v-for="shot in screenshots" :key="shot.src" class="max-w-[650px]">
            <img
              :src="shot.src"
              :alt="shot.caption"
              class="w-full rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <figcaption class="mt-3 text-sm not-italic text-white/75">
              {{ shot.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="py-24 sm:py-32"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl">
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
    src: "/screenshots/ai-task-manager/1.png",
    caption: "Tasks appear in a dedicated sidebar panel, giving you an overview of all your projects at a glance.",
  },
  {
    src: "/screenshots/ai-task-manager/2.png",
    caption: "Select a project to expand its full task list — with statuses, priorities, and timestamps.",
  },
  {
    src: "/screenshots/ai-task-manager/3.png",
    caption: "Right-click any task to change its status, update its priority, or remove it.",
  },
  {
    src: "/screenshots/ai-task-manager/4.png",
    caption: "All task data lives in a single Markdown file per project — easy to read, edit, and version control.",
  },
];

const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

const faqs = [
  {
    question: "What is AI Task Manager?",
    answer:
      "AI Task Manager is a VS Code extension that gives you a visual task panel powered by simple Markdown files. It\u2019s designed to work alongside AI coding assistants like Claude, GPT, and Copilot \u2014 they can read and update your tasks as they work.",
  },
  {
    question: "How does it work with AI assistants?",
    answer:
      "Tasks are stored as Markdown files with JSON frontmatter in a ~/.ai-tasks/ directory. AI assistants can read these files to understand what you\u2019re working on, update task statuses as they complete work, and add new tasks when they discover follow-up items.",
  },
  {
    question: "What\u2019s the file format?",
    answer:
      "Each project gets a single Markdown file with JSON frontmatter containing the project name, path, and an array of tasks. Each task has an ID, title, status (todo/doing/done), priority, and optional fields like grep keywords and related documents. The Markdown body holds project context notes.",
  },
  {
    question: "Which editors are supported?",
    answer:
      "AI Task Manager is available on the VS Code Marketplace and works in VS Code, Cursor, Windsurf, and any editor that supports VS Code extensions.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. AI Task Manager is completely free and open source.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "All task data is stored locally in Markdown files on your machine. There are no accounts, no cloud sync, and no telemetry. You own your data completely.",
  },
];

useHead({
  title: "AI Task Manager \u2014 VS Code Extension | first principles",
  meta: [
    {
      name: "description",
      content:
        "A lightweight task management panel for VS Code, Cursor, and other editors. Track tasks across multiple projects using Markdown files that AI coding assistants can read and update.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: "AI Task Manager",
            description:
              "A lightweight task management panel for VS Code, Cursor, and other editors. Track tasks across multiple projects using simple Markdown files designed to work seamlessly with AI coding assistants.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Windows, macOS, Linux",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            author: {
              "@type": "Organization",
              name: "First Principles Studio Ltd",
              url: "https://firstprinciples.studio",
            },
          },
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is AI Task Manager?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI Task Manager is a VS Code extension that gives you a visual task panel powered by simple Markdown files. It\u2019s designed to work alongside AI coding assistants like Claude, GPT, and Copilot \u2014 they can read and update your tasks as they work.",
                },
              },
              {
                "@type": "Question",
                name: "How does it work with AI assistants?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tasks are stored as Markdown files with JSON frontmatter in a ~/.ai-tasks/ directory. AI assistants can read these files to understand what you\u2019re working on, update task statuses as they complete work, and add new tasks when they discover follow-up items.",
                },
              },
              {
                "@type": "Question",
                name: "What\u2019s the file format?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each project gets a single Markdown file with JSON frontmatter containing the project name, path, and an array of tasks. Each task has an ID, title, status, priority, and optional fields like grep keywords and related documents.",
                },
              },
              {
                "@type": "Question",
                name: "Which editors are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI Task Manager is available on the VS Code Marketplace and works in VS Code, Cursor, Windsurf, and any editor that supports VS Code extensions.",
                },
              },
              {
                "@type": "Question",
                name: "Is it free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. AI Task Manager is completely free and open source.",
                },
              },
              {
                "@type": "Question",
                name: "Where is my data stored?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All task data is stored locally in Markdown files on your machine. There are no accounts, no cloud sync, and no telemetry. You own your data completely.",
                },
              },
            ],
          },
        ],
      }),
    },
  ],
});
</script>
