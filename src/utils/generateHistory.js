/**
 * Génère une série temporelle de 7 jours pour la température.
 * Utilise un générateur de nombres aléatoires cohérent basé sur la température actuelle.
 * Varie de -3°C à +3°C par rapport à la température actuelle.
 */

export function generateTemperatureHistory(currentTemp, regionId = 'default') {
  const baseSeed = hashCode(`${regionId}-${currentTemp}`)
  const history = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    const seed = baseSeed + i * 1000
    const variation = seededRandom(seed) * 6 - 3
    const temp = roundTo(currentTemp + variation, 1)
    
    history.push({
      date: date.toLocaleDateString('fr-SN', { weekday: 'short', day: 'numeric' }),
      fullDate: date.toISOString().split('T')[0],
      temperature: temp,
    })
  }
  
  return history
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return hash
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}