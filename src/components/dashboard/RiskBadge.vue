<template>
  <div v-if="risk" class="risk-card">
    <div class="risk-header">
      <span class="risk-title">Indice de risque climatique</span>
      <span class="risk-score" :style="{ color: risk.color }">
        {{ risk.score }} / 100
      </span>
    </div>

    <div class="risk-body">
      <div class="risk-badge" :style="{ borderColor: risk.color }">
        <span class="risk-dot" :style="{ backgroundColor: risk.color }"></span>
        <span class="risk-label">{{ risk.label }}</span>
      </div>

      <p v-if="showContext && temp != null && humidity != null" class="risk-note">
        Calculé à partir de {{ temp.toFixed(1) }}°C et {{ humidity }}% d’humidité.
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  risk: {
    type: Object,
    default: null,
  },
  temp: {
    type: Number,
    default: null,
  },
  humidity: {
    type: Number,
    default: null,
  },
  showContext: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.risk-card {
  margin-top: 0.75rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.9rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.risk-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.risk-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
}

.risk-score {
  font-size: 0.9rem;
  font-weight: 700;
}

.risk-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background: #ffffff;
}

.risk-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.risk-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #111827;
}

.risk-note {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
}
</style>

