<script setup>
import { inject } from 'vue'
const game = inject('game')

function shareScore() {
  const text = `AI STOCK WARS\n${game.rank.value.emoji} ${game.rank.value.title}\nFinal Net Worth: $${game.formatMoney(game.netWorth.value)}\n"${game.rank.value.flavour}"\n\nCan you beat the hype cycle?`

  if (navigator.share) {
    navigator.share({ title: 'AI Stock Wars', text }).catch(() => {})
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {})
  }
}
</script>

<template>
  <div class="screen-overlay">
    <div class="screen-box">
      <h2 class="title">GAME OVER</h2>
      <p class="subtitle">The hype cycle has completed. Your portfolio has been liquidated.</p>
      <div class="final-score">${{ game.formatMoney(game.netWorth.value) }}</div>
      <div class="rank-title">{{ game.rank.value.emoji }} {{ game.rank.value.title }}</div>
      <p class="flavour">"{{ game.rank.value.flavour }}"</p>
      <p class="stats">
        Started with $10,000 &middot; {{ game.tradeHistory.filter(h => h.type === 'buy' || h.type === 'sell').length }} trades executed
      </p>
      <div class="buttons">
        <button class="action-btn" @click="game.resetGame()">RIDE THE HYPE AGAIN</button>
        <button class="action-btn share" @click="shareScore">SHARE SCORE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 10, 0.97);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.screen-box {
  border: 1px solid var(--green-dark);
  background: var(--bg-panel);
  padding: 32px 24px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.title {
  font-family: 'Silkscreen', monospace;
  color: var(--green);
  font-size: 28px;
  text-shadow: 0 0 30px rgba(0, 255, 65, 0.4);
  letter-spacing: 3px;
  margin-bottom: 12px;
}

.subtitle {
  color: var(--text-dim);
  font-size: 12px;
  margin-bottom: 16px;
}

.final-score {
  font-family: 'VT323', monospace;
  font-size: 48px;
  color: var(--amber);
  text-shadow: 0 0 30px rgba(255, 183, 0, 0.4);
  margin: 12px 0;
}

.rank-title {
  font-family: 'Silkscreen', monospace;
  font-size: 16px;
  color: var(--magenta);
  text-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
  margin-bottom: 12px;
}

.flavour {
  color: var(--text-dim);
  font-size: 12px;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 8px;
}

.stats {
  font-size: 11px;
  color: var(--text-dim);
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.action-btn {
  font-family: 'Silkscreen', monospace;
  font-size: 14px;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--green);
  color: var(--green);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  min-height: 48px;
}

.action-btn:hover, .action-btn:active {
  background: var(--green-dark);
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
}

.action-btn.share {
  border-color: var(--cyan);
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
  font-size: 11px;
  padding: 10px 24px;
}
</style>
