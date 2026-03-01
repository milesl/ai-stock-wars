<script setup>
import { provide } from 'vue'
import { useGame } from './composables/useGame.js'
import StartScreen from './components/StartScreen.vue'
import EndScreen from './components/EndScreen.vue'
import GameHeader from './components/GameHeader.vue'
import NewsTicker from './components/NewsTicker.vue'
import EventBanner from './components/EventBanner.vue'
import BottomNav from './components/BottomNav.vue'
import MarketTab from './components/MarketTab.vue'
import TravelTab from './components/TravelTab.vue'
import PortfolioTab from './components/PortfolioTab.vue'
import LoansTab from './components/LoansTab.vue'

const game = useGame()
provide('game', game)
</script>

<template>
  <StartScreen v-if="game.screen.value === 'start'" />
  <EndScreen v-if="game.screen.value === 'end'" />

  <div class="game-container" v-if="game.screen.value === 'game'">
    <GameHeader />
    <NewsTicker />
    <EventBanner />

    <main class="tab-content">
      <MarketTab v-show="game.activeTab.value === 'market'" />
      <TravelTab v-show="game.activeTab.value === 'travel'" />
      <PortfolioTab v-show="game.activeTab.value === 'portfolio'" />
      <LoansTab v-show="game.activeTab.value === 'loans'" />
    </main>

    <BottomNav />
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  padding-bottom: 16px;
}

@media (min-width: 640px) {
  .tab-content {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 12px;
  }
}

@media (min-width: 1024px) {
  .tab-content {
    max-width: 1100px;
    padding: 16px;
  }
}
</style>
