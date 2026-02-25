<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

// 👇 AQUÍ ESTÁ EL CAMBIO: Dejamos las comillas completamente vacías
const email = ref('')
const password = ref('')
const error = ref(false)

const handleLogin = () => {
  const success = authStore.login(email.value, password.value)
  if (success) {
    router.push('/admin') 
  } else {
    error.value = true
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400" class="pa-8" elevation="10" rounded="xl">
      <div class="text-center mb-6">
        <v-icon size="64" color="primary">mdi-lock-outline</v-icon>
        <h2 class="text-h4 font-weight-bold mt-2">Acceso</h2>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Usuario / Email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-2"
          placeholder="ejemplo@correo.com"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-key"
          class="mb-6"
          placeholder="Escribe tu contraseña..."
        ></v-text-field>

        <v-alert v-if="error" type="error" variant="tonal" class="mb-4 text-caption">
          Credenciales incorrectas.
        </v-alert>

        <v-btn type="submit" color="primary" block size="x-large" rounded="pill" elevation="3">
          ENTRAR
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>