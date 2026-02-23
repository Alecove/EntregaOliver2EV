import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/productos'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as any[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 6
  }),

  actions: {
    // 1. Cargar productos con paginación real
    async fetchTasks(page = 1) {
      this.loading = true
      this.currentPage = page
      try {
        const url = `${API_URL}?_page=${page}&_per_page=${this.itemsPerPage}`
        const response = await axios.get(url)
        
        if (response.data && response.data.data) {
          this.tasks = response.data.data
          this.totalPages = response.data.pages
        } else {
          this.tasks = Array.isArray(response.data) ? response.data : []
          this.totalPages = Math.ceil(18 / this.itemsPerPage)
        }
      } catch (err) {
        this.error = 'Error de conexión'
      } finally {
        this.loading = false
      }
    },

    // 2. AÑADIR PRODUCTO (¡Esta es la función que te faltaba!)
    async addTask(task: any) {
      try {
        await axios.post(API_URL, task)
        await this.fetchTasks(this.currentPage)
      } catch (err) {
        this.error = 'Error al añadir'
      }
    },

    // 3. Borrar producto
    async deleteTask(id: any) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        await this.fetchTasks(this.currentPage)
      } catch (err) {
        this.error = 'Error al borrar'
      }
    }
  }
})