import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Importamos las vistas
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

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
      meta: { requiresAuth: true } // Protegido por login
    },
    {
      // RUTA: Ficha técnica del producto con parámetro dinámico (:id)
      path: '/admin/producto/:id',
      name: 'ProductDetail',
      component: ProductDetailView,
      meta: { requiresAuth: true } // Protegido por login
    }
  ]
})

// GUARDIA DE NAVEGACIÓN (Protección de rutas)
router.beforeEach((to, from, next) => {
  // Instanciamos el store de autenticación aquí dentro
  const authStore = useAuthStore()

  // Si la ruta requiere estar logueado y el usuario no lo está (usando isLogged)
  if (to.meta.requiresAuth && !authStore.isLogged) {
    next('/login') // ...lo mandamos al login
  } else {
    next() // ...si todo está bien, le dejamos pasar
  }
})

export default router