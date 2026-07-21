# Principles Studio site — Nuxt 4 deployed as a Node server (see DEPLOY.md).
# Marketing pages are prerendered during build; the Node runtime serves them plus
# the gated /clients area and the admin publish API. Reports live on the /data
# volume, never in the image.

FROM node:22-bookworm-slim AS build
WORKDIR /app
# Nitro's prerenderer can exceed Node's default heap on a small VPS.
ENV NODE_OPTIONS=--max-old-space-size=3072
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
