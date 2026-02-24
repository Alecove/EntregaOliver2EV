<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { Bar, Pie, Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, 
  LinearScale, ArcElement, PointElement, LineElement 
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const taskStore = useTaskStore()

// --- LÓGICA DE KPIs (Requisito 89) ---
const totalProducts = computed(() => taskStore.allTasks.length)
const totalValue = computed(() => taskStore.allTasks.reduce((acc, t) => acc + t.price, 0).toFixed(2))
const avgPrice = computed(() => (Number(totalValue.value) / totalProducts.value || 0).toFixed(2))

// --- DATOS PARA GRÁFICAS (Requisito 90) ---

// 1. Gráfica de Stock (Pie)
const stockData = computed(() => ({
  labels: ['En Stock', 'Agotado'],
  datasets: [{
    data: [
      taskStore.allTasks.filter(t => t.completed).length,
      taskStore.allTasks.filter(t => !t.completed).length
    ],
    backgroundColor: ['#4CAF50', '#F44336']
  }]
}))

// 2. Gráfica de Precios Top 5 (Bar)
const topPricesData = computed(() => {
  const sorted = [...taskStore.allTasks].sort((a, b) => b.price - a.price).slice(0, 5)
  return {
    labels: sorted.map(t => t.title.substring(0, 10) + '...'),
    datasets: [{
      label: 'Precio (€)',
      data: sorted.map(t => t.price),
      backgroundColor: '#1976D2'
    }]
  }
})

// 3. Gráfica de Tendencia (Line - Comparativa simple)
const lineData = computed(() => ({
  labels: taskStore.allTasks.slice(0, 6).map(t => t.title.substring(0, 5)),
  datasets: [{
    label: 'Variación de precio en catálogo',
    data: taskStore.allTasks.slice(0, 6).map(t => t.price),
    borderColor: '#FFA000',
    tension: 0.4
  }]
}))
</script>

<template>
  <v-container class="py-8">
    <h2 class="text-h4 font-weight-bold mb-6">Panel de Estadísticas</h2>

    <v-row class="mb-8">
      <v-col cols="12" md="4">
        <v-card theme="dark" color="primary" elevation="4">
          <v-card-text class="text-center">
            <div class="text-h6">Total Productos</div>
            <div class="text-h2 font-weight-black">{{ totalProducts }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card theme="dark" color="success" elevation="4">
          <v-card-text class="text-center">
            <div class="text-h6">Valor Inventario</div>
            <div class="text-h2 font-weight-black">{{ totalValue }}€</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card theme="dark" color="orange-darken-2" elevation="4">
          <v-card-text class="text-center">
            <div class="text-h6">Precio Medio</div>
            <div class="text-h2 font-weight-black">{{ avgPrice }}€</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Distribución de Stock</v-card-title>
          <div style="height: 300px;"><Pie :data="stockData" /></div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Top 5 Productos más caros</v-card-title>
          <div style="height: 300px;"><Bar :data="topPricesData" /></div>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-6">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Análisis de Precios</v-card-title>
          <div style="height: 300px;"><Line :data="lineData" /></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>