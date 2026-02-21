import { useOrganizationSchema } from "./app/composables/useSchema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap"],
  site: {
    url: "https://principles.studio",
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  ssr: true,
  nitro: {
    preset: "static",
  },
  app: {
    head: {
      title: "first principles - Independent Product & Software Studio",
      htmlAttrs: {
        lang: "en",
        class: "dark",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "first principles is an independent product and software studio based in Nottingham. Building focused, useful software from first principles.",
        },
        // Open Graph
        {
          property: "og:title",
          content: "first principles - Independent Product & Software Studio",
        },
        {
          property: "og:description",
          content:
            "Independent product and software studio based in Nottingham, working with clients across the UK. User-centred design and development.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://principles.studio" },
        {
          property: "og:image",
          content: "https://principles.studio/og-image.png",
        },
        { property: "og:locale", content: "en_GB" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "first principles - Independent Product & Software Studio",
        },
        {
          name: "twitter:description",
          content:
            "Independent product and software studio based in Nottingham. User-centred design and development.",
        },
        {
          name: "twitter:image",
          content: "https://principles.studio/og-image.png",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          rel: "canonical",
          href: "https://principles.studio",
        },
      ],
      script: [
        {
          src: "https://cloud.umami.is/script.js",
          defer: true,
          "data-website-id": "eecb36d5-8141-41df-bd22-fa1ff0da2316",
        },
        useOrganizationSchema(),
      ],
    },
  },
});
