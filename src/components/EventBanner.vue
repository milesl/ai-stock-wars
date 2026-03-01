<script setup>
import { inject, watch, ref } from 'vue'
const game = inject('game')
const visible = ref(false)
let timer = null

watch(() => game.currentEvent.value, (evt) => {
  if (evt) {
    visible.value = true
    clearTimeout(timer)
    timer = setTimeout(() => { visible.value = false }, 8000)
  } else {
    visible.value = false
  }
})

function dismiss() {
  visible.value = false
  clearTimeout(timer)
}
</script>

<template>
  <div class="event-banner" v-if="visible && game.currentEvent.value" @click="dismiss">
    <div class="event-label">⚡ BREAKING NEWS</div>
    <div class="event-text">{{ game.currentEvent.value.text }}</div>
    <div class="event-effect">{{ game.currentEvent.value.effect }}</div>
    <div class="event-dismiss">tap to dismiss</div>
  </div>
</template>

<style scoped>
.event-banner {
  margin: 8px;
  padding: 10px 12px;
  border: 1px solid var(--amber);
  background: rgba(255, 183, 0, 0.05);
  cursor: pointer;
  animation: eventFlash 0.5s ease-out;
}

@keyframes eventFlash {
  0% { background: rgba(255, 183, 0, 0.2); }
  100% { background: rgba(255, 183, 0, 0.05); }
}

.event-label {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: var(--amber);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.event-text {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--amber);
  text-shadow: 0 0 10px rgba(255, 183, 0, 0.3);
  line-height: 1.3;
}

.event-effect {
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 4px;
}

.event-dismiss {
  font-size: 9px;
  color: var(--text-dim);
  opacity: 0.5;
  margin-top: 4px;
  text-align: right;
}
</style>
