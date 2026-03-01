<script setup>
import { inject, ref, computed } from 'vue'
import StockCard from './StockCard.vue'
const game = inject('game')

const sortBy = ref('name')
const filterHeld = ref(false)
const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'change', label: 'Change%' },
]

const sortedStocks = computed(() => {
  let list = [...game.availableStocks.value]
  if (filterHeld.value) {
    list = list.filter(s => (game.portfolio[s.ticker] || 0) > 0)
  }
  switch (sortBy.value) {
    case 'price': return list.sort((a, b) => b.price - a.price)
    case 'change': return list.sort((a, b) => b.change - a.change)
    default: return list.sort((a, b) => a.ticker.localeCompare(b.ticker))
  }
})
</script>

<template>
  <div class="market-tab">
    <div class="market-header">
      <div class="panel-title">📈 {{ game.currentLocation.value?.name }} Market</div>
      <div class="sort-bar">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-btn"
          :class="{ active: sortBy === opt.value }"
          @click="sortBy = opt.value"
        >{{ opt.label }}</button>
        <button
          class="sort-btn filter-btn"
          :class="{ active: filterHeld }"
          @click="filterHeld = !filterHeld"
        >Held Only</button>
      </div>
    </div>
    <StockCard v-for="s in sortedStocks" :key="s.ticker" :stock="s" />
  </div>
</template>

<style scoped>
.market-header {
  margin-bottom: 8px;
}

.panel-title {
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.sort-bar {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.sort-btn {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  padding: 4px 10px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.sort-btn.active {
  border-color: var(--green-dark);
  color: var(--green);
  background: rgba(0, 255, 65, 0.05);
}

.filter-btn.active {
  border-color: var(--cyan);
  color: var(--cyan);
  background: rgba(0, 229, 255, 0.08);
}
</style>
