<template>
  <div class="alerte-page">
    <h2>Alertes climatiques</h2>
    <p class="subtitle">Surveillance en temps réel des risques agricoles.</p>

    <div v-if="!hasWeather" class="alerte-placeholder">
      <p>En attente des données météo...</p>
    </div>

    <div v-else class="alerte-content">
      <div class="alert-message-box" :class="messageBoxClass">
        <p class="alert-message-text">{{ store.alertMessage }}</p>
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
  if (store.alertLevel === store.ALERT_LEVEL.ROUGE) return 'alert-message-box--rouge'
  if (store.alertLevel === store.ALERT_LEVEL.ORANGE) return 'alert-message-box--orange'
  return 'alert-message-box--vert'
})
</script>

<style scoped>
.alerte-page {
  padding: 1rem;
}

.alerte-page h2 {
  margin: 0 0 0.25rem;
  font-size: 1.6rem;
  color: #0f172a;
}

.subtitle {
  margin: 0 0 1.5rem;
  color: #64748b;
  font-size: 0.95rem;
}

.alerte-placeholder {
  padding: 2.5rem;
  border-radius: 1rem;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  text-align: center;
  color: #64748b;
}

.alert-message-box {
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
}

.alert-message-box--rouge {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-color: #ef4444;
}

.alert-message-box--orange {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-color: #f97316;
}

.alert-message-box--vert {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #22c55e;
}

.alert-message-text {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.6;
}
</style>
