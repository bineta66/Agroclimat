<template>
  <aside class="h-full flex flex-col gap-6 p-5 text-gray-200 border-r border-slate-600 sidebar-bg overflow-hidden">
    <!-- Logo / titre -->
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 flex items-center justify-center flex-shrink-0">
        <img
          src="/image.png"
          alt="Logo AgroClimat"
          class="w-8 h-8 object-contain"
        />
      </div>

      <div class="flex flex-col leading-tight">
        <span class="text-base font-bold text-white">AgroClimat</span>
        <span class="text-xs text-gray-400">Sénégal</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-1 flex-1" aria-label="Navigation principale">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="w-full border-0 rounded-lg px-3 py-2.5 bg-transparent text-left flex items-center gap-2.5 text-sm cursor-pointer transition-all duration-150"
        :class="item.id === activeId ? 'bg-green-900/40 text-sky-200 font-bold' : 'hover:bg-green-900/30 hover:translate-x-1'"
        :aria-current="item.id === activeId ? 'page' : undefined"
        @click="handleClick(item.id)"
      >
        <component
          :is="item.icon"
          class="flex-shrink-0"
          :size="18"
          aria-hidden="true"
        />
        <span class="flex-1">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { CloudSun, Bot } from '@lucide/vue'


defineProps({
  activeId: {
    type: String,
    default: 'meteo',
  },
})

const emit = defineEmits(['change-tab', 'close'])

const items = [
  { id: 'meteo', label: 'Météo', icon: CloudSun },
  { id: 'assistant', label: 'Assistant agricole', icon: Bot },
]

function handleClick(tabId) {
  emit('change-tab', tabId)
  emit('close')
}
</script>

<style scoped>
.sidebar-bg {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.85)),
    url('/paysans1.png') center/cover no-repeat;
}
</style>