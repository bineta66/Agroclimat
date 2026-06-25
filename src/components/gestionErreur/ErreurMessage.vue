<template>
  <div class="flex flex-col gap-2 p-4 border border-red-200 rounded-xl bg-red-50 text-red-900" role="alert">
    <strong class="text-base font-bold">Impossible de charger la météo</strong>
    <p class="m-0 leading-relaxed">Vérifiez la clé API OpenWeatherMap, votre connexion internet, puis réessayez.</p>
    <button type="button" class="w-fit border-0 rounded-full px-3 py-2 text-white bg-red-600 font-bold cursor-pointer hover:bg-red-700 transition-colors" @click="$emit('retry')">
      Recharger Dakar
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: null,
  },
})

const title = 'Impossible de charger la météo'

const message = 'Vérifiez la clé API OpenWeatherMap, votre connexion internet, puis réessayez.'
</script>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  border: 1px solid #fecaca;
  border-radius: 1rem;
  color: #7f1d1d;
  background: #fef2f2;
}

.error-message strong {
  font-size: 1rem;
}

.error-message p {
  margin: 0;
  line-height: 1.5;
}

.error-message button {
  width: fit-content;
  border: 0;
  border-radius: 999px;
  padding: 0.6rem 0.85rem;
  color: #ffffff;
  background: #dc2626;
  font-weight: 700;
  cursor: pointer;
}
</style>
