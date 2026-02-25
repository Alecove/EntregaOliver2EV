<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n' 

const authStore = useAuthStore()
const router = useRouter()
const theme = useTheme()
const { locale, t } = useI18n() 

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="3" class="px-3">
      
      <div class="d-flex align-center">
        <v-icon icon="mdi-store" size="large" class="mr-3"></v-icon>
        <span class="text-h6 font-weight-bold">{{ t('welcome') }}</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme" title="Alternar Modo Claro/Oscuro" class="mx-1">
        <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
      </v-btn>

      <template v-if="authStore.isLogged">
        <v-btn to="/admin" prepend-icon="mdi-format-list-bulleted" variant="text" class="mx-1 text-none hidden-sm-and-down">
          {{ t('admin') }}
        </v-btn>

        <v-btn 
          v-if="authStore.userRole === 'admin'" 
          to="/admin/dashboard" 
          prepend-icon="mdi-view-dashboard" 
          color="secondary"
          variant="elevated"
          rounded="pill"
          class="mx-2 px-4 text-none hidden-sm-and-down"
        >
          Estadísticas
        </v-btn>

        <v-btn 
          variant="outlined" 
          size="small" 
          class="mx-2 font-weight-bold"
          @click="toggleLanguage"
        >
          {{ locale === 'es' ? 'ENGLISH' : 'ESPAÑOL' }}
        </v-btn>

        <v-btn icon @click="handleLogout" :title="t('logout')" class="ml-1 text-error">
          <v-icon icon="mdi-logout"></v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-btn 
          variant="outlined" 
          size="small" 
          class="mx-2 font-weight-bold"
          @click="toggleLanguage"
        >
          {{ locale === 'es' ? 'ENGLISH' : 'ESPAÑOL' }}
        </v-btn>

        <v-btn to="/login" prepend-icon="mdi-login" variant="outlined" class="mx-2 text-none">
          {{ t('login') }}
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="text-center d-flex flex-column bg-primary-darken-1 py-4 mt-auto">
      <div class="text-caption font-weight-medium text-white">
        © 2026 - Oliver Trabajo 2EV
      </div>
    </v-footer>
  </v-app>
</template>

<style>
body { font-family: 'Inter', sans-serif !important; }
</style>