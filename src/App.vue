<template>
  <div class="app">
    

    <main class="app-main">
      <!-- Sidebar à gauche -->
      <Sidebar class="app-sidebar" />

      <!-- Contenu principal : carte + panneau météo -->
      <div class="app-main-content">
        <section class="map-section" aria-label="Carte des régions du Sénégal">
          <SenegalMap
            :selected-region="selectedRegionId"
            @region-select="selectRegion"
          />
        </section>

        <aside class="side-panel" aria-label="Détails météo">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Météo OpenWeatherMap</p>
              <h2>{{ selectedRegion.name }}</h2>
            </div>
            <button
              class="position-button"
              type="button"
              :disabled="loading"
              @click="useMyPosition"
            >
              Ma position
            </button>
          </div>

          <p v-if="sourceLabel" class="source-line">{{ sourceLabel }}</p>

          <dl class="region-meta">
            <dt>Code région</dt>
            <dd><code>{{ selectedRegion.code }}</code></dd>
            <dt v-if="selectedRegion.lat">Coordonnées</dt>
            <dd v-if="selectedRegion.lat" class="coords">
              {{ selectedRegion.lat.toFixed(4) }}°N,
              {{ Math.abs(selectedRegion.lon).toFixed(4) }}°W
            </dd>
          </dl>

          <ClimatPanel
            :region="selectedRegion"
            :weather="weather"
            :loading="loading"
            :error="errorMessage"
            @retry="loadDefaultWeather"
          />
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import ClimatPanel from './components/dashboard/ClimatPanel.vue'
import SenegalMap from './components/map/SenegalMap.vue'
import { useClimat } from './composables/useClimat'
import Sidebar from './components/dashboard/Sidebar.vue'
const {
  selectedRegionId,
  selectedRegion,
  weather,
  loading,
  errorMessage,
  sourceLabel,
  selectRegion,
  useMyPosition,
  loadDefaultWeather,
} = useClimat()
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8fafc;
}

.app-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.app-header h1 {
  margin: 0.2rem 0 0.5rem;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 700;
  color: #0f172a;
}

.header-copy {
  max-width: 760px;
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #16a34a;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.app-main {
  flex: 1;
  display: flex;
  
}

.map-section {
  flex: 1.2;
  min-width: 0;
  height: 420px;
  padding: 1rem;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.app-main-content {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
}

.side-panel {
  flex: 0 0 390px;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.35rem;
  color: #0f172a;
}

.position-button {
  flex: 0 0 auto;
  border: 0;
  border-radius: 999px;
  padding: 0.65rem 0.9rem;
  color: #ffffff;
  background: #16a34a;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.position-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.position-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.source-line {
  margin: 0.75rem 0;
  padding: 0.6rem 0.75rem;
  border-radius: 0.75rem;
  color: #166534;
  background: #dcfce7;
  font-size: 0.9rem;
}

.region-meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.45rem 1rem;
  padding: 0 0 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

.region-meta dt {
  color: #64748b;
  font-weight: 600;
}

.region-meta dd {
  margin: 0;
  color: #0f172a;
  font-variant-numeric: tabular-nums;
}

.region-meta code {
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #0f172a;
}

.coords {
  font-family: ui-monospace, Consolas, monospace;
}

@media (max-width: 1050px) {
  .app-main {
    flex-direction: column;
  }

  .side-panel {
    flex-basis: auto;
  }
}
</style>
