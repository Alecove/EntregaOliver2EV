<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useAuthStore } from '../stores/authStore'
import ProductItem from './ProductItem.vue'

const taskStore = useTaskStore()
const authStore = useAuthStore()

// Control de ventanas modales
const dialog = ref(false)         
const createDialog = ref(false)   
const deleteDialog = ref(false)   

const selectedProduct = ref<any>(null)
const productToDelete = ref<any>(null)

// Datos del nuevo producto
const newProduct = ref({ title: '', price: null, description: '', image: '', completed: true })

onMounted(() => {
  // Cargamos los productos tal cual, sin buscar ni ordenar
  taskStore.fetchTasks(1)
})

const handleOpenDetails = (product: any) => {
  selectedProduct.value = product
  dialog.value = true
}

const handleOpenDelete = (product: any) => {
  productToDelete.value = product
  deleteDialog.value = true
}

const executeDelete = async () => {
  if (productToDelete.value) {
    await taskStore.deleteTask(productToDelete.value.id)
    deleteDialog.value = false
    productToDelete.value = null
  }
}

const saveProduct = async () => {
  if (!newProduct.value.title || !newProduct.value.price) return
  
  try {
    await taskStore.addTask({ ...newProduct.value })
    createDialog.value = false
    newProduct.value = { title: '', price: null, description: '', image: '', completed: true }
  } catch (e) { 
    console.log(e) 
  }
}
</script>

<template>
  <v-container class="pt-6 pb-10">
    
    <div class="mb-8 d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">Gestión de Stock</h2>
      
      <v-btn 
        v-if="authStore.userRole === 'admin'" 
        @click="createDialog = true" 
        color="success" 
        size="large"
        elevation="2"
      >
        + CREAR PRODUCTO
      </v-btn>
    </div>

    <v-progress-linear v-if="taskStore.loading" indeterminate color="primary" class="mb-8"></v-progress-linear>

    <v-row v-if="taskStore.tasks.length > 0">
      <v-col v-for="task in taskStore.tasks" :key="task.id" cols="12" sm="6" md="4">
        <ProductItem 
          :product="task" 
          :isAdmin="authStore.userRole === 'admin'" 
          @open-details="handleOpenDetails" 
          @delete-product="handleOpenDelete" 
        />
      </v-col>
    </v-row>

    <v-sheet v-else-if="!taskStore.loading" class="pa-12 text-center">
      <p class="text-h5 text-grey">No hay productos en la base de datos.</p>
    </v-sheet>

    <div class="d-flex justify-center mt-8">
      <v-pagination 
        v-model="taskStore.currentPage" 
        :length="taskStore.totalPages" 
        :total-visible="5" 
        @update:model-value="(p) => taskStore.fetchTasks(p)" 
        color="primary" 
      ></v-pagination>
    </div>

    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card class="pa-4 text-center">
        <h3 class="text-h5 mb-2">¿Estás seguro?</h3>
        <p>Vas a borrar <strong>{{ productToDelete?.title }}</strong>.</p>
        <v-card-actions class="justify-center mt-4">
          <v-btn variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" @click="executeDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500">
      <v-card v-if="selectedProduct">
        <v-img :src="selectedProduct.image" height="250" cover></v-img>
        <v-card-text class="pa-4">
          <h2 class="mb-2">{{ selectedProduct.title }}</h2>
          <h3 class="text-primary mb-4">{{ selectedProduct.price }} €</h3>
          <p>{{ selectedProduct.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="bg-primary text-white pa-4">Nuevo Producto</v-card-title>
        <v-card-text class="pa-4">
          <v-text-field v-model="newProduct.title" label="Título" variant="outlined" class="mb-2"></v-text-field>
          <v-text-field v-model="newProduct.price" label="Precio" type="number" variant="outlined" class="mb-2"></v-text-field>
          <v-text-field v-model="newProduct.image" label="URL Foto" variant="outlined" class="mb-2"></v-text-field>
          <v-textarea v-model="newProduct.description" label="Descripción" variant="outlined" rows="3"></v-textarea>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="createDialog = false">Cancelar</v-btn>
          <v-btn color="success" variant="flat" @click="saveProduct">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>