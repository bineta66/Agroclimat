/**
 * Génère des recommandations agricoles via Groq (llama-3.3-70b)
 * à partir du risque climatique calculé.
 *
 * Retourne un tableau de recommandations concrètes pour les agriculteurs.
 * En cas d'erreur, propage l'exception à l'appelant (pas de fallback silencieux).
 */

// ─────────────────────────────────────────────
// Erreurs typées
// ─────────────────────────────────────────────
export class ApiRateLimitError extends Error {
  constructor() {
    super('Quota API Groq dépassé (429)')
    this.name = 'ApiRateLimitError'
  }
}

export class ApiResponseError extends Error {
  constructor(status) {
    super(`Erreur serveur Groq (${status})`)
    this.name = 'ApiResponseError'
    this.status = status
  }
}

export class ParseError extends Error {
  constructor(raw) {
    super('Réponse LLM non parseable en JSON')
    this.name = 'ParseError'
    this.raw = raw
  }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function handleHttpError(status) {
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

// ─────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────

/**
 * Génère des recommandations agricoles personnalisées via Groq.
 *
 * @param {{ score: number, label: string, color: string }} risk
 * @param {number} temp       - Température en °C
 * @param {number} humidity   - Humidité en %
 * @param {string} regionName - Nom de la région
 * @returns {Promise<string[]>} - Tableau de recommandations
 * @throws {ApiRateLimitError | ApiResponseError | ParseError}
 */
export async function getRecommendations(risk, temp, humidity, regionName) {
  const apiKey = import.meta.env.VITE_GROQ_KEY

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

  console.info('[recommendationLLM] ✓ Recommandations générées', { label: risk.label, result })
  return result
}