import { useOrganizationSchema } from "./app/composables/useSchema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap", "nuxt-auth-utils"],
  site: {
    url: "https://principles.studio",
    trailingSlash: true,
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  ssr: true,
  // Deployed as a Node server on Coolify/Hetzner (see DEPLOY.md). Marketing pages
  // are prerendered at build time and served as static HTML; the server exists
  // only for the gated client area (/clients/*) and the admin publish API.
  nitro: {
    preset: "node-server",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      // The client area is dynamic + auth-gated — never prerender it.
      ignore: ["/clients"],
    },
  },
  routeRules: {
    // Gated, per-request, never cached at the edge.
    "/clients/**": {
      ssr: true,
      prerender: false,
      headers: { "cache-control": "no-store" },
    },
  },
  runtimeConfig: {
    // Long random secret guarding /api/admin/* (publish + client management).
    // Admin endpoints fail closed (401) until this is set. Override with NUXT_ADMIN_TOKEN.
    adminToken: "",
    // Absolute path to the persistent volume holding client reports + clients.json.
    // Empty here → resolved to ./.data for local dev. In prod set NUXT_CLIENT_DATA_DIR=/data.
    clientDataDir: "",
    // nuxt-auth-utils reads NUXT_SESSION_PASSWORD from env automatically.
    session: {
      // Client stays signed in for 30 days.
      maxAge: 60 * 60 * 24 * 30,
    },
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
