<script setup>
import { inject } from 'vue'
const game = inject('game')
const props = defineProps({ stock: Object })
</script>

<template>
  <div class="stock-card">
    <div class="card-top">
      <div class="card-left">
        <span class="ticker">{{ stock.ticker }}</span>
        <span class="name">{{ stock.name }}</span>
      </div>
      <div class="card-right">
        <span class="price" :class="stock.change >= 0 ? 'up' : 'down'">${{ stock.price.toFixed(2) }}</span>
        <span class="change-badge" :class="stock.change >= 0 ? 'up' : 'down'">
          {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(1) }}%
        </span>
      </div>
    </div>
    <div class="card-mid">
      <span class="desc">{{ stock.desc }}</span>
      <span class="held" v-if="game.portfolio[stock.ticker] > 0">Held: {{ game.portfolio[stock.ticker] }}</span>
    </div>
    <div class="card-bottom">
      <button class="trade-btn buy" @click="game.buy(stock)" :disabled="!game.canBuy(stock)">BUY</button>
      <button class="max-btn buy-max" @click="game.setMaxBuy(stock)">MAX</button>
      <input
        class="qty-input"
        type="number"
        inputmode="numeric"
        min="0"
        v-model.number="game.tradeQty[stock.ticker]"
        placeholder="0"
      >
      <button class="max-btn sell-max" @click="game.setMaxSell(stock)" :disabled="!game.portfolio[stock.ticker]">MAX</button>
      <button class="trade-btn sell" @click="game.sell(stock)" :disabled="!game.canSell(stock)">SELL</button>
    </div>
  </div>
</template>

<style scoped>
.stock-card {
  border: 1px solid var(--border);
  background: var(--bg-panel);
  padding: 10px 12px;
  margin-bottom: 6px;
  transition: border-color 0.15s;
}

.stock-card:active {
  border-color: var(--green-dark);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.card-left {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
}

.ticker {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--cyan);
  font-weight: 700;
  flex-shrink: 0;
}

.name {
  font-size: 12px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 8px;
}

.price {
  font-family: 'VT323', monospace;
  font-size: 20px;
}

.price.up { color: var(--green); text-shadow: 0 0 6px rgba(0, 255, 65, 0.2); }
.price.down { color: var(--red); text-shadow: 0 0 6px rgba(255, 62, 62, 0.2); }

.change-badge {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 2px;
}
.change-badge.up { background: rgba(0, 255, 65, 0.1); color: var(--green); }
.change-badge.down { background: rgba(255, 62, 62, 0.1); color: var(--red); }

.card-mid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.desc {
  font-size: 11px;
  color: var(--text-dim);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.held {
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--cyan);
  flex-shrink: 0;
  margin-left: 8px;
}

.card-bottom {
  display: flex;
  gap: 6px;
  align-items: center;
}

.trade-btn {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  padding: 8px 14px;
  min-height: 36px;
  border: 1px solid;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: transparent;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.trade-btn.buy {
  border-color: var(--green-dark);
  color: var(--green);
}
.trade-btn.buy:active:not(:disabled) {
  background: var(--green-dark);
}

.trade-btn.sell {
  border-color: #4d0000;
  color: var(--red);
}
.trade-btn.sell:active:not(:disabled) {
  background: #4d0000;
}

.trade-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.qty-input {
  flex: 1;
  min-width: 50px;
  max-width: 80px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--green);
  font-family: 'VT323', monospace;
  font-size: 18px;
  padding: 6px 8px;
  text-align: center;
  outline: none;
  min-height: 36px;
}

.qty-input:focus {
  border-color: var(--green);
  box-shadow: 0 0 6px rgba(0, 255, 65, 0.2);
}

/* Hide number input spinners */
.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-input { -moz-appearance: textfield; }

.max-btn {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  padding: 8px 8px;
  min-height: 36px;
  cursor: pointer;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.max-btn.buy-max:active {
  border-color: var(--green-dark);
  color: var(--green);
}

.max-btn.sell-max:active {
  border-color: #4d0000;
  color: var(--red);
}

.max-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
</style>
