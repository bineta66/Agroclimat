<template>
  <article class="weather-card">
    <h3 class="region-name">{{ region?.name || 'Dakar' }}</h3>
    <p v-if="isDakar" class="region-subtitle">Capitale du Sénégal</p>

    <div class="weather-main">
      <img
        v-if="weather.iconUrl"
        :src="weather.iconUrl"
        :alt="weather.conditionFr"
        class="weather-icon"
      />
      <div class="temp-container">
        <strong class="main-temp">{{ formatTemperature(weather.temp) }}</strong>
      </div>
    </div>

    <p class="weather-condition">{{ weather.conditionFr || 'Partiellement nuageux' }}</p>

    <div class="weather-metrics">
      <div class="metric-item">
        <span class="metric-label">Humidité</span>
        <span class="metric-value">{{ formatValue(weather.humidity, '%') }}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Vent</span>
        <span class="metric-value">{{ formatWindSpeed(weather.windSpeed) }}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Ressenti</span>
        <span class="metric-value">{{ formatTemperature(weather.feelsLike) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  region: {
    type: Object,
    default: null,
  },
  weather: {
    type: Object,
    required: true,
  },
})

const isDakar = computed(() => props.region?.name === 'Dakar')

function formatTemperature(value) {
  return value === null || value === undefined ? '--' : `${value}°C`
}

function formatValue(value, suffix) {
  return value === null || value === undefined ? '--' : `${value}${suffix}`
}

function formatWindSpeed(value) {
  if (value === null || value === undefined) return '-- km/h'
  const kmh = Math.round(value * 3.6)
  return `${kmh} km/h`
}
</script>

<style scoped>
.weather-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.region-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.region-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
}

.weather-icon {
  width: 64px;
  height: 64px;
}

.temp-container {
  display: flex;
  align-items: baseline;
}

.main-temp {
  font-size: 2.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.weather-condition {
  margin: 0;
  color: #334155;
  font-size: 1rem;
  text-transform: capitalize;
}

.weather-metrics {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 0.5rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  color: #64748b;
  font-size: 0.8rem;
}

.metric-value {
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
}
</style>
