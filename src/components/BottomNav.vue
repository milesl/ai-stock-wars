<script setup>
import { inject } from 'vue'
const game = inject('game')

const tabs = [
  { id: 'market', label: 'Market', icon: '📈' },
  { id: 'travel', label: 'Travel', icon: '📍' },
  { id: 'portfolio', label: 'Portfolio', icon: '💼' },
  { id: 'loans', label: 'Loans', icon: '🦈' },
]
</script>

<template>
  <nav class="bottom-nav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="nav-btn"
      :class="{ active: game.activeTab.value === tab.id }"
      @click="game.activeTab.value = tab.id"
    >
      <span class="nav-icon">{{ tab.icon }}</span>
      <span class="nav-label">{{ tab.label }}</span>
      <span class="nav-badge" v-if="tab.id === 'travel'">{{ game.maxTurns - game.currentTurn.value }}</span>
      <span class="nav-badge portfolio-badge" v-if="tab.id === 'portfolio' && game.portfolioItems.value.length > 0">
        {{ game.portfolioItems.value.length }}
      </span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--bg-panel);
  border-top: 1px solid var(--border);
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 4px;
  min-height: 56px;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  position: relative;
  transition: color 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.nav-btn.active {
  color: var(--green);
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  background: var(--green);
  box-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
}

.nav-icon { font-size: 20px; }

.nav-label {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-badge {
  position: absolute;
  top: 4px;
  right: calc(50% - 20px);
  font-family: 'VT323', monospace;
  font-size: 12px;
  background: var(--green-dark);
  color: var(--green);
  padding: 0 4px;
  border-radius: 6px;
  line-height: 16px;
  min-width: 16px;
  text-align: center;
}

.portfolio-badge {
  background: rgba(0, 229, 255, 0.15);
  color: var(--cyan);
}
</style>
