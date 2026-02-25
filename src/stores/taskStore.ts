import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/productos'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as any[],    // Catálogo paginado
    allTasks: [] as any[], // Todas las tareas para estadísticas
    loading: false,
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
  }),

  getters: {
    // Definimos totalPages explícitamente para que TS lo vea
    totalPages(state): number {
      return Math.ceil((state.totalItems || 1) / state.itemsPerPage)
    }
  },

  actions: {
    async fetchTasks(page: number = 1, search: string = '', sort: string = '') {
      this.loading = true
      try {
        const response = await axios.get(API_URL)
        let list = response.data
        this.allTasks = list

        if (search.trim()) {
          const q = search.toLowerCase().trim()
          list = list.filter((p: any) => p.title.toLowerCase().includes(q))
        }

        if (sort === 'asc') list.sort((a: any, b: any) => a.price - b.price)
        if (sort === 'desc') list.sort((a: any, b: any) => b.price - a.price)

        this.totalItems = list.length
        this.currentPage = page
        this.tasks = list.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage)
      } catch (e) {
        console.error("Error catálogo:", e)
      } finally {
        this.loading = false
      }
    },

    // Añadimos fetchAllForStats para DashboardView
    async fetchAllForStats() {
      try {
        const response = await axios.get(API_URL)
        this.allTasks = response.data
        this.totalItems = this.allTasks.length
      } catch (e) {
        console.error("Error estadísticas:", e)
      }
    },

    // Añadimos addTask para TasksList y AddTaskForm
    async addTask(product: any) {
      try {
        product.price = Number(product.price)
        await axios.post(API_URL, product)
        await this.fetchTasks(1)
      } catch (e) {
        console.error("Error al añadir:", e)
        throw e
      }
    },

    async deleteTask(id: any) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        await this.fetchTasks(this.currentPage)
        await this.fetchAllForStats()
      } catch (e) {
        console.error(e)
      }
    }
  }
})