import { calculateRisk } from './riskCalculator.js'

const SYSTEM_PROMPT = `Tu es un expert en climatologie agricole au Sénégal.
On te donne la température (°C) et l'humidité (%) d'une région.
Tu dois évaluer le risque climatique pour les agriculteurs.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après.
Format exact :
{
  "score": <entier 0 à 100>,
  "label": "<libellé court en français>",
  "color": "<couleur hex>"
}

Règles de couleur :
- score >= 75 → #FF4500
- score >= 65 → #F97316
- score >= 50 → #EAB308
- score >= 25 → #22C55E
- score < 25  → #3B82F6

Contexte : l'hivernage sénégalais (juillet-octobre) rend
la forte humidité particulièrement dangereuse pour les cultures.`

export async function calculateRiskLLM(temp, humidity) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Température : ${temp.toFixed(1)}°C\nHumidité : ${Math.round(humidity)}%`,
          },
        ],
      }),
    })

    if (!response.ok) throw new Error(`Erreur API : ${response.status}`)

    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''
    const clean = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    if (
      typeof result.score !== 'number' ||
      typeof result.label !== 'string' ||
      typeof result.color !== 'string'
    ) throw new Error('Structure JSON invalide')

    print("ok")
    return result


  } catch (error) {
    // Fallback automatique sur les règles manuelles si l'API échoue
    console.warn('[riskLLM] fallback sur règles manuelles :', error.message)
    return calculateRisk(temp, humidity)
  }
}