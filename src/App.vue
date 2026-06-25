<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Overlay mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar mobile: drawer -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <Sidebar
        :active-id="currentTab"
        @change-tab="onChangeTab"
        @close="sidebarOpen = false"
      />
    </aside>

    <!-- Sidebar desktop: statique inline -->
    <div class="hidden md:block md:flex-shrink-0 md:h-screen md:sticky md:top-0 md:self-start">
      <Sidebar
        :active-id="currentTab"
        @change-tab="onChangeTab"
      />
    </div>

    <main class="flex-1 flex flex-col gap-3 p-3 md:p-4 lg:p-5 min-w-0">
      <Navbar
        :loading="loading"
        @use-position="useMyPosition"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

        <div class="flex-1 overflow-auto">
        <div class="content-wrapper flex flex-col lg:flex-row gap-3 lg:gap-4" v-if="currentTab === 'meteo'">
          <div class="map-chart-wrapper flex flex-col flex-1 gap-3 min-w-0">
            <section class="map-section bg-white rounded-xl shadow-sm border border-gray-200 p-3" aria-label="Carte des régions du Sénégal">
              <SenegalMap
                :selected-region="selectedRegionId"
                @region-select="selectRegion"
              />
            </section>

            <section
              v-if="weather && selectedRegion"
              class="chart-section bg-white rounded-xl shadow-sm border border-gray-200 p-3"
              aria-label="Évolution de la température"
            >
              <div class="chart-header mb-3">
                <h3 class="text-sm md:text-base font-medium text-gray-900">Évolution de la température - 7 derniers jours</h3>
              </div>

              <TemperatureChart :weather="weather" />
            </section>
          </div>

          <aside class="side-panel w-full lg:w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 p-3" aria-label="Détails météo">
             <template v-if="selectedRegion">
            <div class="panel-header flex justify-between items-start mb-3">
              <div>
                <p class="eyebrow text-[10px] font-bold text-green-600 uppercase tracking-wider">Météo</p>
                <h2 class="text-base md:text-lg font-medium text-gray-900 mt-0.5">
                  {{ selectedRegion?.name || 'Aucune région sélectionnée' }}
                </h2>
              </div>

            </div>

            <p v-if="sourceLabel" class="source-line text-xs text-gray-500 bg-green-50 text-green-800 rounded-lg px-2.5 py-1 mb-3">
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

            <RiskBadge
              v-if="risk && weather"
              :risk="risk"
              :temp="weather.temp"
              :humidity="weather.humidity"
            />

            <div class="modal-triggers flex gap-2 mt-3">
              <button type="button" class="btn-modal w-full border-0 rounded-lg px-3 py-2 bg-green-600 text-white font-bold text-xs cursor-pointer hover:bg-green-700 transition-colors" @click="openAlertModal">
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
      </div>
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
const sidebarOpen = ref(false)

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
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
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