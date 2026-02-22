<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useAuthStore } from '@/stores/authStore'

const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const newCatName = ref('')

const add = () => {
  if (newCatName.value.trim()) {
    categoryStore.addCategory(newCatName.value)
    newCatName.value = ''
  }
}
</script>

<template>
  <v-card variant="outlined" class="pa-4">
    <v-form v-if="authStore.userRole === 'admin'" @submit.prevent="add" class="d-flex ga-2 mb-4">
      <v-text-field v-model="newCatName" label="Nueva Categoría" density="compact" hide-details></v-text-field>
      <v-btn color="primary" @click="add">Añadir</v-btn>
    </v-form>

    <v-list>
      <v-list-item v-for="cat in categoryStore.categoriesList" :key="cat.id" :title="cat.name">
        <template v-slot:append>
          <v-btn 
            v-if="authStore.userRole === 'admin'"
            icon="mdi-delete" 
            variant="text" 
            color="error" 
            @click="categoryStore.deleteCategory(cat.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    
    <v-alert v-if="authStore.userRole !== 'admin'" type="info" variant="tonal" density="compact">
      Modo lectura: No tienes permisos para modificar categorías.
    </v-alert>
  </v-card>
</template>