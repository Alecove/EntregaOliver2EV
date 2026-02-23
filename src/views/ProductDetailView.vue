<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const product = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.params.id as string
    // Llamamos a NUESTRO backend local
    const response = await axios.get(`http://localhost:3000/productos/${id}`)
    
    // El producto ya trae su title, price e image desde el db.json
    product.value = response.data
  } catch (error) {
    console.error("Error al cargar el producto", error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container>
    <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="router.back()" class="mb-4">
      Volver al Catálogo
    </v-btn>
    
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <div class="mt-4">Cargando datos del servidor...</div>
    </div>

    <v-card v-else-if="product" variant="outlined" class="pa-6 elevation-2">
      <v-row>
        <v-col cols="12" md="7">
          <div class="text-caption text-grey mb-2">ID Sistema: #{{ product.id }}</div>
          <h1 class="text-h4 font-weight-bold mb-4">{{ product.title }}</h1>
          
          <div class="mb-6">
            <span class="text-subtitle-1 mr-3">Disponibilidad:</span>
            <v-chip :color="product.completed ? 'success' : 'error'" variant="flat">
              {{ product.completed ? 'EN STOCK' : 'AGOTADO' }}
            </v-chip>
          </div>

          <div class="text-h3 mb-6 text-primary font-weight-black">
            {{ product.price.toFixed(2) }} €
          </div>

          <v-divider class="mb-6"></v-divider>

          <v-list density="compact">
            <v-list-item prepend-icon="mdi-truck-delivery" title="Entrega en 24/48 horas"></v-list-item>
            <v-list-item prepend-icon="mdi-shield-check" title="Garantía oficial de 3 años"></v-list-item>
            <v-list-item prepend-icon="mdi-store" title="Recogida gratuita en tienda"></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="5" class="d-flex align-center justify-center">
          <v-img 
            :src="product.image" 
            max-height="350" 
            class="rounded-lg border"
            cover
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card>

    <v-alert v-else type="error" variant="tonal" class="mt-4">
      Error 404: El producto no existe en nuestro servidor.
    </v-alert>
  </v-container>
</template>