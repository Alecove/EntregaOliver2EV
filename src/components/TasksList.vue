<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useAuthStore } from '../stores/authStore'
import ProductItem from './ProductItem.vue'

const taskStore = useTaskStore()
const authStore = useAuthStore()

const dialog = ref(false)
const selectedProduct = ref<any>(null)

const searchQuery = ref('')
const sortOrder = ref('') 

const sortOptions = [
  { title: 'Relevancia', value: '' },
  { title: 'Precio: Menor a Mayor', value: 'asc' },
  { title: 'Precio: Mayor a Menor', value: 'desc' }
]

onMounted(() => {
  taskStore.fetchTasks()
})

watch([searchQuery, sortOrder], () => {
  taskStore.fetchTasks(1, searchQuery.value, sortOrder.value)
})

const openDetails = (product: any) => {
  selectedProduct.value = product
  dialog.value = true
}
</script>

<template>
  <v-container class="pt-0 pb-10">
    
    <div class="mb-8 d-flex justify-space-between align-center">
      <div>
        <h2 class="text-h4 font-weight-bold mb-2 text-grey-darken-4">Explora nuestro Catálogo</h2>
        <v-divider width="60" thickness="4" color="primary" class="opacity-100 rounded-pill"></v-divider>
      </div>

      <v-btn 
        v-if="authStore.userRole === 'admin'"
        color="success" 
        size="large" 
        prepend-icon="mdi-plus" 
        elevation="4"
        rounded="lg"
        class="text-none font-weight-bold"
      >
        NUEVO PRODUCTO
      </v-btn>
    </div>

    <v-alert
      v-if="authStore.userRole !== 'admin'"
      type="info"
      variant="tonal"
      density="compact"
      prepend-icon="mdi-eye-outline"
      class="mb-8 rounded-lg"
    >
      Modo lectura: No tienes permisos para modificar el catálogo.
    </v-alert>

    <v-card variant="outlined" class="pa-5 mb-10 border-dashed rounded-xl bg-grey-lighten-5">
      <v-row align="center" dense>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="¿Qué estás buscando?"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            flat
            rounded="lg"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="sortOrder"
            :items="sortOptions"
            item-title="title"
            item-value="value"
            label="Ordenar por"
            prepend-inner-icon="mdi-sort-variant"
            variant="solo"
            flat
            rounded="lg"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

    <v-progress-linear v-if="taskStore.loading" indeterminate color="primary" class="mb-8 rounded-pill"></v-progress-linear>

    <v-row v-if="taskStore.tasks.length > 0">
      <v-col v-for="task in taskStore.tasks" :key="task.id" cols="12" sm="6" md="4">
        <ProductItem 
          :product="task" 
          :isAdmin="authStore.userRole === 'admin'"
          @open-details="openDetails" 
          @delete-product="taskStore.deleteTask" 
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-12">
      <v-pagination
        v-if="taskStore.totalPages > 1"
        v-model="taskStore.currentPage"
        :length="taskStore.totalPages"
        :total-visible="5"
        @update:model-value="(p) => taskStore.fetchTasks(p, searchQuery, sortOrder)"
        color="primary"
        rounded="circle"
        elevation="2"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialog" max-width="600" transition="dialog-bottom-transition">
      <v-card v-if="selectedProduct" rounded="xl">
        <v-img :src="selectedProduct.image" height="350" cover>
          <div class="fill-height d-flex align-end pa-8" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
            <h3 class="text-h3 text-white font-weight-black text-uppercase">{{ selectedProduct.title }}</h3>
          </div>
        </v-img>
        <v-card-text class="pa-8">
          <div class="d-flex justify-space-between align-center mb-6">
            <span class="text-h3 font-weight-black text-primary">{{ selectedProduct.price }} €</span>
            <v-chip :color="selectedProduct.completed ? 'success' : 'error'" variant="flat" size="large" rounded="pill">
              <v-icon start :icon="selectedProduct.completed ? 'mdi-check-bold' : 'mdi-close-thick'"></v-icon>
              {{ selectedProduct.completed ? 'EN STOCK' : 'AGOTADO' }}
            </v-chip>
          </div>
          <p class="text-body-1 text-grey-darken-3" style="line-height: 1.8; font-size: 1.1rem !important;">
            {{ selectedProduct.description }}
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="tonal" rounded="pill" class="px-10 py-4 h-auto" @click="dialog = false">CERRAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>