import { computed } from 'vue'
import { fetchWeatherByRegion, getMessageErreurMeteo } from '../services/climatService'
import { getRegionFromPosition, getMessageErreurGeolocalisation } from '../services/geolocatisationService'
import {
  DEFAULT_REGION_ID,
  WEATHER_SOURCE_LABELS,
  clearWeather,
  getClimatState,
  setWeatherError,
  setWeatherLoading,
  setWeatherSuccess,
  setSelectedRegion,
} from '../stores/climatStore'

const fallbackMessages = {
  outside_senegal: 'Position hors Sénégal : Dakar chargé par défaut.',
  permission_denied: 'Autorisation refusée : Dakar chargé par défaut.',
  unsupported: 'Géolocalisation non disponible : Dakar chargé par défaut.',
  position_unavailable: 'Position indisponible : Dakar chargé par défaut.',
  timeout: 'Délai de géolocalisation dépassé : Dakar chargé par défaut.',
}

export function useClimat() {
  const state = getClimatState()

  const selectedRegionId = computed({
    get: () => state.selectedRegionId,
    set: (regionId) => selectRegion(regionId),
  })

  const selectedRegion = computed(() => state.region)
  const weather = computed(() => state.weather)
  const loading = computed(() => state.loading)
  const error = computed(() => state.error)
  const risk = computed(() => state.risk)

  const sourceLabel = computed(() => {
    if (state.geolocationMessage) {
      return state.geolocationMessage
    }

    return WEATHER_SOURCE_LABELS[state.source] || 'Région sélectionnée'
  })

  const errorMessage = computed(() => (error.value ? getMessageErreurMeteo(error.value) : null))

  async function selectRegion(regionId) {
    try {
      setSelectedRegion(regionId)
      setWeatherLoading()

      const nextWeather = await fetchWeatherByRegion(state.region)
      await setWeatherSuccess(nextWeather, 'manuel')
    } catch (caughtError) {
      setWeatherError(caughtError)
    }
  }

  async function loadDefaultWeather() {
    await selectRegion(DEFAULT_REGION_ID)
  }

  async function useMyPosition() {
    try {
      state.loading = true
      state.error = null
      state.weather = null

      const result = await getRegionFromPosition({ fallbackRegionId: DEFAULT_REGION_ID })
      const geolocationMessage = result.reason
        ? fallbackMessages[result.reason]
        : 'Météo chargée depuis votre position au Sénégal.'

      await selectRegion(result.region.id)
      state.source = result.source
      state.geolocationMessage = geolocationMessage
    } catch (caughtError) {
      setWeatherError(caughtError)
    }
  }

  return {
    selectedRegionId,
    selectedRegion,
    weather,
    risk,
    loading,
    error,
    errorMessage,
    sourceLabel,
    selectRegion,
    loadDefaultWeather,
    useMyPosition,
    clearWeather,
  }
}
