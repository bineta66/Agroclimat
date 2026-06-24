import { calculateRisk } from '../utils/calculateRisk.js'

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

class SchemaError extends Error {
  constructor(result) {
    super('Structure JSON invalide retournée par le LLM')
    this.name = 'SchemaError'
    this.received = result
  }
}

// ─────────────────────────────────────────────
// Prompt système
// ─────────────────────────────────────────────
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
- score <  25 → #3B82F6

Contexte : l'hivernage sénégalais (juillet-octobre) rend
la forte humidité particulièrement dangereuse pour les cultures.`

// ─────────────────────────────────────────────
// Helpers internes
// ─────────────────────────────────────────────

/** Vérifie que la clé API est présente avant d'appeler le réseau */
function assertApiKey() {
  const key = import.meta.env.VITE_GROQ_KEY
  if (!key || key.trim() === '') {
    throw new ApiAuthError()
  }
  return key
}

/** Lève une erreur typée selon le statut HTTP */
function handleHttpError(status) {
  if (status === 401) throw new ApiAuthError()
  if (status === 429) throw new ApiRateLimitError()
  throw new ApiResponseError(status)
}

/** Parse et valide la structure JSON retournée par le LLM */
function parseAndValidate(text) {
  const clean = text.replace(/```json|```/g, '').trim()

  let result
  try {
    result = JSON.parse(clean)
  } catch {
    throw new ParseError(clean)
  }

  if (
    typeof result.score !== 'number' ||
    typeof result.label !== 'string' ||
    typeof result.color !== 'string'
  ) {
    throw new SchemaError(result)
  }

  return result
}

// ─────────────────────────────────────────────
// Logger structuré
// ─────────────────────────────────────────────
const logger = {
  success: (temp, humidity, result) =>
    console.info('[riskLLM] ✓ Calcul Groq réussi', { temp, humidity, result }),

  fallback: (error) =>
    console.warn('[riskLLM] ⚠ Fallback règles manuelles', {
      type: error.name,
      message: error.message,
      ...(error.status   && { httpStatus: error.status }),
      ...(error.raw      && { rawResponse: error.raw }),
      ...(error.received && { received: error.received }),
    }),
}

// ─────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────

/**
 * Évalue le risque climatique via Groq (llama-3.3-70b-versatile).
 *
 * Pourquoi Groq plutôt qu'Anthropic directement ?
 * - API gratuite avec quota généreux, idéale pour un projet étudiant
 * - Llama-3.3-70b est très performant sur les tâches JSON structurées
 * - Latence très faible (~200ms) grâce aux puces LPU de Groq
 * - Compatible OpenAI SDK : format messages[] standard
 *
 * En cas d'échec, fallback automatique sur calculateRisk() (règles manuelles)
 * pour ne jamais bloquer l'UI (spec F du cahier des charges).
 *
 * @param {number} temp     - Température en °C
 * @param {number} humidity - Humidité en %
 * @returns {Promise<{ score: number, label: string, color: string }>}
 */
export async function calculateRiskLLM(temp, humidity) {
  try {
    const apiKey = assertApiKey()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 200,
        // Groq (format OpenAI) : le system prompt va DANS messages[],
        // pas au même niveau — contrairement à l'API Anthropic
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Température : ${temp.toFixed(1)}°C\nHumidité : ${Math.round(humidity)}%`,
          },
        ],
      }),
    })

    if (!response.ok) handleHttpError(response.status)

    const data = await response.json()

    // Groq (format OpenAI) : data.choices[0].message.content
    // (≠ Anthropic : data.content[0].text)
    const text = data.choices?.[0]?.message?.content ?? ''

    const result = parseAndValidate(text)

    logger.success(temp, humidity, result)
    return result

  } catch (error) {
    logger.fallback(error)
    return calculateRisk(temp, humidity)
  }
}