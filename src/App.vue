<template>
  <div class="app">
    <Sidebar
      class="app-sidebar"
      :active-id="currentTab"
      @change-tab="onChangeTab"
    />

    <main class="app-main">
      <Navbar
        :loading="loading"
        @use-position="useMyPosition"
      />

      <div class="content-wrapper" v-if="currentTab === 'meteo'">
        <div class="map-chart-wrapper">
          
          <!-- MAP -->
          <section class="map-section" aria-label="Carte des régions du Sénégal">
            <SenegalMap
              :selected-region="selectedRegionId"
              @region-select="selectRegion"
            />
          </section>

          <!-- CHART -->
          <section
            v-if="weather && selectedRegion"
            class="chart-section"
            aria-label="Évolution de la température"
          >
            <div class="chart-header">
              <h3>Évolution de la température - 7 derniers jours</h3>
            </div>

            <TemperatureChart :weather="weather" />
          </section>

        </div>

        <!-- SIDE PANEL -->
        <aside class="side-panel" aria-label="Détails météo">
           <template v-if="selectedRegion"> 
          <div class="panel-header">
            <div>
              <p class="eyebrow">Météo</p>
              <h2>
                {{ selectedRegion?.name || 'Aucune région sélectionnée' }}
              </h2>
            </div>

          </div>

          <p v-if="sourceLabel" class="source-line">
            {{ sourceLabel }}
          </p>

          <ClimatPanel
            :region="selectedRegion"
            :weather="weather"
            :risk="risk"
            :loading="loading"
            :error="errorMessage"
            @retry="loadDefaultWeather"
          />

          <!-- Carde de risque juste en dessous du panel -->
          <RiskBadge
            v-if="risk && weather"
            :risk="risk"
            :temp="weather.temp"
            :humidity="weather.humidity"
          />

          <!-- Bouton pour ouvrir la modale alerte -->
          <div class="modal-triggers">
            <button type="button" class="btn-modal" @click="openAlertModal">
              Alertes climatiques
            </button>
          </div>

          </template>
        </aside>
      </div>

      <AssistantAgricole v-else-if="currentTab === 'assistant'" />

      <!-- MODALE ALERTE -->
      <Modal v-model="showAlertModal" title="Alertes climatiques" size="medium">
        <AlerteVue />
      </Modal>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/dashboard/Sidebar.vue'
import ClimatPanel from './components/dashboard/ClimatPanel.vue'
import SenegalMap from './components/map/SenegalMap.vue'
import TemperatureChart from './components/charts/TemperatureChart.vue'
import Navbar from './components/dashboard/Navbar.vue'

import AssistantAgricole from './components/assistant/AssistantAgricole.vue'
import AlerteVue from './components/alerte/AlerteVue.vue'
import Modal from './components/ui/Modal.vue'
import { useClimat } from './composables/useClimat'
import RiskBadge from './components/dashboard/RiskBadge.vue'

const currentTab = ref('meteo')
const showAlertModal = ref(false)
const showHistoriqueModal = ref(false)

const {
  selectedRegionId,
  selectedRegion,
  weather,
  risk,
  loading,
  errorMessage,
  sourceLabel,
  selectRegion,
  useMyPosition,
  loadDefaultWeather,
} = useClimat()



function onChangeTab(tabId) {
  currentTab.value = tabId
}

function openAlertModal() {
  showAlertModal.value = true
}

function openHistoriqueModal() {
  showHistoriqueModal.value = true
}

onMounted(() => {
  loadDefaultWeather()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fff;
}

/* SIDEBAR */
.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  border-right: 1px solid #e5e7eb;
  z-index: 1000;
}

/* MAIN */
.app-main {
  width: calc(100% - 260px);
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

/* WRAPPERS */
.content-wrapper {
  display: flex;
  gap: 1rem;
}

.map-chart-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1.2;
  gap: 0.5rem;
}

/* MAP */
.map-section {
  height: 460px;
  padding: 1rem;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

/* CHART */
.chart-section {
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.chart-header h3 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
}

/* SIDE PANEL */
.side-panel {
  height: 100%;
  flex: 0 0 320px;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  color: #16a34a;
  text-transform: uppercase;
}

.position-button {
  border: none;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  background: #16a34a;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.position-button:disabled {
  opacity: 0.5;
}

.source-line {
  margin: 0.75rem 0;
  padding: 0.3rem;
  border-radius: 0.75rem;
  background: #dcfce7;
  color: #166534;
}

.modal-triggers {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.btn-modal {
  flex: 1;
  border: 0;
  border-radius: 0.6rem;
  padding: 0.65rem 0.9rem;
  background: #16a34a;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-modal--secondary {
  background: #ffffff;
  color: #16a34a;
  border: 1px solid #16a34a;
}

.btn-modal:hover {
  opacity: 0.9;
}
</style>