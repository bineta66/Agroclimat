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

      <section class="side-panel" v-if="selectedRegion">
        <h2>{{ selectedRegion.name }}</h2>
        <p><strong>Code SVG :</strong> {{ selectedRegion.id }}</p>
        <p><strong>Code métier :</strong> {{ selectedRegion.code }}</p>

        <!-- Ici plus tard : WeatherPanel, RiskBadge, TemperatureChart, etc. -->
        <p class="placeholder">
          Panneau météo à implémenter ici (température, humidité, risque, graph…)
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import SenegalMap from './components/map/SenegalMap.vue'
import { senegalRegionsFromSvg } from './data/regionsFromSvg'

export default {
  name: 'App',
  components: {
    SenegalMap,
  },
  data() {
    return {
      // id SVG de la région sélectionnée, ex: 'SNDK'
      selectedRegionId: 'SNDK', // Dakar par défaut
    }
  },
  computed: {
    // objet complet de la région sélectionnée (id, code, name, d)
    selectedRegion() {
      return senegalRegionsFromSvg.find((r) => r.id === this.selectedRegionId) || null
    },
  },
  methods: {
    handleRegionSelect(regionId) {
      this.selectedRegionId = regionId
      // plus tard : déclencher ici l'appel API météo / store
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
  max-width: 60%;
}

.side-panel {
  flex: 1;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.side-panel h2 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
}

.placeholder {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #6b7280;
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


