<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const items = [
  { name: 'Inicio', to: '/' },
  { name: 'Tickets', to: '/tickets' },
  { name: 'Configuración', to: '/settings' },
]

const isActive = (to) => computed(() => route.path === to)
</script>

<template>
  <nav class="menu">
    <ul>
      <li v-for="item in items" :key="item.to" :class="{ active: isActive(item.to).value }">
        <router-link :to="item.to">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu ul { list-style: none; padding: 0; margin: 0 }
.menu li { margin: 0.5rem 0 }
.menu a {
  color: inherit;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}
.menu li.active a {
  background: #1e293b; /* darker */
  font-weight: 600;
}
.menu a:hover { background: rgba(255,255,255,0.04) }
</style>
