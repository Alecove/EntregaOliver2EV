<script setup lang="ts">
defineProps<{
  product: any
  isAdmin: boolean
}>()

defineEmits(['open-details', 'delete-product'])
</script>

<template>
  <v-card class="mx-auto rounded-xl shadow-sm h-100 d-flex flex-column" elevation="2">
    <v-img 
      :src="product.image" 
      height="220" 
      cover 
      class="align-end cursor-pointer"
      @click="$emit('open-details', product)"
    >
      <v-chip
        v-if="!product.completed"
        color="error"
        size="small"
        variant="flat"
        class="ma-2 font-weight-bold"
        style="position: absolute; top: 0; right: 0;"
      >
        AGOTADO
      </v-chip>
    </v-img>

    <v-card-item class="pt-4">
      <v-card-title class="text-h6 font-weight-bold text-grey-darken-3">
        {{ product.title }}
      </v-card-title>
      <v-card-subtitle class="text-h5 font-weight-black text-primary pt-1">
        {{ product.price }} €
      </v-card-subtitle>
    </v-card-item>

    <v-spacer></v-spacer>

    <v-divider class="mx-4 opacity-50"></v-divider>

    <v-card-actions class="pa-4">
      <v-btn
        variant="tonal"
        color="primary"
        rounded="pill"
        class="px-4 text-none"
        @click="$emit('open-details', product)"
      >
        Ver Detalles
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn
        v-if="isAdmin"
        icon="mdi-delete-outline"
        variant="text"
        color="error"
        @click="$emit('delete-product', product)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>