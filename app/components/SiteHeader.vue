<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav
      class="mx-auto max-w-7xl flex items-center px-6 py-8 lg:px-8 lg:py-12"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5 group flex items-center gap-3">
          <img
            src="/fp-logo.png"
            alt="first principles logo"
            class="h-10 w-auto"
          />
          <span
            class="text-2xl font-extrabold tracking-tight text-white transition group-hover:text-teal-400"
          >
            first principles
          </span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
