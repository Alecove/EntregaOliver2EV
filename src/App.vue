<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Función para cerrar sesión (opcional si ya la tienes)
const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="3">
      <v-app-bar-title class="font-weight-bold">
        <v-icon start icon="mdi-store"></v-icon>
        Gestor de Inventario
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-if="authStore.isLogged">
        <v-btn to="/admin" prepend-icon="mdi-format-list-bulleted" variant="text" class="mx-1">
          Gestión
        </v-btn>

        <v-btn 
          v-if="authStore.userRole === 'admin'" 
          to="/admin/dashboard" 
          prepend-icon="mdi-view-dashboard" 
          color="secondary"
          variant="elevated"
          rounded="pill"
          class="mx-2 px-4"
        >
          Estadísticas
        </v-btn>

        <v-btn icon @click="handleLogout" title="Cerrar Sesión">
          <v-icon icon="mdi-logout"></v-icon>
        </v-btn>
      </template>

      <v-btn v-else to="/login" prepend-icon="mdi-login" variant="outlined" class="mx-2">
        Iniciar Sesión
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <RouterView />
    </v-main>

    <v-footer class="text-center d-flex flex-column bg-primary-darken-1 py-4">
      <div class="text-caption">
        © 2026 - Oliver Trabajo 2EV [cite: 9]
      </div>
    </v-footer>
  </v-app>
</template>

<style>
/* Estilos globales para que la tipografía se vea pro */
body {
  font-family: 'Inter', sans-serif !important;
}
</style>