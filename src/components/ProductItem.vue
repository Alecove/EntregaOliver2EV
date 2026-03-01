<script setup lang="ts">
// Definimos las props de forma sencilla, sin tipados estrictos complejos
defineProps(['product', 'isAdmin'])

// Eventos para avisar al padre (TasksList)
defineEmits(['open-details', 'delete-product'])
</script>

<template>
  <v-card class="mb-4" elevation="2">
    <v-img :src="product.image" height="200px" cover></v-img>
    
    <v-card-title class="font-weight-bold">{{ product.title }}</v-card-title>
    
    <v-card-subtitle class="text-h6 text-primary">{{ product.price }} €</v-card-subtitle>
    
    <v-card-text>
      <div v-if="product.completed" style="color: green; font-weight: bold;">
        En Stock
      </div>
      <div v-else style="color: red; font-weight: bold;">
        Agotado temporalmente
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="primary" @click="$emit('open-details', product)">
        Ver Detalles
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn v-if="isAdmin" color="error" @click="$emit('delete-product', product)">
        Borrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>