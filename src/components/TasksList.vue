<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()

// Al cargar el componente, pedimos las tareas al servidor
onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <div v-if="taskStore.loading" class="d-flex justify-center my-4">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <div v-else-if="taskStore.tasksList.length > 0">
    <TaskItem
      v-for="task in taskStore.tasksList"
      :key="task.id"
      :task="task"
      @delete="taskStore.deleteTask"
    />
  </div>
  
  <v-alert v-else type="info" text="No hay tareas disponibles"></v-alert>
</template>