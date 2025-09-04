<script setup>
import { ref } from 'vue'
import { useTicketsStore } from '../../stores/tickets'

const store = useTicketsStore()

const tickets = store.tickets

const selected = ref(null)
const showModal = ref(false)

function openDetail(ticket) {
	selected.value = { ...ticket }
	showModal.value = true
}

function closeModal() {
	showModal.value = false
	selected.value = null
}

function toggleEstado(nuevoEstado) {
	if (!selected.value) return
	store.updateEstado(selected.value.id, nuevoEstado)
	// actualizar la selección local
	selected.value.estado = nuevoEstado
	selected.value.modificado = store.tickets.find(t => t.id === selected.value.id).modificado
}
</script>

<template>
	<div>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead class="table-dark">
					<tr>
						<th>Título</th>
						<th>Creado por</th>
						<th>Estado</th>
						<th>Creado</th>
						<th>Última modificación</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="t in tickets" :key="t.id">
						<td>{{ t.titulo }}</td>
						<td>{{ t.creador }}</td>
						<td>
							<span class="badge" :class="{
								'bg-success': t.estado === 'Cerrado',
								'bg-warning text-dark': t.estado === 'En proceso',
								'bg-primary': t.estado === 'Abierto'
							}">{{ t.estado }}</span>
						</td>
						<td>{{ t.creado }}</td>
						<td>{{ t.modificado }}</td>
						<td class="text-end">
							<button class="btn btn-sm btn-outline-primary" @click="openDetail(t)">Abrir</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Modal simple usando clases Bootstrap -->
		<div class="modal fade" :class="{ show: showModal }" style="display: block;" v-if="showModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Detalle: {{ selected.titulo }}</h5>
						<button type="button" class="btn-close" aria-label="Close" @click="closeModal()"></button>
					</div>
					<div class="modal-body">
						<p><strong>Creado por:</strong> {{ selected.creador }}</p>
						<p><strong>Estado:</strong> <span class="badge" :class="{
								'bg-success': selected.estado === 'Cerrado',
								'bg-warning text-dark': selected.estado === 'En proceso',
								'bg-primary': selected.estado === 'Abierto'
							}">{{ selected.estado }}</span></p>
						<p><strong>Creado:</strong> {{ selected.creado }}</p>
						<p><strong>Última modificación:</strong> {{ selected.modificado }}</p>
						<hr />
						<p>{{ selected.descripcion }}</p>
					</div>
					<div class="modal-footer">
						<button class="btn btn-sm btn-secondary" @click="closeModal">Cerrar</button>
						<button class="btn btn-sm btn-outline-warning" @click="toggleEstado('En proceso')">Marcar En proceso</button>
						<button class="btn btn-sm btn-outline-success" @click="toggleEstado('Cerrado')">Marcar Cerrado</button>
					</div>
				</div>
			</div>
		</div>

		<!-- backdrop para modal -->
		<div class="modal-backdrop fade show" v-if="showModal"></div>
	</div>
</template>

<style scoped>
/* Ajustes menores para simular comportamiento modal sin JS de Bootstrap */
.modal { display: none; }
.modal.show { display: block; background: rgba(0,0,0,0.0); }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1040; }
.modal { z-index: 1050; }
.modal-dialog { margin-top: 6vh; }
</style>

