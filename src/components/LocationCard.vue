<script setup>
import { inject, computed } from 'vue'
const game = inject('game')
const props = defineProps({ location: Object })

const isCurrent = computed(() => props.location.id === game.currentLocationId.value)

const stockPreview = computed(() => {
  return props.location.stocks.slice(0, 6).join(', ') + (props.location.stocks.length > 6 ? '...' : '')
})
</script>

<template>
  <button class="location-card" :class="{ active: isCurrent }" :disabled="isCurrent" @click="game.travel(location)">
    <div class="card-top">
      <span class="emoji">{{ location.emoji }}</span>
      <div class="card-info">
        <span class="loc-name">{{ location.name }}</span>
        <span class="flavour">{{ location.flavour }}</span>
      </div>
    </div>
    <div class="stocks-preview">{{ stockPreview }}</div>
    <div class="current-label" v-if="isCurrent">YOU ARE HERE</div>
  </button>
</template>

<style scoped>
.location-card {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 12px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
}

.location-card:active:not(:disabled) {
  border-color: var(--green-dark);
  background: var(--bg-panel-hover);
}

.location-card.active {
  border-color: var(--green);
  background: var(--green-dark);
  cursor: default;
}

.location-card:disabled {
  opacity: 0.8;
}

.card-top {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.emoji { font-size: 24px; flex-shrink: 0; }

.card-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.loc-name {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
}

.location-card.active .loc-name { color: var(--green); }

.flavour {
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 2px;
}

.location-card.active .flavour { color: var(--green-dim); }

.stocks-preview {
  font-family: 'VT323', monospace;
  font-size: 13px;
  color: var(--cyan);
  opacity: 0.6;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.current-label {
  position: absolute;
  top: 8px;
  right: 8px;
  font-family: 'Silkscreen', monospace;
  font-size: 8px;
  color: var(--green);
  letter-spacing: 1px;
}
</style>
