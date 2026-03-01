<script setup>
import { inject } from 'vue'
import LocationCard from './LocationCard.vue'
const game = inject('game')
</script>

<template>
  <div class="travel-tab">
    <div class="panel-title">📍 Travel — {{ game.maxTurns - game.currentTurn.value }} turns remaining</div>
    <p class="hint">Travelling advances the turn, updates prices, and may trigger a market event.</p>
    <div class="location-grid">
      <LocationCard v-for="loc in game.locations" :key="loc.id" :location="loc" />
    </div>
  </div>
</template>

<style scoped>
.panel-title {
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.hint {
  font-size: 11px;
  color: var(--text-dim);
  margin-bottom: 10px;
}

.location-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 640px) {
  .location-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
