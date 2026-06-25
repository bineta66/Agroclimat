<template>
  <div class="p-4">
    <h2 class="m-0 mb-2 text-xl md:text-2xl font-medium text-gray-900">Alertes climatiques</h2>
    <p class="m-0 mb-6 text-sm md:text-base text-gray-500">Surveillance en temps réel des risques agricoles.</p>

    <div v-if="!hasWeather" class="p-8 md:p-10 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-center text-gray-500">
      <p>En attente des données météo...</p>
    </div>

    <div v-else>
      <div class="p-4 md:p-6 rounded-xl border" :class="messageBoxClass">
        <p class="m-0 text-base md:text-lg font-semibold text-gray-900 leading-relaxed">{{ store.alertMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAlertStore } from '../../stores/alertStore'

const store = useAlertStore()

const hasWeather = computed(() => store.weather.temp != null)

const messageBoxClass = computed(() => {
  if (store.alertLevel === store.ALERT_LEVEL.ROUGE) return 'bg-gradient-to-br from-red-50 to-red-100 border-red-400'
  if (store.alertLevel === store.ALERT_LEVEL.ORANGE) return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400'
  return 'bg-gradient-to-br from-green-50 to-green-100 border-green-400'
})
</script>
