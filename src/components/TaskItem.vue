<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps<{ task: any }>()
const taskStore = useTaskStore()
const showDeleteDialog = ref(false)

const confirmDelete = () => {
  taskStore.deleteTask(props.task.id)
  showDeleteDialog.value = false
}
</script>

<template>
  <div>
    <v-card class="mb-3" variant="outlined" hover>
      <v-card-text>
        <v-row align="center">
          
          <v-col cols="auto">
            <v-avatar size="56" rounded="lg" class="elevation-1">
              <v-img :src="task.image" cover></v-img>
            </v-avatar>
          </v-col>

          <v-col>
            <div class="text-caption text-grey">Referencia: #{{ task.id }}</div>
            <div class="text-subtitle-1 font-weight-bold">{{ task.title }}</div>
            <v-chip size="x-small" :color="task.completed ? 'success' : 'error'" class="mt-1">
              {{ task.completed ? 'En Stock' : 'Agotado' }}
            </v-chip>
          </v-col>

          <v-col cols="auto" class="d-flex align-center">
            <v-btn color="info" variant="text" icon="mdi-eye" :to="`/admin/producto/${task.id}`" title="Ver ficha técnica" class="mr-2"></v-btn>
            <v-btn color="error" variant="text" icon="mdi-delete" @click="showDeleteDialog = true" title="Borrar producto"></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 pt-4 text-error">
          <v-icon left class="mr-2">mdi-alert</v-icon> Confirmar borrado
        </v-card-title>
        <v-card-text>¿Estás seguro de que quieres eliminar <strong>{{ task.title }}</strong>?</v-card-text>
        <v-card-actions class="pb-4 pr-4">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="showDeleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>