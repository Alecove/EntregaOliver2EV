<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
// Importamos los gráficos
import { Pie, Bar } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, 
  CategoryScale, LinearScale, BarElement 
} from 'chart.js'

// Registramos los componentes de los gráficos
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement)

const taskStore = useTaskStore()

onMounted(() => {
  // Al entrar al dashboard, pedimos la lista COMPLETA para las estadísticas
  taskStore.fetchAllForStats()
})

// --- CÁLCULOS DE ESTADÍSTICAS ---
const totalProducts = computed(() => taskStore.allTasks.length)

const inStock = computed(() => {
  return taskStore.allTasks.filter(t => t.completed).length
})

const outOfStock = computed(() => {
  return totalProducts.value - inStock.value
})

const averagePrice = computed(() => {
  if (totalProducts.value === 0) return 0
  // Sumamos asegurando que el precio sea un número
  const total = taskStore.allTasks.reduce((acc, p) => acc + (Number(p.price) || 0), 0)
  return total / totalProducts.value
})

// --- DATOS PARA LOS GRÁFICOS ---
// Gráfico de Queso (Stock)
const stockChartData = computed(() => {
  return {
    labels: ['En Stock', 'Agotado'],
    datasets: [{
      data: [inStock.value, outOfStock.value],
      backgroundColor: ['#4CAF50', '#FF5252'], // Verde y Rojo vibrantes
      borderWidth: 0
    }]
  }
})

// Gráfico de Barras (Top 5 caros)
const topPriceData = computed(() => {
  // Ordenamos por precio descendente y cogemos los 5 primeros
  const top = [...taskStore.allTasks]
    .sort((a, b) => Number(b.price) - Number(a.price))
    .slice(0, 5)
    
  return {
    // Cortamos el título si es muy largo para que quepa bien
    labels: top.map(p => p.title.substring(0, 12) + (p.title.length > 12 ? '...' : '')),
    datasets: [{
      label: 'Precio (€)',
      data: top.map(p => Number(p.price)),
      backgroundColor: '#2196F3', // Azul material
      borderRadius: 8 // Barras redondeadas modernas
    }]
  }
})

// Opciones comunes para que los gráficos se adapten al contenedor
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const }
  }
}
</script>

<template>
  <v-container fluid class="pa-8 bg-grey-lighten-4 fill-height align-start">
    
    <div class="d-flex align-center mb-8">
      <v-icon icon="mdi-chart-box-outline" size="40" color="primary" class="mr-3"></v-icon>
      <div>
        <h1 class="text-h3 font-weight-black text-grey-darken-3">Analítica de Inventario</h1>
        <p class="text-subtitle-1 text-grey-darken-1">Visión general del estado de tu catálogo</p>
      </div>
    </div>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card 
          theme="dark" 
          class="rounded-xl pa-4 elevation-4 d-flex flex-column justify-center" 
          style="background: linear-gradient(135deg, #1976D2, #64B5F6); min-height: 140px;"
        >
            <div class="d-flex align-center mb-2 opacity-80">
              <v-icon icon="mdi-database" class="mr-2"></v-icon>
              <span class="text-overline font-weight-bold">Total Catálogo</span>
            </div>
            <div class="text-h2 font-weight-black pl-2">{{ totalProducts }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card 
          theme="dark" 
          color="orange-darken-2" 
          class="rounded-xl pa-4 elevation-4 d-flex flex-column justify-center"
          style="min-height: 140px;"
        >
            <div class="d-flex align-center mb-2 opacity-80">
              <v-icon icon="mdi-currency-eur" class="mr-2"></v-icon>
              <span class="text-overline font-weight-bold">Precio Medio</span>
            </div>
            <div class="text-h2 font-weight-black pl-2">{{ averagePrice.toFixed(2) }}€</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card variant="flat" class="rounded-xl pa-4 border d-flex flex-column justify-center" style="min-height: 140px; background-color: white;">
            <div class="d-flex align-center mb-2 text-success">
              <v-icon icon="mdi-check-circle-outline" class="mr-2"></v-icon>
              <span class="text-overline font-weight-bold">En Stock</span>
            </div>
            <div class="text-h2 font-weight-black text-success pl-2">{{ inStock }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card variant="flat" class="rounded-xl pa-4 border d-flex flex-column justify-center" style="min-height: 140px; background-color: white;">
            <div class="d-flex align-center mb-2 text-error">
              <v-icon icon="mdi-alert-circle-outline" class="mr-2"></v-icon>
              <span class="text-overline font-weight-bold">Agotado</span>
            </div>
            <div class="text-h2 font-weight-black text-error pl-2">{{ outOfStock }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="5">
        <v-card class="rounded-xl pa-6 border-0 shadow-sm fill-height" elevation="2" style="background-color: white;">
          <div class="d-flex align-center mb-6">
            <v-icon icon="mdi-chart-pie" color="grey-darken-2" class="mr-2"></v-icon>
            <h3 class="text-h6 font-weight-bold text-grey-darken-3 ma-0">Estado del Almacén</h3>
          </div>
          <div style="height: 300px;">
            <Pie :data="stockChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-card class="rounded-xl pa-6 border-0 shadow-sm fill-height" elevation="2" style="background-color: white;">
          <div class="d-flex align-center mb-6">
            <v-icon icon="mdi-chart-bar" color="grey-darken-2" class="mr-2"></v-icon>
            <h3 class="text-h6 font-weight-bold text-grey-darken-3 ma-0">Top 5 Inversión por Producto</h3>
          </div>
          <div style="height: 300px;">
            <Bar :data="topPriceData" :options="{ ...chartOptions, plugins: { legend: { display: false } } }" />
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped>
/* Un pequeño ajuste para que el fondo gris cubra toda la pantalla */
.fill-height {
  min-height: 100vh;
}
</style>