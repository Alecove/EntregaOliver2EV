<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('admin@admin.com')
const password = ref('admin')
const error = ref(false)

const handleLogin = () => {
  // Llamamos a la función login de tu store
  const success = authStore.login(email.value, password.value)
  
  if (success) {
    router.push('/admin') // Si entra, vamos a gestión
  } else {
    error.value = true
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400" class="pa-8" elevation="10" rounded="xl">
      <div class="text-center mb-6">
        <v-icon size="64" color="primary">mdi-lock-open-outline</v-icon>
        <h2 class="text-h4 font-weight-bold mt-2">Acceso</h2>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Usuario / Email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-key"
          class="mb-4"
        ></v-text-field>

        <v-alert v-if="error" type="error" variant="tonal" class="mb-4 text-caption">
          Credenciales incorrectas. Prueba admin@admin.com / admin
        </v-alert>

        <v-btn type="submit" color="primary" block size="x-large" rounded="pill">
          ENTRAR
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>