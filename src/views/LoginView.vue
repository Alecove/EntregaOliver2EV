<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const correo = ref('')
const contrasena = ref('')
const mensajeError = ref('')

const entrar = () => {
  // Solo comprobamos que haya escrito un correo y que la contraseña sea 1234
  if (correo.value !== '' && contrasena.value === '1234') {
    
    // Si el correo tiene la palabra "admin", le damos el rol de administrador
    if (correo.value.includes('admin')) {
      authStore.login(correo.value, 'admin')
    } else {
      // Si es un correo cualquiera, entra como usuario normal
      authStore.login(correo.value, 'user')
    }
    
    router.push('/admin')
  } else {
    // Un mensaje de error mucho más normal y sin dar tantas pistas
    mensajeError.value = 'Credenciales incorrectas. Por favor, verifica tus datos.'
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400" class="pa-6 border" elevation="2">
      
      <v-card-title class="text-center text-h5 mb-4 font-weight-bold">
        Iniciar Sesión
      </v-card-title>

      <v-card-text>
        <v-alert v-if="mensajeError" type="error" class="mb-4" density="compact">
          {{ mensajeError }}
        </v-alert>

        <form @submit.prevent="entrar">
          <v-text-field
            v-model="correo"
            label="Correo electrónico"
            type="email"
            variant="outlined"
            class="mb-2"
            required
          ></v-text-field>

          <v-text-field
            v-model="contrasena"
            label="Contraseña"
            type="password"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" block size="large">
            ENTRAR
          </v-btn>
        </form>
      </v-card-text>
      
    </v-card>
  </v-container>
</template>