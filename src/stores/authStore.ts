import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLogged: false,
    userRole: '',
    userEmail: ''
  }),

  actions: {
    // 🚨 Aquí le decimos a TypeScript que vamos a recibir 2 argumentos (correo y rol)
    login(email: string, role: string) {
      this.isLogged = true
      this.userEmail = email
      this.userRole = role
    },
    
    logout() {
      this.isLogged = false
      this.userRole = ''
      this.userEmail = ''
    }
  }
})