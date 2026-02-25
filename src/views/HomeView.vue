<script setup lang="ts">
// No necesitamos importar nada más, ya que usamos los componentes globales de Vuetify
</script>

<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    
    <h1 class="text-h2 font-weight-black mb-6 text-primary">
      {{ $t('home_title') }}
    </h1>

    <p class="text-h6 text-grey-darken-1 mb-10 font-weight-light" style="max-width: 600px;">
      {{ $t('home_description') }}
    </p>

    <v-btn 
      to="/login" 
      size="x-large" 
      rounded="pill" 
      prepend-icon="mdi-rocket-launch" 
      class="text-none px-12 py-6 btn-premium"
    >
      <span class="text-h5 font-weight-bold">{{ $t('go_to_login') }}</span>
    </v-btn>
    
  </v-container>
</template>

<style scoped>
/* Forzamos un mínimo de altura para que el contenido no se pegue arriba */
.fill-height {
  min-height: 80vh;
}

/* --- ESTILOS DEL BOTÓN PREMIUM --- */
.btn-premium {
  /* Degradado azul profesional */
  background: linear-gradient(45deg, #1976D2, #64B5F6) !important;
  color: white !important;
  border: none;
  /* Sombra elegante para dar profundidad */
  box-shadow: 0 10px 20px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  height: auto !important;
}

.btn-premium:hover {
  /* Efecto de elevación al pasar el ratón */
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 30px rgba(25, 118, 210, 0.5) !important;
  filter: brightness(1.1);
}

.btn-premium:active {
  /* Efecto de pulsación */
  transform: translateY(0) scale(0.98);
}
</style>