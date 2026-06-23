<template>
  <main class="app-shell">
    <section class="intro">
      <p>Behance Skripsi</p>
      <h1>Nuxt app is ready.</h1>
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: #f7f7f2;
  color: #1f2933;
}

.intro {
  width: min(100% - 32px, 720px);
}

p {
  margin: 0 0 12px;
  color: #58606a;
  font-size: 0.95rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  line-height: 1;
}
</style>
