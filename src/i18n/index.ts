import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    // --- Cabecera ---
    welcome: 'Tienda de Tecnología',
    login: 'Entrar',
    logout: 'Salir',
    admin: 'Catálogo',
    admin_title: 'Gestión de Stock',
    new_product: 'CREAR PRODUCTO',
    search: '¿Qué estás buscando?',

    // --- Pantalla de Inicio (NUEVO Y BONITO) ---
    home_title: 'Gestiona tu Stock con Estilo',
    home_description: 'La solución más sencilla y profesional para el control de tu inventario en tiempo real.',
    go_to_login: 'EMPEZAR AHORA'
  },
  en: {
    // --- Header ---
    welcome: 'Tech Store',
    login: 'Login',
    logout: 'Logout',
    admin: 'Catalog',
    admin_title: 'Stock Management',
    new_product: 'CREATE PRODUCT',
    search: 'What are you looking for?',

    // --- Home Screen ---
    home_title: 'Manage Your Stock with Style',
    home_description: 'The simplest and most professional solution for real-time inventory control.',
    go_to_login: 'GET STARTED'
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages
})