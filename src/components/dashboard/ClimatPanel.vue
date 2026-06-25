<template>
  <section class="flex flex-col">
    <div v-if="loading" class="panel-body">
      <LoadingSkeleton />
    </div>

    <ErreurMessage v-else-if="error" :error="error" @retry="$emit('retry')" />

    <div v-else-if="weather && region" class="panel-body flex flex-col gap-4">
      <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Données temps réel</p>
      <ClimatCard :region="region" :weather="weather" />
      <p class="text-sm text-gray-500">
        Région : {{ region.name }} · Code : {{ region.code }}
      </p>
    </div>

    <div v-else class="panel-body empty-state min-h-[180px] flex items-center justify-center border border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-500 text-center">
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
