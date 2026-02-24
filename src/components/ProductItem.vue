<script setup lang="ts">
// Recibimos el producto y el permiso de administrador desde el componente padre (TasksList)
defineProps<{
  product: any,
  isAdmin: boolean
}>()

// Definimos los eventos que este componente puede enviar al padre
const emit = defineEmits(['open-details', 'delete-product'])
</script>

<template>
  <v-card 
    elevation="2" 
    class="product-card h-100 rounded-xl overflow-hidden border"
  >
    <v-img 
      :src="product.image || 'https://via.placeholder.com/300'" 
      height="220" 
      cover 
      class="align-end cursor-pointer"
      @click="emit('open-details', product)"
    >
      <v-chip
        v-if="!product.completed"
        color="error"
        size="small"
        variant="flat"
        class="ma-2 position-absolute top-0 right-0 font-weight-bold"
      >
        AGOTADO
      </v-chip>
    </v-img>

    <v-card-text class="pt-4">
      <h3 class="text-h6 font-weight-bold mb-1 text-truncate" :title="product.title">
        {{ product.title }}
      </h3>
      
      <div class="text-h5 font-weight-black text-primary">
        {{ product.price }} €
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="pa-4">
      <v-btn 
        variant="tonal" 
        color="primary" 
        rounded="pill"
        class="text-none px-4"
        @click="emit('open-details', product)"
      >
        Ver Detalles
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn 
        v-if="isAdmin" 
        icon="mdi-trash-can-outline" 
        color="error" 
        variant="text" 
        title="Eliminar producto"
        @click="emit('delete-product', product.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
/* Efecto de elevación suave al pasar el ratón */
.product-card {
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
}

.cursor-pointer {
  cursor: pointer;
}

/* Asegura que el título no rompa el diseño si es muy largo */
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>