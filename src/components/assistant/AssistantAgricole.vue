<template>
  <div class="p-4 h-full flex flex-col">
    <h2 class="m-0 mb-2 text-xl md:text-2xl font-medium text-gray-900">Assistant agricole</h2>
    <p class="m-0 mb-4 text-sm md:text-base text-gray-500">Posez vos questions sur les cultures, le climat et l'agriculture au Sénégal.</p>

    <div ref="chatContainer" class="flex-1 overflow-y-auto rounded-xl bg-white border border-gray-200 p-4 mb-4" style="min-height: 320px; max-height: 520px;">
      <div v-if="messages.length === 0" class="h-full flex items-center justify-center text-gray-400 text-sm">
        Aucun message pour l’instant. Posez votre question ci-dessous.
      </div>
      <div v-else class="flex flex-col gap-3">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
            :class="msg.role === 'user'
              ? 'bg-green-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'"
          >
            {{ msg.content }}
          </div>
        </div>
        <div v-if="loading" class="flex justify-start">
          <div class="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
            <span class="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style="animation-delay: 0ms;"></span>
            <span class="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style="animation-delay: 150ms;"></span>
            <span class="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="mb-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {{ error }}
    </div>

    <form class="flex gap-2" @submit.prevent="handleSend">
      <input
        v-model="inputText"
        type="text"
        placeholder="Votre question sur l'agriculture..."
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        :disabled="loading"
        @keydown.enter.prevent="handleSend"
      />
      <button
        type="submit"
        class="border-0 rounded-lg px-4 py-2.5 bg-green-600 text-white font-bold text-sm cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading || !inputText.trim()"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useAssistantChat } from '@/services/agriculturalAssistant.js'

const inputText = ref('')
const chatContainer = ref(null)
const { messages, loading, error, send } = useAssistantChat()

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || loading.value) return
  inputText.value = ''
  await send(text)
}

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }
)
</script>
