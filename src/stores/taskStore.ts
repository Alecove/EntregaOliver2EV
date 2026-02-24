import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    allTasks: [] as any[], // Guardamos todos los productos aquí
    tasks: [] as any[],    // Los productos que se muestran (filtrados)
    loading: false,
    currentPage: 1,
    totalPages: 1
  }),

  actions: {
    // 1. CARGAR DATOS (Solo una vez o cuando se necesite refrescar)
    async fetchTasks(page = 1, search = '', sort = '') {
      this.loading = true
      this.currentPage = page
      
      try {
        // Pedimos los productos limpios al servidor
        const response = await fetch('http://localhost:3000/productos')
        const data = await response.json()
        
        // Guardamos la copia completa
        this.allTasks = Array.isArray(data) ? data : (data.data || [])

        // APLICAMOS FILTROS EN EL FRONTEND (Garantiza que funcione siempre)
        let filtered = [...this.allTasks]

        // Filtro de búsqueda
        if (search) {
          filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(search.toLowerCase())
          )
        }

        // Filtro de orden por precio
        if (sort) {
          filtered.sort((a, b) => {
            return sort === 'asc' ? a.price - b.price : b.price - a.price
          })
        }

        // Lógica de Paginación manual (6 por página)
        const itemsPerPage = 6
        this.totalPages = Math.ceil(filtered.length / itemsPerPage) || 1
        
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        
        // Seteamos los productos finales que verá el componente
        this.tasks = filtered.slice(start, end)

      } catch (error) {
        console.error('Error cargando productos:', error)
        this.tasks = []
      } finally {
        this.loading = false
      }
    },

    // 2. AÑADIR PRODUCTO
    async addTask(newProduct: any) {
      try {
        await fetch('http://localhost:3000/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        })
        await this.fetchTasks(1)
      } catch (error) {
        console.error('Error al añadir:', error)
      }
    },

    // 3. BORRAR PRODUCTO
    async deleteTask(id: string | number) {
      try {
        await fetch(`http://localhost:3000/productos/${id}`, { method: 'DELETE' })
        await this.fetchTasks(this.currentPage)
      } catch (error) {
        console.error('Error al borrar:', error)
      }
    }
  }
})