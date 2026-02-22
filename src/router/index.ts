import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // Importamos el store
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { 
      path: '/admin', 
      name: 'admin', 
      component: AdminView,
      meta: { requiresAuth: true } // Marcamos que esta ruta necesita login
    }
  ]
})

// --- GUARDIA DE SEGURIDAD ---
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Si la ruta requiere auth y no estamos logueados, al login
  if (to.meta.requiresAuth && !auth.isLogged) {
    next('/login')
  } else {
    next() // Si todo ok, adelante
  }
})

export default router