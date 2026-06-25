function calculateSeverity(weatherData) {
  const temp = Number(weatherData.temp)
  const humidity = Number(weatherData.humidity)
  const windKmh = Number(weatherData.windSpeed) * 3.6

  if (!Number.isFinite(temp)) return 0

  if (temp > 38) return 2
  if (temp > 32) return 1

  if (Number.isFinite(humidity)) {
    if (humidity > 85) return 2
    if (humidity > 75) return 1
  }

  if (Number.isFinite(windKmh)) {
    if (windKmh > 50) return 2
    if (windKmh > 25) return 1
  }

  return 0
}

export function checkAlerts(weatherData, riskScore = null, regionName = null) {
  if (!weatherData || weatherData.temp == null) return null

  const severity = calculateSeverity(weatherData)
  const temp = Number(weatherData.temp)
  const location = regionName ? `À ${regionName}, ` : ''

  if (severity === 2) {
    return `${location}${temp.toFixed(1)}°C, risque de pertes agricoles importantes`
  }
  if (severity === 1) {
    return `${location}${temp.toFixed(1)}°C, surveiller les recolllect, risque de dégâts partiels`
  }
  return `${location}${temp.toFixed(1)}°C, conditions favorables aux cultures`
}

export function computeAlertLevel(weatherData, riskScore = null) {
  if (!weatherData || weatherData.temp == null) return 'VERT'

  const severity = calculateSeverity(weatherData)

  if (severity === 2) return 'ROUGE'
  if (severity === 1) return 'ORANGE'
  return 'VERT'
}

export function getNotification(weatherData, riskScore = null, regionName = null) {
  const message = checkAlerts(weatherData, riskScore, regionName)
  const level = computeAlertLevel(weatherData, riskScore)

  if (level === 'ROUGE') return ` ${message}`
  if (level === 'ORANGE') return ` ${message}`
  return `✔ ${message}`
}
