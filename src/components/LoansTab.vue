<script setup>
import { inject, ref } from 'vue'
const game = inject('game')
const loanAmount = ref(5000)

function doBorrow() {
  game.borrow(loanAmount.value)
}

function doRepayAll() {
  game.repay(Math.min(game.debt.value, game.cash.value))
}

function doRepayCustom() {
  game.repay(loanAmount.value)
}
</script>

<template>
  <div class="loans-tab">
    <div class="panel">
      <div class="panel-title">🦈 SoftBanker™ Loans</div>
      <div class="flavour-text">
        Need leverage? Borrow from the Vision Fund.<br>
        <span class="highlight">15% interest per quarter.</span> What could go wrong?<br>
        Maximum loan: <span class="highlight">$50,000</span>
      </div>

      <div class="debt-display">
        <span class="debt-label">Current Debt</span>
        <span class="debt-amount" :class="{ active: game.debt.value > 0 }">
          ${{ game.formatMoney(game.debt.value) }}
        </span>
      </div>

      <div class="available" v-if="game.debt.value < 50000">
        Available to borrow: <span class="highlight">${{ game.formatMoney(50000 - game.debt.value) }}</span>
      </div>
      <div class="maxed" v-else>
        Loan maxed out. The SoftBanker is watching.
      </div>

      <div class="controls">
        <input
          class="amount-input"
          type="number"
          inputmode="numeric"
          min="0"
          v-model.number="loanAmount"
          placeholder="Amount"
        >
        <button class="action-btn borrow" @click="doBorrow" :disabled="loanAmount <= 0 || game.debt.value >= 50000">BORROW</button>
        <button class="action-btn repay" @click="doRepayCustom" :disabled="game.debt.value <= 0 || game.cash.value <= 0 || loanAmount <= 0">REPAY</button>
      </div>

      <button class="repay-all-btn" v-if="game.debt.value > 0 && game.cash.value > 0" @click="doRepayAll">
        REPAY ALL (${{ game.formatMoney(Math.min(game.debt.value, game.cash.value)) }})
      </button>

      <div class="warning" v-if="game.debt.value > 0">
        ⚠ Interest accrues each time you travel. Your debt grows 15% per turn!
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  border: 1px solid var(--border);
  background: var(--bg-panel);
  padding: 16px;
}

.panel-title {
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.flavour-text {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
  line-height: 1.5;
  margin-bottom: 16px;
}

.highlight {
  color: var(--amber);
}

.debt-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
}

.debt-label {
  font-size: 11px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.debt-amount {
  font-family: 'VT323', monospace;
  font-size: 42px;
  color: var(--text-dim);
}

.debt-amount.active {
  color: var(--red);
  text-shadow: 0 0 20px rgba(255, 62, 62, 0.4);
}

.available, .maxed {
  font-family: 'VT323', monospace;
  font-size: 15px;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: 16px;
}

.maxed { color: var(--red); }

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.amount-input {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--green);
  font-family: 'VT323', monospace;
  font-size: 20px;
  padding: 8px 12px;
  text-align: center;
  outline: none;
  min-height: 44px;
}

.amount-input:focus {
  border-color: var(--green);
  box-shadow: 0 0 6px rgba(0, 255, 65, 0.2);
}

.amount-input::-webkit-inner-spin-button,
.amount-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.amount-input { -moz-appearance: textfield; }

.action-btn {
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  padding: 10px 16px;
  min-height: 44px;
  border: 1px solid;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: transparent;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.action-btn.borrow {
  border-color: var(--green-dark);
  color: var(--green);
}
.action-btn.borrow:active:not(:disabled) { background: var(--green-dark); }

.action-btn.repay {
  border-color: #4d0000;
  color: var(--red);
}
.action-btn.repay:active:not(:disabled) { background: #4d0000; }

.action-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.repay-all-btn {
  width: 100%;
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  padding: 10px;
  min-height: 44px;
  background: transparent;
  border: 1px solid var(--amber);
  color: var(--amber);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  transition: all 0.15s;
}

.repay-all-btn:active {
  background: rgba(255, 183, 0, 0.1);
}

.warning {
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--red);
  opacity: 0.8;
  text-align: center;
  margin-top: 8px;
}
</style>
