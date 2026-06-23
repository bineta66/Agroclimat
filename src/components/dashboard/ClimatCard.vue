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
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  border: 1px solid #f1f5f9;
}

.region-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #16a34a;
  text-transform: capitalize;
}

.region-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0.4rem 0;
}

.weather-icon {
  width: 72px;
  height: 72px;
}

.temp-container {
  display: flex;
  align-items: baseline;
}

.main-temp {
  font-size: 3rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.weather-condition {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  text-transform: capitalize;
}

.weather-metrics {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
  width: 100%;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
}

.metric-label {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .weather-card {
    padding: 1.2rem;
  }

  .region-name {
    font-size: 1.2rem;
  }

  .weather-icon {
    width: 56px;
    height: 56px;
  }

  .main-temp {
    font-size: 2.4rem;
  }

  .weather-metrics {
    gap: 1rem;
  }

  .metric-label {
    font-size: 0.7rem;
  }

  .metric-value {
    font-size: 0.85rem;
  }
}
</style>
