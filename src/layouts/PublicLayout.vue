<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>{{ $t('welcome') }}</v-app-bar-title>
    <v-spacer></v-spacer>
    
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