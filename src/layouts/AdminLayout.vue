<template>
  <v-app-bar color="grey-darken-4" title="Panel de Control">
    <template v-slot:append>
      <v-btn icon="mdi-logout" @click="auth.logout"></v-btn>
    </template>
  </v-app-bar>

  <v-main>
    <v-breadcrumbs :items="['Inicio', 'Administración', 'Gestión']"></v-breadcrumbs>
    <slot></slot>
  </v-main>

  <v-footer app color="grey-darken-4" class="justify-center">
    <span>Modo: {{ auth.userRole?.toUpperCase() }}</span>
  </v-footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
</script>