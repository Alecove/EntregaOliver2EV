import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/categorias'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [] as any[],
    loading: false
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await axios.get(API_URL)
        this.categories = response.data
      } catch (error) {
        console.error("Error al cargar categorías", error)
      } finally {
        this.loading = false
      }
    },

    async addCategory(category: any) {
      try {
        await axios.post(API_URL, category)
        await this.fetchCategories() // Recargamos tras añadir
      } catch (error) {
        console.error("Error al añadir categoría", error)
      }
    },

    async deleteCategory(id: any) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        await this.fetchCategories()
      } catch (error) {
        console.error("Error al borrar", error)
      }
    }
  }
})