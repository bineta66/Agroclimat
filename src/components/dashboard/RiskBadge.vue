<template>
  <div v-if="risk" class="risk-card">

    <!-- Titre -->
    <div class="risk-header">
      <span class="risk-title">Indice de risque climatique</span>
      <span class="gauge-info" title="Calculé à partir de la température et de l'humidité">ⓘ</span>
    </div>

    <!-- Corps : jauge à gauche + infos à droite -->
    <div class="risk-body">

      <!-- Jauge circulaire SVG -->
      <div class="gauge-wrap">
        <svg viewBox="0 0 120 120" class="gauge-svg">
          <!-- Arc fond gris (270°) -->
          <circle
            cx="60" cy="60" r="48"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="`${ARC_LENGTH} ${FULL_CIRCLE}`"
            :stroke-dashoffset="-GAP / 2"
            transform="rotate(90 60 60)"
          />
          <!-- Arc coloré proportionnel au score -->
          <circle
            cx="60" cy="60" r="48"
            fill="none"
            :stroke="risk.color"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="`${scoreArc} ${FULL_CIRCLE}`"
            :stroke-dashoffset="-GAP / 2"
            transform="rotate(90 60 60)"
            class="gauge-progress"
          />
          <!-- Score au centre -->
          <text x="60" y="56" text-anchor="middle" class="gauge-score-text">
            {{ risk.score }}
          </text>
          <text x="60" y="70" text-anchor="middle" class="gauge-max-text">/100</text>
        </svg>
      </div>

      <!-- Infos à droite -->
      <div class="risk-info">
        <!-- Badge label (conservé de l'original) -->
        <div class="risk-badge" :style="{ borderColor: risk.color }">
          <span class="risk-dot" :style="{ backgroundColor: risk.color }"></span>
          <span class="risk-label">{{ risk.label }}</span>
        </div>

        <!-- Score texte -->
        <span class="risk-score" :style="{ color: risk.color }">
          {{ risk.score }} / 100
        </span>

        <!-- Note contextuelle (conservée de l'original) -->
        <p v-if="showContext && temp != null && humidity != null" class="risk-note">
          Calculé à partir de {{ temp.toFixed(1) }}°C et {{ humidity }}% d'humidité.
        </p>
      </div>
    </div>
  </div>
  <div v-if="recommandationsLoading" class="reco-loading">
    Génération des recommandations…
  </div>

  
  <ul v-else-if="recommandations.length" class="reco-list">
    <li v-for="(reco, i) in recommandations" :key="i" class="reco-item">
      {{ reco }}
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useClimat } from '../../composables/useClimat'
const { recommandations, recommandationsLoading } = useClimat()
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

// Géométrie de la jauge — arc de 270° (vide en bas comme sur la maquette)
const FULL_CIRCLE = 2 * Math.PI * 48
const ARC_RATIO   = 270 / 360
const ARC_LENGTH  = FULL_CIRCLE * ARC_RATIO
const GAP         = FULL_CIRCLE * (1 - ARC_RATIO)

// Longueur de l'arc coloré proportionnelle au score
const scoreArc = computed(() =>
  props.risk ? ARC_LENGTH * (props.risk.score / 100) : 0
)
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
  align-items: center;
  gap: 0.5rem;
}

.risk-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
}

.gauge-info {
  font-size: 0.8rem;
  color: #9ca3af;
  cursor: help;
}

/* Corps : jauge + infos côte à côte */
.risk-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Jauge SVG */
.gauge-wrap {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
}

.gauge-svg {
  width: 100%;
  height: 100%;
}

.gauge-progress {
  transition: stroke-dasharray 0.6s ease;
}

.gauge-score-text {
  font-size: 28px;
  font-weight: 800;
  fill: #111827;
  font-family: system-ui, sans-serif;
}

.gauge-max-text {
  font-size: 11px;
  fill: #6b7280;
  font-family: system-ui, sans-serif;
}

/* Infos à droite de la jauge */
.risk-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.risk-score {
  font-size: 0.9rem;
  font-weight: 700;
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
  flex-shrink: 0;
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
  line-height: 1.4;
}

.reco-list {
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.reco-item {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: #f0fdf4;
  border-left: 3px solid #16a34a;
  font-size: 0.82rem;
  color: #166534;
  line-height: 1.4;
}
.reco-loading {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: #9ca3af;
}
</style>