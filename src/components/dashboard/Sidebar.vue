<template>
  <aside class="sidebar">
    <!-- Logo / titre -->
    <div class="sidebar-logo">
      <div class="logo-mark">AC</div>
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
        <component :is="item.icon" class="nav-icon" :size="18" aria-hidden="true" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { Home, CloudSun, TriangleAlert, TrendingUp } from 'lucide-vue-next'

defineProps({
  activeId: {
    type: String,
    default: 'overview',
  },
})

const emit = defineEmits(['change-tab'])

const items = [
  { id: 'overview', label: 'Vue d’ensemble', icon: Home },
  { id: 'meteo', label: 'Météo', icon: CloudSun },
  { id: 'risques', label: 'Risques', icon: TriangleAlert },
  { id: 'historique', label: 'Historique', icon: TrendingUp },
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
  /* Chemin corrigé : les fichiers dans public/ se référencent
     depuis la racine du serveur, jamais relativement au composant. */
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

.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: radial-gradient(circle at top, #22c55e, #15803d);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  color: #ecfdf5;
  flex-shrink: 0;
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
  transition: background 0.15s ease, transform 0.1s ease, color 0.15s ease;
}

.nav-item:hover {
  background: rgba(30, 64, 175, 0.35);
  transform: translateX(2px);
}

.nav-item:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
}

.nav-item--active {
  background: rgba(30, 64, 175, 0.6);
  color: #e0f2fe;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  text-align: left;
}

/* Responsive : la sidebar verticale devient une barre horizontale
   scrollable sur mobile/tablette, pour respecter l'exigence
   "responsive du mobile au desktop" du cahier des charges. */
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

  /* On garde le label visible pour l'onglet actif, plus lisible au pouce */
  .nav-item--active .nav-label {
    display: inline;
  }
}
</style>