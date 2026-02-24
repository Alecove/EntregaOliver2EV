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
    <v-btn color="success" prepend-icon="mdi-plus" @click="dialog = true" class="mb-4">
      NUEVO PRODUCTO
    </v-btn>

    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-primary text-white pa-4">
          Añadir Nuevo Producto
        </v-card-title>
        
        <v-card-text class="pa-4 mt-2">
          <form @submit.prevent="onSubmit">
            
            <v-text-field
              v-model="title"
              label="Nombre del producto"
              :error-messages="titleError"
              variant="outlined"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="price"
              label="Precio (€)"
              type="number"
              :error-messages="priceError"
              variant="outlined"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="image"
              label="URL de la imagen (Ej: https://...)"
              :error-messages="imageError"
              variant="outlined"
              class="mb-2"
            ></v-text-field>

            <v-textarea
              v-model="description"
              label="Descripción del producto"
              :error-messages="descError"
              variant="outlined"
              rows="3"
              class="mb-2"
            ></v-textarea>

            <v-card-actions class="px-0 pb-0 mt-4">
              <v-spacer></v-spacer>
              <v-btn color="grey-darken-1" variant="text" @click="closeDialog">CANCELAR</v-btn>
              <v-btn color="primary" variant="elevated" type="submit">GUARDAR PRODUCTO</v-btn>
            </v-card-actions>
            
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>