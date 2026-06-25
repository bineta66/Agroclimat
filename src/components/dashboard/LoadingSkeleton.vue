<template>
  <div class="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl bg-white" aria-label="Chargement des données météo">
    <div class="h-4 rounded-full bg-gray-200 w-[72%]"></div>
    <div class="h-4 rounded-full bg-gray-200 w-full"></div>
    <div class="grid grid-cols-2 gap-3 mt-2">
      <div class="h-16 rounded-full bg-gray-200"></div>
      <div class="h-16 rounded-full bg-gray-200"></div>
      <div class="h-16 rounded-full bg-gray-200"></div>
      <div class="h-16 rounded-full bg-gray-200"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
div {
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 37%, #e2e8f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
