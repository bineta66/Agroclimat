<template>
  <article class="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3">
    <h3 class="m-0 text-lg md:text-xl font-bold text-green-700 capitalize">{{ region?.name || 'Dakar' }}</h3>
    <p v-if="isDakar" class="m-0 text-xs text-gray-500 font-semibold uppercase tracking-wider">Capitale du Sénégal</p>

    <div class="flex items-center justify-center gap-3 my-1">
      <img
        v-if="weather.iconUrl"
        :src="weather.iconUrl"
        :alt="weather.conditionFr"
        class="w-14 h-14 md:w-18 md:h-18"
      />
      <div class="flex items-baseline">
        <strong class="text-4xl md:text-5xl font-bold text-gray-900 leading-none">{{ formatTemperature(weather.temp) }}</strong>
      </div>
    </div>

    <p class="m-0 text-sm text-gray-600 capitalize">{{ weather.conditionFr || 'Partiellement nuageux' }}</p>

    <div class="flex justify-center gap-4 md:gap-6 mt-2 pt-3 border-t border-gray-100 w-full">
      <div class="flex flex-col gap-1 items-center">
        <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Humidité</span>
        <span class="text-sm font-bold text-gray-900">{{ formatValue(weather.humidity, '%') }}</span>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Vent</span>
        <span class="text-sm font-bold text-gray-900">{{ formatWindSpeed(weather.windSpeed) }}</span>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Ressenti</span>
        <span class="text-sm font-bold text-gray-900">{{ formatTemperature(weather.feelsLike) }}</span>
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
