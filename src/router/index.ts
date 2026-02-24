import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Importamos las vistas
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import DashboardView from '../views/DashboardView.vue' // Importamos el nuevo Dashboard

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, role: 'admin' } // Requisito 76: Protegido por rol
    },
    {
      // NUEVA RUTA: Dashboard de estadísticas (Punto Extra 87)
      path: '/admin/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, role: 'admin' } 
    },
    {
      path: '/admin/producto/:id',
      name: 'ProductDetail',
      component: ProductDetailView,
      meta: { requiresAuth: true, role: 'admin' }
    }
  ]
})

// GUARDIA DE NAVEGACIÓN (Protección avanzada de rutas)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Verificamos si la ruta requiere estar logueado (Requisito 75)
  if (to.meta.requiresAuth && !authStore.isLogged) {
    next('/login') 
  } 
  // 2. Verificamos si el usuario tiene el ROL adecuado (Requisito 76)
  else if (to.meta.role && authStore.userRole !== to.meta.role) {
    // Si intenta entrar en admin sin ser admin, lo devolvemos a casa
    next('/')
  } 
  else {
    next() // Si cumple todo, adelante
  }
})

export default router