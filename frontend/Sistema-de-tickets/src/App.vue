<script setup>
import { RouterView } from 'vue-router'
import SidebarMenu from './components/sidebar/SidebarMenu.vue'
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <SidebarMenu />
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #0f172a; /* slate-900 */
  color: #e6eef8;
  padding: 1rem;
}

.content {
  flex: 1;
  padding: 1.5rem;
  background: #f8fafc;
}

@media (max-width: 640px) {
  .app-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
