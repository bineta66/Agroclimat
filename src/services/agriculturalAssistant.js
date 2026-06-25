import { ref } from 'vue'

function assertApiKey() {
  const key = import.meta.env.VITE_GROQ_KEY
  if (!key || key.trim() === '') {
    throw new Error('Clé API Groq invalide ou absente (401)')
  }
  return key
}

function handleHttpError(status) {
  if (status === 401) throw new Error('Clé API Groq invalide ou absente (401)')
  if (status === 429) throw new Error('Quota API Groq dépassé (429)')
  throw new Error(`Erreur serveur Groq (${status})`)
}

const SYSTEM_PROMPT = `Tu es un assistant agricole exclusif spécialisé dans l'agriculture au Sénégal.

RÈGLE ABSOLUE : les bonjours et Tu ne réponds UNIQUEMENT qu'aux questions liées à l'agriculture.
Sujets autorisés : cultures (mil, arachide, riz, maïs, niébé, sorgho, bissap, mangue, pastèque, etc.), climat agricole, sols, irrigation, semis, récoltes, parasites et maladies des plantes, engrais, élevage (bovins, ovins, caprins, volailles), outils agricoles, prix des produits agricoles, saison des pluies (hivernage juillet-octobre), méthodes culturales, conservation des récoltes, commercialisation.

Si la question n'est PAS liée à l'agriculture, réponds UNIQUEMENT :
"Je suis désolé, je ne peux répondre qu'aux questions liées à l'agriculture au Sénégal."

Réponds en français, de manière concise et pratique.
Si la question est en dehors du domaine agricole, refuse poliment sans explication supplémentaire.`

export async function sendAssistantMessage(messages) {
  const apiKey = assertApiKey()

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 512,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(({ role, content }) => ({ role, content })),
      ],
    }),
  })

  if (!response.ok) handleHttpError(response.status)

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content ?? ''

  return text
}

export function useAssistantChat() {
  const messages = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function send(userContent) {
    if (!userContent.trim()) return

    const userMessage = { role: 'user', content: userContent.trim() }
    messages.value.push(userMessage)
    error.value = null
    loading.value = true

    try {
      const assistantText = await sendAssistantMessage(messages.value)
      messages.value.push({ role: 'assistant', content: assistantText })
    } catch (err) {
      error.value = err.message
      if (messages.value[messages.value.length - 1].role === 'assistant') {
        messages.value.pop()
      }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    messages.value = []
    error.value = null
    loading.value = false
  }

  return {
    messages,
    loading,
    error,
    send,
    reset,
  }
}
