<script setup lang="ts">
import type { TaskDto } from '@/core/task.dto'
import { useAuthStore } from '@/stores/authStore' // Importamos auth

defineProps<{ task: TaskDto }>()
const emit = defineEmits(['delete'])
const authStore = useAuthStore() // Usamos auth
</script>

<template>
  <v-card border class="mb-2 pa-2">
    <div class="d-flex align-center">
      <v-checkbox-btn 
        v-model="task.enable" 
        :disabled="authStore.userRole !== 'admin'"
      ></v-checkbox-btn>
      
      <div :class="{ 'text-decoration-line-through': task.enable }">
        <strong>{{ task.name }}</strong>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="authStore.userRole === 'admin'"
        icon="mdi-delete"
        variant="text"
        color="error"
        @click="emit('delete', task.id)"
      ></v-btn>
    </div>
  </v-card>
</template>