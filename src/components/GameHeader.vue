<script setup>
import { inject } from 'vue'
const game = inject('game')
</script>

<template>
  <header class="header">
    <div class="header-top">
      <span class="turn-label">Q{{ game.currentTurn.value }}/{{ game.maxTurns }}</span>
      <div class="location">
        <span class="location-emoji">{{ game.currentLocation.value?.emoji }}</span>
        <span class="location-name">{{ game.currentLocation.value?.name }}</span>
      </div>
    </div>

    <div class="turn-bar">
      <div class="turn-fill" :style="{ width: (game.currentTurn.value / game.maxTurns * 100) + '%' }"></div>
    </div>

    <div class="stats-row">
      <div class="stat">
        <span class="stat-label">Cash</span>
        <span class="stat-value cash">${{ game.formatMoney(game.cash.value) }}</span>
      </div>
      <div class="stat" v-if="game.debt.value > 0">
        <span class="stat-label">🦈 Debt</span>
        <span class="stat-value debt">-${{ game.formatMoney(game.debt.value) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Portfolio</span>
        <span class="stat-value portfolio">${{ game.formatMoney(game.portfolioValue.value) }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Net Worth</span>
        <span class="stat-value" :class="game.netWorth.value >= 10000 ? 'up' : 'down'">
          ${{ game.formatMoney(game.netWorth.value) }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(180deg, #0d1a0d 0%, var(--bg) 100%);
  border-bottom: 1px solid var(--green-dark);
  padding: 6px 10px;
  padding-top: calc(6px + env(safe-area-inset-top, 0px));
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.turn-label {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--green);
  text-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
  flex-shrink: 0;
}

.location {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
}

.location-emoji {
  font-size: 16px;
  flex-shrink: 0;
}

.location-name {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: var(--cyan);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.turn-bar {
  width: 100%;
  height: 2px;
  background: var(--border);
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 5px;
}

.turn-fill {
  height: 100%;
  background: var(--green);
  transition: width 0.4s;
  box-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
}

.stats-row {
  display: flex;
  justify-content: space-between;
  gap: 4px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 8px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.stat-value {
  font-family: 'VT323', monospace;
  font-size: 16px;
  white-space: nowrap;
}

.stat-value.cash {
  color: var(--amber);
  text-shadow: 0 0 8px rgba(255, 183, 0, 0.3);
}

.stat-value.portfolio {
  color: var(--cyan);
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
}

.stat-value.debt {
  color: var(--red);
  text-shadow: 0 0 8px rgba(255, 62, 62, 0.3);
}

.stat-value.up {
  color: var(--green);
  text-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
}

.stat-value.down {
  color: var(--red);
  text-shadow: 0 0 8px rgba(255, 62, 62, 0.3);
}

@media (min-width: 640px) {
  .header { padding: 8px 20px; }
  .turn-label { font-size: 20px; }
  .location-name { font-size: 12px; }
  .stat-label { font-size: 9px; letter-spacing: 1px; }
  .stat-value { font-size: 18px; }
}
</style>
