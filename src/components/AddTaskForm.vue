<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore' // Importamos el auth

const taskStore = useTaskStore()
const authStore = useAuthStore() // Usamos el store de auth

const schema = yup.object({
  taskName: yup.string().required('Obligatorio').min(3, 'Mínimo 3 caracteres')
})

const { handleSubmit, resetForm } = useForm({ validationSchema: schema })
const { value: taskName, errorMessage } = useField<string>('taskName')

const onSubmit = handleSubmit((values) => {
  taskStore.addTask(values.taskName)
  resetForm()
})
</script>

<template>
  <form v-if="authStore.userRole === 'admin'" @submit.prevent="onSubmit" class="mb-6">
    <v-text-field
      v-model="taskName"
      label="Nueva Tarea"
      :error-messages="errorMessage"
      append-inner-icon="mdi-plus"
      @click:append-inner="onSubmit"
    ></v-text-field>
    <v-btn type="submit" color="primary" block>AÑADIR TAREA</v-btn>
  </form>
  
  <v-alert v-else type="warning" variant="tonal" class="mb-6">
    Solo los administradores pueden crear nuevas tareas.
  </v-alert>
</template>