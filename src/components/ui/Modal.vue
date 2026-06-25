<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50" @click.self="close">
      <div class="bg-white rounded-xl shadow-lg w-full max-h-[85vh] flex flex-col" :class="sizeClass">
        <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-100">
          <h3 class="m-0 text-base md:text-lg font-bold text-gray-900">{{ title }}</h3>
          <button type="button" class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors" @click="close" aria-label="Fermer">
            <X :size="18" />
          </button>
        </div>
        <div class="p-4 md:p-5 overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const sizeClass = {
  small: 'max-w-[420px]',
  medium: 'max-w-[640px]',
  large: 'max-w-[860px]',
}

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Modal',
  },
  size: {
    type: String,
    default: 'medium',
  },
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>
