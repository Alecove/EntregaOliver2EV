import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    // General y Header
    welcome: 'Bienvenido a la App de Tareas',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    admin: 'Panel de Administración',
    tasks: 'Gestión de Tareas',
    categories: 'Categorías',
    
    // Contenido de la Home
    home_title: 'Página Principal Pública',
    home_description: 'Bienvenido a tu gestor de tareas profesional desarrollado con Vue 3 y Vuetify.',
    go_to_login: 'Ir al Login'
  },
  en: {
    // General and Header
    welcome: 'Welcome to the Tasks App',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin Panel',
    tasks: 'Task Management',
    categories: 'Categories',
    
    // Home Content
    home_title: 'Public Home Page',
    home_description: 'Welcome to your professional task manager developed with Vue 3 and Vuetify.',
    go_to_login: 'Go to Login'
  }
}

const i18n = createI18n({
  legacy: false, // Obligatorio para Vue 3
  locale: 'es',   // Idioma por defecto
  fallbackLocale: 'en', // Idioma de reserva
  messages,
})

export default i18n