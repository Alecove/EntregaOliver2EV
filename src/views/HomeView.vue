<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
</script>

<template>
  <PublicLayout>
    <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h2 font-weight-bold mb-6 text-primary">
        {{ $t('home_title') }}
      </h1>

      <p class="text-h6 text-grey-darken-1 mb-8">
        {{ $t('home_description') }}
      </p>

      <v-btn 
        to="/login" 
        color="primary" 
        size="x-large" 
        elevation="4" 
        prepend-icon="mdi-login" 
        class="text-none"
      >
        {{ $t('go_to_login') }}
      </v-btn>
    </v-container>
  </PublicLayout>
</template>

<style scoped>
/* Asegura que el contenido esté centrado verticalmente en la pantalla */
.fill-height {
  min-height: 80vh;
}
</style>