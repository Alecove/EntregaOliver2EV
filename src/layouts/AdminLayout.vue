<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useTheme } from 'vuetify'

const { locale } = useI18n()
const auth = useAuthStore()
const theme = useTheme()

// Variable para controlar si se muestra la ventanita bonita
const showLogoutDialog = ref(false)

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// Función real para salir
const confirmLogout = () => {
  showLogoutDialog.value = false
  auth.logout()
}
</script>

<template>
  <v-app-bar color="dark">
    <v-app-bar-title>Panel de Control</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn icon @click="toggleTheme" class="mr-2">
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn variant="tonal" class="mr-4" @click="toggleLanguage">
      {{ locale === 'es' ? 'EN' : 'ES' }}
    </v-btn>

    <v-btn icon="mdi-logout" variant="text" @click="showLogoutDialog = true"></v-btn>
  </v-app-bar>

  <v-main>
    <v-breadcrumbs :items="['Inicio', 'Administración', 'Gestión']" class="mb-4"></v-breadcrumbs>
    <slot></slot>
  </v-main>

  <v-footer app color="dark" class="justify-space-between px-4">
    <span>Administración de Tareas</span>
    <span>Modo: {{ auth.userRole?.toUpperCase() }}</span>
  </v-footer>

  <v-dialog v-model="showLogoutDialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-logout" title="Cerrar Sesión">
      <v-card-text>
        ¿Estás seguro de que deseas salir del panel de administración?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="showLogoutDialog = false">
          Cancelar
        </v-btn>
        <v-btn color="error" variant="flat" @click="confirmLogout">
          Salir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>