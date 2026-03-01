<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="600" class="pa-8 text-center" elevation="4" rounded="xl">
      
      <v-icon icon="mdi-storefront" size="100" color="primary" class="mb-4"></v-icon>
      
      <h1 class="text-h3 font-weight-bold mb-4">
        Bienvenido a la Tienda
      </h1>
      
      <p class="text-body-1 text-grey-darken-1 mb-8">
        Sistema avanzado de gestión de inventario. Inicia sesión para acceder al catálogo completo, crear productos o consultar las estadísticas de ventas.
      </p>

      <v-card-actions class="justify-center">
        <v-btn 
          v-if="!authStore.isLogged" 
          to="/login" 
          color="primary" 
          size="x-large" 
          variant="flat"
        >
          INICIAR SESIÓN
        </v-btn>

        <v-btn 
          v-else 
          to="/admin" 
          color="success" 
          size="x-large" 
          variant="flat"
        >
          IR AL CATÁLOGO
        </v-btn>
      </v-card-actions>
      
    </v-card>
  </v-container>
</template>