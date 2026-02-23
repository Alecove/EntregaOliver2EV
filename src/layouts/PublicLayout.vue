<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { locale } = useI18n()
const theme = useTheme()

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>{{ $t('welcome') }}</v-app-bar-title>
    <v-spacer></v-spacer>
    
    <v-btn icon @click="toggleTheme" class="mr-2">
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn variant="tonal" class="mr-2" @click="toggleLanguage">
      {{ locale === 'es' ? 'English' : 'Español' }}
    </v-btn>
    
    <v-btn to="/login" variant="text">{{ $t('login') }}</v-btn>
  </v-app-bar>

  <v-main>
    <slot></slot>
  </v-main>

  <v-footer app color="primary" class="justify-center">
    <span>© 2026 - Oliver Trabajo 2EV</span>
  </v-footer>
</template>