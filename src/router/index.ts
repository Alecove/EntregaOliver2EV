import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Importamos las vistas
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import DashboardView from '../views/DashboardView.vue'

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
      // 👇 AQUÍ ESTÁ LA CLAVE: Ya no exigimos "role: 'admin'"
      meta: { requiresAuth: true } 
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: DashboardView,
      // El Dashboard SÍ sigue siendo solo para el administrador
      meta: { requiresAuth: true, role: 'admin' } 
    },
    {
      path: '/admin/producto/:id',
      name: 'ProductDetail',
      component: ProductDetailView,
      meta: { requiresAuth: true }
    }
  ]
})

// GUARDIA DE NAVEGACIÓN
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Si la ruta necesita login y no estás logueado -> Al login
  if (to.meta.requiresAuth && !authStore.isLogged) {
    next('/login') 
  } 
  // 2. Si la ruta necesita un rol específico y NO lo tienes -> Te expulsa al inicio
  else if (to.meta.role && authStore.userRole !== to.meta.role) {
    next('/')
  } 
  else {
    next() 
  }
})

export default router