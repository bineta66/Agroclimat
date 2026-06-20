<template>
  <div class="app">
    <header class="app-header">
      <h1>AgroClimat – Monitoring climatique au Sénégal</h1>
    </header>

    <main class="app-main">
      <section class="map-section">
        <SenegalMap
          :selected-region="selectedRegionId"
          @region-select="handleRegionSelect"
        />
      </section>

      <aside class="side-panel" v-if="selectedRegion">
        <h2>{{ selectedRegion.name }}</h2>
        <dl class="region-meta">
          <dt>Code région</dt>
          <dd><code>{{ selectedRegion.code }}</code></dd>
          <dt>Superficie</dt>
          <dd>{{ selectedRegion.superficie }}</dd>
          <dt>Population (approx.)</dt>
          <dd>{{ selectedRegion.population }}</dd>
          <dt v-if="selectedRegion.lat">Coordonnées</dt>
          <dd v-if="selectedRegion.lat" class="coords">
            {{ selectedRegion.lat.toFixed(4) }}°N, {{ Math.abs(selectedRegion.lon).toFixed(4) }}°W
          </dd>
        </dl>

        <p class="placeholder">
          Données météo à venir (température, humidité, risque agricole…).
        </p>
      </aside>
    </main>
  </div>
</template>

<script>
import SenegalMap from './components/map/SenegalMap.vue'
import { REGION_MAP, getRegionById } from './data/regions'

export default {
  name: 'App',
  components: {
    SenegalMap,
  },
  data() {
    return {
      selectedRegionId: 'SNDK', // Dakar par défaut
    }
  },
  computed: {
    selectedRegion() {
      return getRegionById(this.selectedRegionId) || null
    },
  },
  methods: {
    handleRegionSelect(regionId) {
      this.selectedRegionId = regionId
    },
  },
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.app-header {
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.app-header h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 1.5rem;
}

.map-section {
  flex: 2;
  min-width: 0;
}

.side-panel {
  flex: 1;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.side-panel h2 {
  margin: 0;
  font-size: 1.25rem;
}

.region-meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 1rem;
  font-size: 0.9rem;
}

.region-meta dt {
  color: #6b7280;
  font-weight: 500;
}

.region-meta dd {
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.region-meta code {
  font-size: 0.85rem;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

.coords {
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}

.placeholder {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 900px) {
  .app-main {
    flex-direction: column;
  }

  .map-section {
    max-width: 100%;
  }
}
</style>
