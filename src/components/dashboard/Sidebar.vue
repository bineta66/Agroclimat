<template>
  <aside class="sidebar">
    <!-- Logo / titre -->
    <div class="sidebar-logo">
      <div class="logo-mark">
        <img
          src="/image.png"
          alt="Logo AgroClimat"
          class="logo-image"
        />
      </div>

      <div class="logo-text">
        <span class="logo-title">AgroClimat</span>
        <span class="logo-subtitle">Sénégal</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav" aria-label="Navigation principale">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="nav-item"
        :class="{ 'nav-item--active': item.id === activeId }"
        :aria-current="item.id === activeId ? 'page' : undefined"
        @click="emit('change-tab', item.id)"
      >
        <component
          :is="item.icon"
          class="nav-icon"
          :size="18"
          aria-hidden="true"
        />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import {CloudSun, TriangleAlert, TrendingUp, Settings, Leaf } from '@lucide/vue'

defineProps({
  activeId: {
    type: String,
    default: 'overview',
  },
})

const emit = defineEmits(['change-tab'])

const items = [
  { id: 'meteo', label: 'Météo Agricole', icon: CloudSun },
  { id: 'alerte', label: 'Alerte', icon: TriangleAlert },
  { id: 'historique', label: 'Historique', icon: TrendingUp },
  { id: 'conseils', label: 'Conseils agricole', icon: Leaf },
  { id: 'parametre', label: 'Paramètre', icon: Settings },
]
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  width: 220px;
  height: 100vh;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.98)),
    url('../../../public/paysans1.png') center/cover no-repeat;
  color: #e5e7eb;
  border-right: 1px solid rgba(148, 163, 184, 1);
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/*  MODIFIÉ : plus de cercle blanc */
.logo-mark {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-image {
  width: 300%;
  height: 300%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-title {
  font-size: 1rem;
  font-weight: 700;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.nav-item {
  width: 100%;
  border: none;
  border-radius: 0.6rem;
  padding: 0.55rem 0.7rem;
  background: transparent;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.1s ease,
    color 0.15s ease;
}

.nav-item:hover {
  background: rgba(5, 65, 10, 0.35);
  transform: translateX(2px);
}

.nav-item:focus-visible {
  outline: 2px solid #064f0f;
  outline-offset: 2px;
}

.nav-item--active {
  background: rgba(50, 83, 45, 0.626);
  color: #e0f2fe;
  font-weight: 700;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  text-align: left;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid rgba(148, 163, 184, 0.4);
  }

  .sidebar-logo {
    flex-shrink: 0;
  }

  .sidebar-nav {
    flex-direction: row;
    gap: 0.3rem;
  }

  .nav-item {
    width: auto;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .nav-label {
    display: none;
  }

  .nav-item--active .nav-label {
    display: inline;
  }
}
</style>