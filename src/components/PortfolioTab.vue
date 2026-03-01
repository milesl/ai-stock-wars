<script setup>
import { inject } from 'vue'
const game = inject('game')
</script>

<template>
  <div class="portfolio-tab">
    <!-- Net Worth Breakdown -->
    <div class="panel">
      <div class="panel-title">💼 Net Worth</div>
      <div class="breakdown">
        <div class="breakdown-row">
          <span>Cash</span>
          <span class="cash">${{ game.formatMoney(game.cash.value) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Portfolio</span>
          <span class="portfolio-val">${{ game.formatMoney(game.portfolioValue.value) }}</span>
        </div>
        <div class="breakdown-row" v-if="game.debt.value > 0">
          <span>Debt</span>
          <span class="debt">-${{ game.formatMoney(game.debt.value) }}</span>
        </div>
        <div class="breakdown-row total">
          <span>Net Worth</span>
          <span :class="game.netWorth.value >= 10000 ? 'up' : 'down'">
            ${{ game.formatMoney(game.netWorth.value) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Holdings -->
    <div class="panel">
      <div class="panel-title">📊 Holdings</div>
      <div class="empty" v-if="game.portfolioItems.value.length === 0">No holdings yet — get in the game!</div>
      <div class="holding" v-for="item in game.portfolioItems.value" :key="item.ticker">
        <span class="ticker">{{ item.ticker }}</span>
        <span class="qty">&times;{{ item.qty }}</span>
        <span class="item-price">${{ item.price.toFixed(2) }} ea</span>
        <span class="value">${{ game.formatMoney(item.value) }}</span>
      </div>
    </div>

    <!-- Trade Log -->
    <div class="panel">
      <div class="panel-title">📜 Trade Log</div>
      <div class="empty" v-if="game.tradeHistory.length === 0">No trades yet.</div>
      <div class="log-scroll">
        <div
          v-for="(h, i) in game.reversedHistory.value"
          :key="i"
          class="log-entry"
          :class="h.type"
        >{{ h.text }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-tab {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel {
  border: 1px solid var(--border);
  background: var(--bg-panel);
  padding: 12px;
}

.panel-title {
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.breakdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--text);
}

.breakdown-row.total {
  border-top: 1px solid var(--border);
  padding-top: 6px;
  margin-top: 4px;
  font-size: 22px;
}

.cash { color: var(--amber); text-shadow: 0 0 8px rgba(255, 183, 0, 0.3); }
.portfolio-val { color: var(--cyan); }
.debt { color: var(--red); text-shadow: 0 0 8px rgba(255, 62, 62, 0.3); }
.up { color: var(--green); text-shadow: 0 0 8px rgba(0, 255, 65, 0.3); }
.down { color: var(--red); text-shadow: 0 0 8px rgba(255, 62, 62, 0.3); }

.empty {
  color: var(--text-dim);
  font-size: 12px;
  font-style: italic;
}

.holding {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid rgba(26, 26, 46, 0.4);
  font-family: 'VT323', monospace;
  font-size: 16px;
  gap: 8px;
}

.ticker { color: var(--cyan); font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; min-width: 48px; }
.qty { color: var(--text); min-width: 40px; }
.item-price { color: var(--text-dim); font-size: 14px; flex: 1; text-align: right; }
.value { color: var(--green); min-width: 70px; text-align: right; }

.log-scroll {
  max-height: 250px;
  overflow-y: auto;
}

.log-entry {
  font-family: 'VT323', monospace;
  font-size: 14px;
  padding: 3px 0;
  border-bottom: 1px solid rgba(26, 26, 46, 0.3);
}

.log-entry.buy { color: var(--green); }
.log-entry.sell { color: var(--red); }
.log-entry.event { color: var(--amber); }
</style>
