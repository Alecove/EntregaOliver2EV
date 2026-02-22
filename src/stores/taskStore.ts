import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TaskDto } from '@/core/task.dto'
import api from '@/services/api' // Importamos nuestra API

export const useTaskStore = defineStore('tasks', () => {
  const tasksList = ref<TaskDto[]>([])
  const loading = ref(false) // Para mostrar un spinner mientras carga

  // Acción para CARGAR tareas desde internet
  async function fetchTasks() {
    loading.value = true
    try {
      const response = await api.get('/todos?_limit=5')
      // Adaptamos los datos de la API a nuestro formato TaskDto
      tasksList.value = response.data.map((t: any) => ({
        id: t.id,
        name: t.title,
        enable: t.completed,
        creationDate: new Date(),
        duration: 30
      }))
    } catch (error) {
      console.error('Error cargando tareas:', error)
    } finally {
      loading.value = false
    }
  }

  // Acción para AÑADIR (Simulando POST)
  async function addTask(taskName: string) {
    try {
      const response = await api.post('/todos', {
        title: taskName,
        completed: false
      })
      // Si el "servidor" responde OK, la añadimos a nuestra lista
      tasksList.value.unshift({
        id: response.data.id,
        name: taskName,
        enable: false,
        creationDate: new Date(),
        duration: 30
      })
    } catch (error) {
      alert('No se pudo guardar la tarea')
    }
  }

  function deleteTask(id: number) {
    tasksList.value = tasksList.value.filter((task) => task.id !== id)
  }

  return { tasksList, loading, fetchTasks, addTask, deleteTask }
})