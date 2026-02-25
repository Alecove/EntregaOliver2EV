<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useAuthStore } from '../stores/authStore'
import ProductItem from './ProductItem.vue'
import { useI18n } from 'vue-i18n'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const { t } = useI18n()

// --- ESTADOS DE LAS VENTANAS MODALES ---
const dialog = ref(false)         // Diálogo para ver la descripción del producto
const createDialog = ref(false)   // Diálogo para crear un nuevo producto
const deleteDialog = ref(false)   // Diálogo personalizado de confirmación de borrado

const selectedProduct = ref<any>(null)
const productToDelete = ref<any>(null)

const searchQuery = ref('')
const sortOrder = ref('') 

const newProduct = ref({ title: '', price: null, category: '', description: '', image: '', completed: true })

// Función para limpiar filtros y forzar la carga limpia del catálogo
const reloadCatalog = () => {
  searchQuery.value = '' 
  sortOrder.value = ''
  taskStore.fetchTasks(1, '', '')
}

onMounted(() => {
  reloadCatalog() // Carga inicial sin filtros al entrar a la vista
})

// Vigilamos cambios en búsqueda y orden para actualizar la lista automáticamente
watch([searchQuery, sortOrder], () => {
  taskStore.fetchTasks(1, searchQuery.value, sortOrder.value)
})

// --- FUNCIONES DE ACCIÓN ---

// Abre el modal con la información detallada del producto
const handleOpenDetails = (product: any) => {
  selectedProduct.value = product
  dialog.value = true
}

// Abre la ventana de confirmación roja antes de borrar
const handleOpenDelete = (product: any) => {
  productToDelete.value = product
  deleteDialog.value = true
}

// Ejecuta el borrado definitivo comunicándose con el Store
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
    newProduct.value = { title: '', price: null, category: '', description: '', image: '', completed: true }
  } catch (e) {
    console.error("Error al guardar el producto:", e)
  }
}
</script>

<template>
  <v-container class="pt-0 pb-10">
    
    <div class="mb-8 d-flex justify-space-between align-center">
      <div>
        <h2 class="text-h4 font-weight-black mb-2">{{ $t('admin_title') }}</h2>
        <v-divider width="60" thickness="4" color="primary" class="opacity-100 rounded-pill"></v-divider>
      </div>
      <v-btn 
        v-if="authStore.userRole === 'admin'" 
        @click="createDialog = true" 
        color="success" 
        size="large" 
        prepend-icon="mdi-plus" 
        rounded="lg" 
        class="font-weight-bold"
      >
        {{ $t('new_product') }}
      </v-btn>
    </div>

    <v-card variant="outlined" class="pa-5 mb-10 border-dashed rounded-xl">
      <v-row align="center" dense>
        <v-col cols="12" md="8">
          <v-text-field 
            v-model="searchQuery" 
            :label="$t('search')" 
            prepend-inner-icon="mdi-magnify" 
            variant="solo" 
            flat 
            rounded="lg" 
            hide-details 
            clearable 
            @click:clear="reloadCatalog"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select 
            v-model="sortOrder" 
            :items="[
              {title:'Relevancia', value:''},
              {title:'Precio: Menor a Mayor', value:'asc'},
              {title:'Precio: Mayor a Menor', value:'desc'}
            ]" 
            label="Ordenar" 
            variant="solo" 
            flat 
            rounded="lg" 
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

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

    <v-sheet v-else-if="!taskStore.loading" class="pa-12 text-center bg-transparent d-flex flex-column align-center">
      <v-icon icon="mdi-package-variant" size="100" color="grey-lighten-1" class="mb-4"></v-icon>
      <p class="text-h5 text-grey">No se visualizan productos.</p>
      <v-btn color="primary" variant="elevated" @click="reloadCatalog" class="mt-4 px-8" rounded="pill">
        FORZAR CARGA DEL CATÁLOGO
      </v-btn>
    </v-sheet>

    <div class="d-flex justify-center mt-12">
      <v-pagination 
        v-model="taskStore.currentPage" 
        :length="taskStore.totalPages" 
        :total-visible="7" 
        @update:model-value="(p) => taskStore.fetchTasks(p, searchQuery, sortOrder)" 
        color="primary" 
        rounded="circle"
      ></v-pagination>
    </div>

    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card class="rounded-xl pa-4 text-center">
        <v-card-text>
          <v-icon icon="mdi-alert-circle" color="error" size="80" class="mb-4"></v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">¿Estás seguro?</h3>
          <p class="text-body-1 text-grey-darken-1">
            Vas a eliminar <strong>{{ productToDelete?.title }}</strong>. Esta acción es permanente y no se puede deshacer.
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn variant="text" rounded="pill" class="px-6" @click="deleteDialog = false">CANCELAR</v-btn>
          <v-btn color="error" variant="flat" rounded="pill" class="px-8 font-weight-bold" @click="executeDelete">ELIMINAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600">
      <v-card v-if="selectedProduct" rounded="xl">
        <v-img :src="selectedProduct.image" height="350" cover></v-img>
        <v-card-text class="pa-8">
          <h3 class="text-h3 font-weight-black mb-2">{{ selectedProduct.title }}</h3>
          <p class="text-h4 text-primary font-weight-bold mb-6">{{ selectedProduct.price }} €</p>
          <p class="text-body-1" style="line-height: 1.8;">{{ selectedProduct.description }}</p>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="tonal" rounded="pill" class="px-8" @click="dialog = false">CERRAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="bg-success text-white pa-5 font-weight-bold">{{ $t('new_product') }}</v-card-title>
        <v-card-text class="pa-6">
          <v-row dense>
            <v-col cols="12"><v-text-field v-model="newProduct.title" label="Título" variant="outlined"></v-text-field></v-col>
            <v-col cols="6"><v-text-field v-model="newProduct.price" label="Precio" type="number" variant="outlined"></v-text-field></v-col>
            <v-col cols="6"><v-select v-model="newProduct.category" label="Categoría" :items="['Gaming', 'Monitores', 'Audio', 'Periféricos']" variant="outlined"></v-select></v-col>
            <v-col cols="12"><v-text-field v-model="newProduct.image" label="URL de la Foto" variant="outlined" placeholder="http://..."></v-text-field></v-col>
            <v-col cols="12"><v-textarea v-model="newProduct.description" label="Descripción" variant="outlined" rows="3"></v-textarea></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn @click="createDialog = false">CANCELAR</v-btn>
          <v-btn color="success" variant="flat" rounded="pill" class="px-6" @click="saveProduct">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>