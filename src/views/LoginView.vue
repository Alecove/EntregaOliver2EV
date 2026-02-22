<script setup lang="ts">
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

// 1. Definición de reglas de validación (Yup) 
const schema = yup.object({
  email: yup.string()
    .email('Introduce un correo válido')
    .required('El correo es obligatorio'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
})

// 2. Configuración del formulario con VeeValidate 
const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passError } = useField<string>('password')

// 3. Función de envío (Simula autenticación y asignación de roles) [cite: 2073, 2074]
const onLogin = handleSubmit((values) => {
  console.log('Validación correcta:', values)
  
  // Lógica de roles: Si el email contiene "admin", entra como administrador
  const role = values.email.toLowerCase().includes('admin') ? 'admin' : 'editor'
  
  auth.login(role)
})
</script>

<template>
  <BlankLayout>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card width="450" class="pa-8" elevation="12" rounded="lg">
        <v-card-title class="text-h4 text-center font-weight-bold mb-6">
          Bienvenido
        </v-card-title>
        
        <v-card-subtitle class="text-center mb-8">
          Introduce tus credenciales para acceder al panel
        </v-card-subtitle>

        <form @submit.prevent="onLogin">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="admin@ejemplo.com"
            :error-messages="emailError"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :error-messages="passError"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
            size="x-large"
            elevation="2"
            class="text-none font-weight-bold"
          >
            Iniciar Sesión
          </v-btn>
        </form>

        <v-divider class="my-6"></v-divider>

        <v-btn to="/" variant="text" block color="grey-darken-1" class="text-none">
          Volver a la página pública
        </v-btn>
        
        <p class="text-caption text-center text-grey mt-4">
          Tip: Usa un email con la palabra "admin" para permisos totales.
        </p>
      </v-card>
    </v-container>
  </BlankLayout>
</template>

<style scoped>
/* Estilos opcionales para mejorar el centrado */
.fill-height {
  background: #f4f7f6;
  min-height: 100vh;
}
</style>