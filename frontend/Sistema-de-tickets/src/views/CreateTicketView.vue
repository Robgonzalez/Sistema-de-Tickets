<script setup>
import { ref } from 'vue'
import { useTicketsStore } from '../stores/tickets'
import { useRouter } from 'vue-router'

const store = useTicketsStore()
const router = useRouter()

const titulo = ref('')
const creador = ref('')
const descripcion = ref('')
const error = ref('')

function submit() {
  error.value = ''
  if (!titulo.value || !creador.value) {
    error.value = 'El título y el creador son obligatorios.'
    return
  }
  // El store asigna estado por defecto 'Abierto'
  store.addTicket({ titulo: titulo.value, creador: creador.value, descripcion: descripcion.value })
  // limpiar y navegar a tickets
  titulo.value = ''
  creador.value = ''
  descripcion.value = ''
  router.push('/tickets')
}
</script>

<template>
  <section>
    <h1>Creación de tickets</h1>

    <div class="card p-3">
      <div class="mb-3">
        <label class="form-label">Título</label>
        <input class="form-control" v-model="titulo" />
      </div>

      <div class="mb-3">
        <label class="form-label">Creado por</label>
        <input class="form-control" v-model="creador" />
      </div>

      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" rows="4" v-model="descripcion"></textarea>
      </div>

  <!-- Estado eliminado: los tickets se crean siempre como 'Abierto' -->

      <div class="d-flex gap-2">
        <button class="btn btn-primary" @click="submit">Crear ticket</button>
        <router-link class="btn btn-outline-secondary" to="/tickets">Cancelar</router-link>
      </div>

      <div class="mt-3 text-danger" v-if="error">{{ error }}</div>
    </div>
  </section>
</template>

<style scoped>
h1 { margin-bottom: 1rem }
.card { max-width: 780px }
</style>
