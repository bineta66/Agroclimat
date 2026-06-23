<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { generateTemperatureHistory } from '../../utils/generateHistory'

Chart.register(...registerables)

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const chartCanvas = ref(null)
let chartInstance = null

function createOrUpdateChart() {
  if (!chartCanvas.value || !props.weather?.temp) return
  
  const ctx = chartCanvas.value.getContext('2d')
  const history = generateTemperatureHistory(props.weather.temp, props.weather.regionId)
  
  if (chartInstance) {
    chartInstance.data.labels = history.map(h => h.date)
    chartInstance.data.datasets[0].data = history.map(h => h.temperature)
    chartInstance.update()
    return
  }
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.map(h => h.date),
      datasets: [
        {
          label: 'Température (°C)',
          data: history.map(h => h.temperature),
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 64, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#16a34a',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#ffffff',
          bodyColor: '#e2e8f0',
          borderColor: '#16a34a',
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: '#64748b',
            font: {
              size: 11,
            },
          },
          grid: {
            color: 'rgba(100, 116, 140, 0.1)',
          },
        },
        x: {
          ticks: {
            color: '#64748b',
            font: {
              size: 11,
            },
          },
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

onMounted(() => {
  createOrUpdateChart()
})

watch(
  () => [props.weather?.temp, props.weather?.regionId],
  () => {
    createOrUpdateChart()
  },
  { deep: true }
)

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 1rem;
}
</style>