<script setup>
import { inject } from 'vue'
const game = inject('game')
</script>

<template>
  <div class="screen-overlay">
    <div class="screen-box">
      <h1 class="title">AI STOCK WARS</h1>
      <p class="subtitle">The Hype Cycle Never Ends</p>
      <p class="description">
        The year is 2026. AI is eating the world &mdash; or at least eating VC money.<br>
        You have <strong>$10,000</strong> and <strong>30 quarters</strong> to become
        the ultimate AI hype profiteer.
      </p>
      <p class="description">
        Travel between Silicon Valley hotspots. Buy low. Sell high.<br>
        Survive random events. Try not to lose your shirt.<br>
        <strong>Remember: the money is circular but your losses are real.</strong>
      </p>
      <div class="buttons">
        <button class="start-btn" @click="game.startGame()">ENTER THE HYPE CYCLE</button>
        <button class="start-btn resume" v-if="game.hasExistingSave.value" @click="game.resumeGame()">RESUME GAME</button>
      </div>
      <p class="disclaimer">
        None of this is financial advice. All characters are fictional.<br>
        Any resemblance to actual grifts is entirely intentional.
      </p>
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
  margin-bottom: 8px;
}

.subtitle {
  font-family: 'VT323', monospace;
  font-size: 20px;
  color: var(--green-dim);
  margin-bottom: 20px;
}

.description {
  color: var(--text-dim);
  line-height: 1.7;
  margin-bottom: 12px;
  font-size: 12px;
}

.description strong {
  color: var(--text);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 24px;
}

.start-btn {
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

.start-btn:hover, .start-btn:active {
  background: var(--green-dark);
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
}

.start-btn.resume {
  border-color: var(--amber);
  color: var(--amber);
  text-shadow: 0 0 10px rgba(255, 183, 0, 0.3);
  font-size: 12px;
  padding: 10px 24px;
}

.start-btn.resume:hover, .start-btn.resume:active {
  background: rgba(255, 183, 0, 0.1);
}

.disclaimer {
  color: var(--text-dim);
  font-size: 10px;
  margin-top: 24px;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .title { font-size: 36px; }
  .screen-box { padding: 40px 50px; }
}
</style>
