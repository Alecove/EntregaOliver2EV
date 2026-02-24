<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
</script>

<template>
  <PublicLayout>
    <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
      
      <h1 class="text-h2 font-weight-black mb-6 text-primary">
        {{ $t('home_title') }}
      </h1>

      <p class="text-h6 text-grey-darken-1 mb-10 font-weight-light">
        {{ $t('home_description') }}
      </p>

      <v-btn 
        to="/login" 
        size="x-large" 
        rounded="pill" 
        prepend-icon="mdi-login" 
        class="text-none px-12 py-6 btn-premium"
      >
        <span class="text-h5 font-weight-bold">{{ $t('go_to_login') }}</span>
      </v-btn>
      
    </v-container>
  </PublicLayout>
</template>

<style scoped>
.fill-height {
  min-height: 80vh;
}

/* Estilos para el botón Premium */
.btn-premium {
  /* Degradado moderno */
  background: linear-gradient(45deg, #1976D2, #64B5F6) !important;
  color: white !important;
  border: none;
  /* Sombra elegante */
  box-shadow: 0 10px 20px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  height: auto !important;
}

.btn-premium:hover {
  /* Se eleva y brilla al pasar el ratón */
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 30px rgba(25, 118, 210, 0.5) !important;
  filter: brightness(1.1);
}

.btn-premium:active {
  transform: translateY(0) scale(0.98);
}
</style>