<template>
  <header class="w-full min-h-[56px] sticky top-0 flex flex-wrap md:flex-nowrap justify-between items-center gap-3 p-3 md:p-4 bg-white border border-gray-100 rounded-xl shadow-sm z-30">
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 cursor-pointer"
        aria-label="Menu"
        @click="$emit('toggle-sidebar')"
      >
        <Menu :size="18" />
      </button>

      <div class="relative w-full md:w-72 lg:w-80">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="16" />

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une région..."
          class="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none transition-all focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="flex items-center gap-1.5 px-3 py-2 border-0 rounded-full bg-green-50 text-green-800 text-xs font-semibold cursor-pointer transition-all hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="$emit('use-position')"
      >
        <MapPin :size="16" />
        <span class="hidden sm:inline">Ma position</span>
      </button>

      <button class="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 cursor-pointer hover:bg-gray-50" aria-label="Alertes">
        <Bell :size="18" />

        <span v-if="hasAlert" :class="['absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white', badgeClass]">
          {{ badgeLabel }}
        </span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, MapPin, Bell, Menu } from 'lucide-vue-next'
import { useAlertStore } from '../../stores/alertStore'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['use-position', 'toggle-sidebar'])

const alertStore = useAlertStore()

const searchQuery = ref('')

const alertLevel = computed(() => alertStore.alertLevel)
const hasAlert = computed(() => alertStore.weather.temp != null)

const badgeLabel = computed(() => {
  if (!hasAlert.value) return '0'
  if (alertLevel.value === alertStore.ALERT_LEVEL.ROUGE) return '!'
  if (alertLevel.value === alertStore.ALERT_LEVEL.ORANGE) return '!'
  return '0'
})

const badgeClass = computed(() => {
  if (!hasAlert.value) return ''
  if (alertLevel.value === alertStore.ALERT_LEVEL.ROUGE) return 'bg-red-500'
  if (alertLevel.value === alertStore.ALERT_LEVEL.ORANGE) return 'bg-orange-500'
  return ''
})
</script>