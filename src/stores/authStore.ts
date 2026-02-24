import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLogged: false,
    userRole: '' as 'admin' | 'user' | ''
  }),
  actions: {
    login(email: string, pass: string) {
      // Simulación de login para el profesor
      if (email === 'admin@admin.com' && pass === 'admin') {
        this.isLogged = true
        this.userRole = 'admin' // Esto activa el botón de estadísticas
        return true
      }
      return false
    },
    logout() {
      this.isLogged = false
      this.userRole = ''
    }
  }
})