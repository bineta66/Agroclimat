<template>
  <section class="climat-panel">
    <div v-if="loading" class="panel-body">
      <LoadingSkeleton />
    </div>

    <ErreurMessage v-else-if="error" :error="error" @retry="$emit('retry')" />

<div v-else-if="weather && region" class="panel-body">
       <p class="panel-subtitle">Données temps réel</p>
       <ClimatCard :region="region" :weather="weather" />
       <p class="location-note">
         Région : {{ region.name }} · Code : {{ region.code }}
       </p>
     </div>

    <div v-else class="panel-body empty-state">
      Sélectionnez une région sur la carte pour charger sa météo.
    </div>
  </section>
</template>

<script setup>
import ClimatCard from './ClimatCard.vue'
import ErreurMessage from '../gestionErreur/ErreurMessage.vue'
import LoadingSkeleton from './LoadingSkeleton.vue'

defineProps({
  region: {
    type: Object,
    default: null,
  },
  weather: {
    type: Object,
    default: null,
  },
  risk: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
})

defineEmits(['retry'])
</script>

<style scoped>
.climat-panel {
  display: flex;
  flex-direction: column;
}

.panel-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.panel-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.location-note {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.empty-state {
  min-height: 180px;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cbd5e1;
  border-radius: 0.9rem;
  color: #64748b;
  background: #f8fafc;
  text-align: center;
}
</style>
