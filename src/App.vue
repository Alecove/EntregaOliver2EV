<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useTheme } from 'vuetify'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const theme = useTheme()

// Único punto extra: Modo oscuro
const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const salir = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" v-if="route.name !== 'login'">
      <v-toolbar-title class="font-weight-bold">Tienda de Tecnología</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="cambiarTema">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <div v-if="authStore.isLogged" class="d-flex align-center">
        <v-btn to="/admin" :variant="route.path === '/admin' ? 'elevated' : 'text'" class="mx-1">
          Catálogo
        </v-btn>
        
        <v-btn to="/categorias" :variant="route.path === '/categorias' ? 'elevated' : 'text'" class="mx-1">
          Categorías
        </v-btn>

        <v-btn color="error" variant="flat" @click="salir" class="ml-4">
          Salir
        </v-btn>
      </div>

      <div v-else>
        <v-btn to="/login" variant="outlined" class="ml-2">
          Iniciar Sesión
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer color="primary" class="text-center d-flex flex-column pa-3" v-if="route.name !== 'login'" app>
      <div>© 2026 - Oliver Trabajo 2EV</div>
    </v-footer>
  </v-app>
</template>