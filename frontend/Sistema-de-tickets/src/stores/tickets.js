import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: [
      {
        id: 1,
        titulo: 'Error al iniciar sesión',
        creador: 'María López',
        estado: 'Abierto',
        creado: '2025-09-01 09:15',
        modificado: '2025-09-01 10:00',
        descripcion: 'Al intentar iniciar sesión con usuario válido la app lanza un error 500.'
      },
      {
        id: 2,
        titulo: 'Solicitud de nueva funcionalidad',
        creador: 'Juan Pérez',
        estado: 'En proceso',
        creado: '2025-08-28 14:20',
        modificado: '2025-09-02 11:30',
        descripcion: 'Agregar filtrado por fecha en la vista de reportes.'
      },
      {
        id: 3,
        titulo: 'Bug en exportar PDF',
        creador: 'Ana García',
        estado: 'Cerrado',
        creado: '2025-08-15 08:05',
        modificado: '2025-08-20 16:40',
        descripcion: 'El PDF generado no incluye imágenes embebidas.'
      },
      {
        id: 4,
        titulo: 'Mejorar tiempos de respuesta',
        creador: 'Carlos Ruiz',
        estado: 'Abierto',
        creado: '2025-09-03 12:00',
        modificado: '2025-09-03 12:00',
        descripcion: 'Analizar consultas lentas en la pantalla principal.'
      },
      {
        id: 5,
        titulo: 'Error ortográfico en footer',
        creador: 'Laura Torres',
        estado: 'En proceso',
        creado: '2025-09-04 07:45',
        modificado: '2025-09-04 08:10',
        descripcion: 'Corregir "Contáctanos" que aparece mal escrito.'
      }
    ]
  }),
  actions: {
    addTicket(payload) {
      const nextId = this.tickets.length ? Math.max(...this.tickets.map(t=>t.id)) + 1 : 1
      const now = new Date().toISOString().slice(0,16).replace('T',' ')
      const newTicket = {
        id: nextId,
        titulo: payload.titulo,
        creador: payload.creador,
        descripcion: payload.descripcion,
        estado: payload.estado || 'Abierto',
        creado: now,
        modificado: now
      }
      this.tickets.push(newTicket)
      return newTicket
    },
    updateEstado(id, nuevoEstado) {
      const t = this.tickets.find(x => x.id === id)
      if (t) {
        t.estado = nuevoEstado
        t.modificado = new Date().toISOString().slice(0,16).replace('T',' ')
      }
    }
  }
})
