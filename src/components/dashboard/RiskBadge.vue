<template>
  <div v-if="risk" class="mt-3 p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
    <!-- Titre -->
    <div class="flex justify-between items-center gap-2">
      <span class="text-sm font-semibold text-gray-900">Indice de risque climatique</span>
      <span class="text-sm text-gray-400 cursor-help" title="Calculé à partir de la température et de l'humidité">ⓘ</span>
    </div>

    <!-- Corps : jauge à gauche + infos à droite -->
    <div class="flex flex-col sm:flex-row items-center sm:items-center gap-4">
      <!-- Jauge circulaire SVG -->
      <div class="flex-shrink-0 w-[90px] h-[90px]">
        <svg viewBox="0 0 120 120" class="w-full h-full">
          <circle cx="60" cy="60" r="48" fill="none" stroke="#e5e7eb" stroke-width="10" stroke-linecap="round" :stroke-dasharray="`${ARC_LENGTH} ${FULL_CIRCLE}`" :stroke-dashoffset="-GAP / 2" transform="rotate(90 60 60)" />
          <circle cx="60" cy="60" r="48" fill="none" :stroke="risk.color" stroke-width="10" stroke-linecap="round" :stroke-dasharray="`${scoreArc} ${FULL_CIRCLE}`" :stroke-dashoffset="-GAP / 2" transform="rotate(90 60 60)" class="gauge-progress" />
          <text x="60" y="56" text-anchor="middle" class="text-[28px] font-extrabold fill-gray-900" style="font-family: system-ui, sans-serif;">{{ risk.score }}</text>
          <text x="60" y="70" text-anchor="middle" class="text-[11px] fill-gray-500" style="font-family: system-ui, sans-serif;">/100</text>
        </svg>
      </div>

      <!-- Infos à droite -->
      <div class="flex flex-col gap-2 min-w-0 flex-1">
        <!-- Badge label -->
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border bg-white" :style="{ borderColor: risk.color }">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: risk.color }"></span>
          <span class="text-sm font-semibold text-gray-900">{{ risk.label }}</span>
        </div>

        <!-- Score texte -->
        <span class="text-sm font-bold" :style="{ color: risk.color }">
          {{ risk.score }} / 100
        </span>

        <!-- Note contextuelle -->
        <p v-if="showContext && temp != null && humidity != null" class="text-xs text-gray-500 leading-relaxed m-0">
          Calculé à partir de {{ temp.toFixed(1) }}°C et {{ humidity }}% d'humidité.
        </p>
      </div>
    </div>
  </div>

  <div v-if="recommandationsLoading" class="mt-3 text-xs text-gray-400">
    Génération des recommandations…
  </div>

  <ul v-else-if="recommandations.length" class="mt-3 p-0 list-none flex flex-col gap-2">
    <li v-for="(reco, i) in recommandations" :key="i" class="px-3 py-2 rounded-lg bg-green-50 border-l-[3px] border-green-600 text-xs text-green-800 leading-relaxed">
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
.gauge-progress {
  transition: stroke-dasharray 0.6s ease;
}
</style>