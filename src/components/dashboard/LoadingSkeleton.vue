<template>
  <div class="loading-skeleton" aria-label="Chargement des données météo">
    <div class="skeleton-line wide"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-grid">
      <div class="skeleton-box"></div>
      <div class="skeleton-box"></div>
      <div class="skeleton-box"></div>
      <div class="skeleton-box"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  background: #ffffff;
}

.skeleton-line,
.skeleton-box {
  border-radius: 999px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 37%, #e2e8f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-line {
  height: 16px;
}

.skeleton-line.wide {
  width: 72%;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 0.5rem;
}

.skeleton-box {
  height: 64px;
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
