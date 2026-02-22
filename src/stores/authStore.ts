import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const isLogged = ref(false)
  const userRole = ref<'admin' | 'editor' | null>(null) // Guardamos el rol
  const router = useRouter()

  function login(role: 'admin' | 'editor') {
    isLogged.value = true
    userRole.value = role // Asignamos el rol al entrar
    router.push('/admin')
  }

  function logout() {
    isLogged.value = false
    userRole.value = null
    router.push('/login')
  }

  return { isLogged, userRole, login, logout }
})