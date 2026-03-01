<script setup>
import { inject, computed } from 'vue'
const game = inject('game')

const tickerItems = computed(() =>
  game.stocks.map(s => ({
    ticker: s.ticker,
    price: s.price.toFixed(2),
    change: s.change.toFixed(1),
    up: s.change >= 0,
  }))
)
</script>

<template>
  <div class="ticker-scroll">
    <div class="ticker-inner">
      <span v-for="(s, i) in tickerItems" :key="'a-' + i" class="ticker-item">
        <span class="ticker-symbol">{{ s.ticker }}</span>
        <span :class="s.up ? 'up' : 'down'">${{ s.price }} {{ s.up ? '▲' : '▼' }}{{ Math.abs(s.change) }}%</span>
        <span class="sep">&middot;</span>
      </span>
      <span v-for="(s, i) in tickerItems" :key="'b-' + i" class="ticker-item">
        <span class="ticker-symbol">{{ s.ticker }}</span>
        <span :class="s.up ? 'up' : 'down'">${{ s.price }} {{ s.up ? '▲' : '▼' }}{{ Math.abs(s.change) }}%</span>
        <span class="sep">&middot;</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ticker-scroll {
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 4px 0;
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
}

.ticker-inner {
  display: inline-block;
  animation: scroll-left 60s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-inner { animation: none; }
}

.ticker-item { margin-right: 2px; }

.ticker-symbol {
  color: var(--cyan);
  margin-right: 3px;
}

.up { color: var(--green); }
.down { color: var(--red); }

.sep {
  color: var(--text-dim);
  margin: 0 6px;
  opacity: 0.4;
}
</style>
