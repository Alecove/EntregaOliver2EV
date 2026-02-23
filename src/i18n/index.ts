import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    welcome: 'Gestor de Inventario',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    admin: 'Panel de Administración',
    tasks: 'Catálogo de Productos',
    categories: 'Familias / Categorías',
    
    // Contenido de la Home
    home_title: 'Tu Tienda en Línea',
    home_description: 'Bienvenido a tu sistema de gestión de stock profesional desarrollado con Vue 3 y Vuetify.',
    adminDesc: 'Gestiona el stock, los precios y el catálogo de tu tienda.'
  },
  en: {
    welcome: 'Inventory Manager',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin Dashboard',
    tasks: 'Product Catalog',
    categories: 'Categories / Families',
    
    // Contenido de la Home
    home_title: 'Your Online Store',
    home_description: 'Welcome to your professional stock management system built with Vue 3 and Vuetify.',
    adminDesc: 'Manage your store stock, prices, and catalog.'
  }
}

const i18n = createI18n({
  legacy: false, // Necesario para Vue 3 Composition API
  locale: 'es',  // Idioma por defecto
  fallbackLocale: 'en',
  messages
})

export default i18n