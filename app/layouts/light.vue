<template>
  <!-- Opaque "paper" surface that covers the global MeshGradient (app.vue),
       inverting the site: dark chrome + light text becomes light page + dark ink.
       The mesh only shows through knockout headings (.text-mesh). -->
  <div class="min-h-screen bg-[#edeef3] text-[#0e0d17]">
    <SiteHeader theme="light" />
    <main>
      <slot />
    </main>
    <SiteFooter theme="light" />
  </div>
</template>
