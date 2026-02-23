<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <v-container>
    <v-alert v-if="taskStore.error" type="error" variant="elevated" class="mb-4">
      {{ taskStore.error }}
    </v-alert>

    <v-progress-linear v-if="taskStore.loading" indeterminate color="primary"></v-progress-linear>

    <v-row v-if="taskStore.tasks.length > 0" class="mt-4">
      <v-col v-for="task in taskStore.tasks" :key="task.id" cols="12" sm="6" md="4">
        <v-card border>
          <v-img :src="task.image" height="180" cover></v-img>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-text>
            <div class="text-h6 text-primary">{{ task.price }} €</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" block @click="taskStore.deleteTask(task.id)">ELIMINAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else-if="!taskStore.loading" type="warning" variant="tonal" class="mt-4">
      El servidor respondió, pero la lista de productos está vacía. 
      Revisa http://localhost:3000/productos en otra pestaña.
    </v-alert>

    <v-pagination
      v-if="taskStore.totalPages > 1"
      v-model="taskStore.currentPage"
      :length="taskStore.totalPages"
      @update:model-value="(p) => taskStore.fetchTasks(p)"
      class="mt-6"
    ></v-pagination>
  </v-container>
</template>