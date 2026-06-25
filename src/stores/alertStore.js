import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { checkAlerts, computeAlertLevel, getNotification } from '../utils/notifications.js'

export const ALERT_LEVEL = {
  VERT: 'VERT',
  ORANGE: 'ORANGE',
  ROUGE: 'ROUGE',
}

export const useAlertStore = defineStore('alert', () => {
  const weather = ref({
    temp: null,
    feelsLike: null,
    humidity: null,
    windSpeed: null,
    windDirection: null,
    description: null,
    regionName: null,
  })

  const alertLevel = ref(ALERT_LEVEL.VERT)
  const alertMessage = ref('')

  function computeRiskScore() {
    let score = 0

    if (weather.value.temp != null) {
      if (weather.value.temp > 38) score += 3
      else if (weather.value.temp > 32) score += 1
    }

    if (weather.value.humidity != null) {
      if (weather.value.humidity > 85) score += 2
      else if (weather.value.humidity > 75) score += 1
    }

    if (weather.value.windSpeed != null) {
      const windKmh = weather.value.windSpeed * 3.6
      if (windKmh > 50) score += 2
      else if (windKmh > 25) score += 1
    }

    return score
  }

  const riskScore = computed(() => computeRiskScore())

  function computeAlert() {
    alertLevel.value = computeAlertLevel(weather.value, riskScore.value)
  }

  function generateAlertMessage() {
    alertMessage.value = checkAlerts(weather.value, riskScore.value, weather.value.regionName) || 'Aucune alerte détectée.'
  }

  function getNotificationText() {
    return getNotification(weather.value, riskScore.value, weather.value.regionName)
  }

  function updateWeather(data) {
    if (data.temp != null) weather.value.temp = Number(data.temp)
    if (data.feelsLike != null) weather.value.feelsLike = Number(data.feelsLike)
    if (data.humidity != null) weather.value.humidity = Number(data.humidity)
    if (data.windSpeed != null) weather.value.windSpeed = Number(data.windSpeed)
    if (data.windDirection != null) weather.value.windDirection = String(data.windDirection)
    if (data.description != null) weather.value.description = String(data.description)
    if (data.regionName != null) weather.value.regionName = String(data.regionName)
  }

  function reset() {
    weather.value = {
      temp: null,
      feelsLike: null,
      humidity: null,
      windSpeed: null,
      windDirection: null,
      description: null,
      regionName: null,
    }
    alertLevel.value = ALERT_LEVEL.VERT
    alertMessage.value = ''
  }

  return {
    weather,
    alertLevel,
    alertMessage,
    riskScore,
    updateWeather,
    computeAlert,
    generateAlertMessage,
    getNotificationText,
    reset,
    ALERT_LEVEL,
  }
})
