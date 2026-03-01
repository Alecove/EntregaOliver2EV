<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '../stores/categoryStore'
import { useAuthStore } from '../stores/authStore' // 🚨 Importamos el Store de los usuarios
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const categoryStore = useCategoryStore()
const authStore = useAuthStore() // 🚨 Lo activamos aquí

onMounted(() => {
  categoryStore.fetchCategories()
})

// Validación Yup súper sencilla
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 letras')
})

const { handleSubmit, resetForm } = useForm({ validationSchema: schema })
const { value: name, errorMessage: nameError } = useField<string>('name')

const onSubmit = handleSubmit(async (values) => {
  await categoryStore.addCategory({ name: values.name })
  resetForm()
})
</script>

<template>
  <v-container class="pa-8">
    <h2 class="text-h4 font-weight-bold mb-6">Gestión de Categorías</h2>
    
    <v-row>
      <v-col cols="12" md="4" v-if="authStore.userRole === 'admin'">
        <v-card class="pa-6 rounded-xl border" elevation="2">
          <h3 class="mb-4">Nueva Categoría</h3>
          <form @submit.prevent="onSubmit">
            <v-text-field 
              v-model="name" 
              :error-messages="nameError" 
              label="Nombre de categoría" 
              variant="outlined" 
              class="mb-4"
            ></v-text-field>
            <v-btn type="submit" color="primary" block>AÑADIR</v-btn>
          </form>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" v-else>
        <v-card class="pa-6 rounded-xl border bg-grey-lighten-4" elevation="0">
          <p class="text-center text-grey-darken-1">
            <v-icon icon="mdi-lock" class="mb-2" size="large"></v-icon><br>
            Solo los administradores pueden crear categorías nuevas.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="rounded-xl border pa-4" elevation="2">
          <v-progress-linear v-if="categoryStore.loading" indeterminate color="primary"></v-progress-linear>
          
          <v-list v-else>
            <v-list-item 
              v-for="cat in categoryStore.categories" 
              :key="cat.id"
              class="mb-2 border rounded"
            >
              <v-list-item-title class="font-weight-bold">{{ cat.name }}</v-list-item-title>
              
              <template v-slot:append>
                <v-btn 
                  v-if="authStore.userRole === 'admin'"
                  icon="mdi-delete" 
                  color="error" 
                  variant="text" 
                  @click="categoryStore.deleteCategory(cat.id)"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>