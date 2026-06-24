/**
 * Génère des recommandations agricoles via Groq (llama-3.3-70b)
 * à partir du risque climatique calculé.
 *
 * Retourne un tableau de recommandations concrètes pour les agriculteurs.
 */

// ─────────────────────────────────────────────
// Erreurs typées
// ─────────────────────────────────────────────
class ApiAuthError extends Error {
  constructor() {
    super('Clé API Groq invalide ou absente (401)')
    this.name = 'ApiAuthError'
  }
}

class ApiRateLimitError extends Error {
  constructor() {
    super('Quota API Groq dépassé (429)')
    this.name = 'ApiRateLimitError'
  }
}

class ApiResponseError extends Error {
  constructor(status) {
    super(`Erreur serveur Groq (${status})`)
    this.name = 'ApiResponseError'
    this.status = status
  }
}

class ParseError extends Error {
  constructor(raw) {
    super('Réponse LLM non parseable en JSON')
    this.name = 'ParseError'
    this.raw = raw
  }
}

// ─────────────────────────────────────────────
// Recommandations statiques de fallback
// (si l'API est indisponible — spec F)
// ─────────────────────────────────────────────
const FALLBACK_RECOMMANDATIONS = {
  high: [
    'Suspendre toute activité agricole pendant les heures les plus chaudes (12h-16h).',
    "Irriguer tôt le matin ou en soirée pour limiter l'évaporation.",
    "Protéger les cultures fragiles avec des filets d'ombrage.",
  ],
  medium: [
    "Surveiller l'humidité du sol et ajuster l'irrigation.",
    'Éviter les traitements phytosanitaires par forte chaleur.',
    "Contrôler l'apparition de maladies fongiques liées à l'humidité."
  ],
  low: [
    'Conditions favorables : profiter pour les semis et les récoltes.',
    'Maintenir une irrigation régulière et modérée.',
    'Surveiller la météo des prochains jours.',
  ],
}

function getFallbackRecommandations(score) {
  if (score >= 65) return FALLBACK_RECOMMANDATIONS.high
  if (score >= 35) return FALLBACK_RECOMMANDATIONS.medium
  return FALLBACK_RECOMMANDATIONS.low
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function assertApiKey() {
  const key = import.meta.env.VITE_GROQ_KEY
  if (!key || key.trim() === '') throw new ApiAuthError()
  return key
}

function handleHttpError(status) {
  if (status === 401) throw new ApiAuthError()
  if (status === 429) throw new ApiRateLimitError()
  throw new ApiResponseError(status)
}

function parseAndValidate(text) {
  const clean = text.replace(/```json|```/g, '').trim()
  let result
  try {
    result = JSON.parse(clean)
  } catch {
    throw new ParseError(clean)
  }
  if (!Array.isArray(result) || result.length === 0) {
    throw new ParseError(clean)
  }
  return result
}

const logger = {
  success: (label, result) =>
    console.info('[recommendationLLM] ✓ Recommandations générées', { label, result }),
  fallback: (error) =>
    console.warn('[recommendationLLM] ⚠ Fallback recommandations statiques', {
      type: error.name,
      message: error.message,
      ...(error.status && { httpStatus: error.status }),
      ...(error.raw    && { rawResponse: error.raw }),
    }),
}

// ─────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────

/**
 * Génère des recommandations agricoles personnalisées via Groq.
 *
 * @param {{ score: number, label: string, color: string }} risk
 * @param {number} temp      - Température en °C
 * @param {number} humidity  - Humidité en %
 * @param {string} regionName - Nom de la région
 * @returns {Promise<string[]>} - Tableau de recommandations
 */
export async function getRecommendations(risk, temp, humidity, regionName) {
  try {
    const apiKey = assertApiKey()

    const prompt = `
Région : ${regionName}
Température : ${temp.toFixed(1)}°C
Humidité : ${Math.round(humidity)}%
Indice de risque : ${risk.score}/100 — ${risk.label}

Génère exactement 3 recommandations concrètes et actionnables pour les agriculteurs
de cette région face à ces conditions climatiques.

Réponds UNIQUEMENT avec un tableau JSON de 3 chaînes de caractères, sans texte avant ni après.
Exemple de format attendu :
["Recommandation 1.", "Recommandation 2.", "Recommandation 3."]
`.trim()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 300,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en agronomie et climatologie au Sénégal.
Tu donnes des conseils pratiques, courts et directement applicables aux agriculteurs locaux.
Tiens compte du contexte sénégalais : cultures de mil, arachide, riz, maïs, et saison des pluies (hivernage juillet-octobre).`,
          },
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!response.ok) handleHttpError(response.status)

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? ''
    const result = parseAndValidate(text)

    logger.success(risk.label, result)
    return result

  } catch (error) {
    logger.fallback(error)
    return getFallbackRecommandations(risk.score)
  }
}