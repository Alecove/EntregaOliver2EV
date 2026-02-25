<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const dialog = ref(false) // Controla si la ventana está abierta o cerrada

// 🚨 REQUISITO OBLIGATORIO DEL PROFESOR: Validación con Yup 🚨
const schema = yup.object({
  title: yup.string().required('El título es obligatorio').min(3, 'Mínimo 3 caracteres'),
  price: yup.number().typeError('Debe ser un número').required('El precio es obligatorio').positive('Debe ser mayor que 0'),
  image: yup.string().url('Debe ser una URL válida (http...)').required('La imagen es obligatoria'),
  description: yup.string().required('La descripción es obligatoria').min(10, 'Mínimo 10 caracteres')
})

const { handleSubmit, resetForm } = useForm({ validationSchema: schema })

// Conectamos los campos con VeeValidate
const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: price, errorMessage: priceError } = useField<number>('price')
const { value: image, errorMessage: imageError } = useField<string>('image')
const { value: description, errorMessage: descError } = useField<string>('description')

// Función que se ejecuta al darle a guardar (solo si todo es válido)
const onSubmit = handleSubmit(async (values) => {
  const newProduct = {
    title: values.title,
    price: Number(values.price),
    image: values.image,
    description: values.description,
    completed: true // Ponemos que hay stock por defecto
  }
  
  // Llamamos a la acción del Store que ahora sí está definida para TypeScript
  await taskStore.addTask(newProduct)
  
  dialog.value = false // Cerramos la ventana
  resetForm() // Limpiamos el formulario
})

// Función para cancelar y cerrar
const closeDialog = () => {
  dialog.value = false
  resetForm()
}
</script>

<template>
  <div>
    <v-btn 
      color="success" 
      prepend-icon="mdi-plus" 
      size="large"
      elevation="4"
      rounded="lg"
      class="mb-4 font-weight-bold"
      @click="dialog = true"
    >
      NUEVO PRODUCTO
    </v-btn>

    <v-dialog v-model="dialog" max-width="600" persistent transition="dialog-top-transition">
      <v-card rounded="xl">
        <v-card-title class="text-h5 bg-primary text-white pa-5 font-weight-bold">
          <v-icon start icon="mdi-plus-circle-outline" class="mr-2"></v-icon>
          Añadir Nuevo Producto
        </v-card-title>
        
        <v-card-text class="pa-6 mt-2">
          <form @submit.prevent="onSubmit">
            
            <v-text-field
              v-model="title"
              label="Nombre del producto"
              :error-messages="titleError"
              variant="outlined"
              class="mb-4"
              rounded="lg"
            ></v-text-field>

            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="price"
                  label="Precio (€)"
                  type="number"
                  :error-messages="priceError"
                  variant="outlined"
                  class="mb-4"
                  rounded="lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="image"
                  label="URL de la imagen"
                  :error-messages="imageError"
                  variant="outlined"
                  class="mb-4"
                  rounded="lg"
                  placeholder="https://..."
                ></v-text-field>
              </v-col>
            </v-row>

            <v-textarea
              v-model="description"
              label="Descripción del producto"
              :error-messages="descError"
              variant="outlined"
              rows="3"
              class="mb-4"
              rounded="lg"
            ></v-textarea>

            <v-card-actions class="px-0 pb-0 mt-2">
              <v-spacer></v-spacer>
              <v-btn 
                color="grey-darken-1" 
                variant="text" 
                rounded="pill"
                class="px-6"
                @click="closeDialog"
              >
                CANCELAR
              </v-btn>
              <v-btn 
                color="primary" 
                variant="flat" 
                type="submit"
                rounded="pill"
                class="px-8 font-weight-bold"
              >
                GUARDAR PRODUCTO
              </v-btn>
            </v-card-actions>
            
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>