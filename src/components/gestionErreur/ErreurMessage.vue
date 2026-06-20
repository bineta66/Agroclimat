<template>
  <div class="error-message" role="alert">
    <strong>{{ title }}</strong>
    <p>{{ message }}</p>
    <button type="button" @click="$emit('retry')">
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
