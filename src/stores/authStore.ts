import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLogged: false,
    userRole: '' as 'admin' | 'user' | ''
  }),
  
  actions: {
    login(email: string, pass: string) {
      const emailLower = email.trim().toLowerCase()

      // 🛡️ CASO 1: ADMINISTRADOR
      // El correo empieza por "admin" Y la contraseña tiene que ser OBLIGATORIAMENTE "admin"
      if (emailLower.startsWith('admin')) {
        if (pass === 'admin') {
          this.isLogged = true
          this.userRole = 'admin'
          return true
        }
        // Si empieza por admin pero la clave no es "admin", le denegamos el acceso
        return false 
      }
      
      // 👤 CASO 2: USUARIO NORMAL
      // El correo NO empieza por "admin" y ha escrito CUALQUIER contraseña (que no esté vacía)
      if (emailLower.length > 0 && pass.length > 0) {
        this.isLogged = true
        this.userRole = 'user'
        return true
      }
      
      // Si llega aquí (ej: campos en blanco), falla
      return false
    },

    logout() {
      this.isLogged = false
      this.userRole = ''
    }
  }
})