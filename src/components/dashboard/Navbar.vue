<template>
  <header class="navbar">
    <!-- Recherche -->
    <div class="search-wrapper">
      <Search class="search-icon" :size="18" />

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une région..."
        class="search-input"
      />
    </div>

    <!-- Actions -->
    <div class="navbar-actions">
      <button
        class="position-button"
        :disabled="loading"
        @click="$emit('use-position')"
      >
        <MapPin :size="18" />
        <span>Ma position</span>
      </button>

      <button class="notification-button">
        <Bell :size="20" />

        <span
          v-if="notificationCount > 0"
          class="notification-badge"
        >
          {{ notificationCount }}
        </span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Search, MapPin, Bell } from 'lucide-vue-next'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },

  notificationCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['use-position'])

const searchQuery = ref('')
</script>

<style scoped>
/* ===========================
   NAVBAR
=========================== */

.navbar {
  width: 100%;
  min-height: 70px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.8rem 1.5rem;

  background: #ffffff;
  border: 1px solid #edf2f7;
  border-radius: 18px;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(15, 23, 42, 0.05);

  box-sizing: border-box;
}

/* ===========================
   SEARCH
=========================== */

.search-wrapper {
  position: relative;
  width: 360px;
  max-width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  height: 48px;

  padding: 0 16px 0 46px;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  background: #f8fafc;

  font-size: 0.95rem;
  color: #0f172a;

  outline: none;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-input:focus {
  border-color: #22c55e;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* ===========================
   ACTIONS
=========================== */

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ===========================
   POSITION BUTTON
=========================== */

.position-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.8rem 1.4rem;

  border: none;
  border-radius: 999px;

  background: #dcfce7;
  color: #166534;

  font-size: 0.95rem;
  font-weight: 600;

  cursor: pointer;
  transition: all 0.2s ease;
}

.position-button:hover:not(:disabled) {
  background: #bbf7d0;
  transform: translateY(-1px);
}

.position-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===========================
   NOTIFICATION
=========================== */

.notification-button {
  position: relative;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 1px solid #e2e8f0;

  background: #ffffff;
  color: #475569;

  cursor: pointer;
}

.notification-button:hover {
  background: #f8fafc;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;

  min-width: 18px;
  height: 18px;

  padding: 0 4px;

  border-radius: 999px;

  background: #ef4444;
  color: #ffffff;

  font-size: 0.7rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #ffffff;
}

/* ===========================
   AVATAR
=========================== */

.avatar-wrapper {
  width: 48px;
  height: 48px;
}

.avatar {
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 50%;

  border: 2px solid #f1f5f9;
}

/* ===========================
   RESPONSIVE
=========================== */

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .search-wrapper {
    width: 100%;
  }

  .position-button span {
    display: none;
  }

  .position-button {
    padding: 0.8rem;
  }
}
</style>