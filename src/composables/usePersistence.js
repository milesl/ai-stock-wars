const SAVE_KEY = 'ai-stock-wars-save'
const SCORES_KEY = 'ai-stock-wars-scores'

export function saveGame(state) {
  try {
    const data = {
      version: 1,
      currentTurn: state.currentTurn,
      cash: state.cash,
      debt: state.debt,
      currentLocationId: state.currentLocationId,
      stocks: state.stocks.map(s => ({ ticker: s.ticker, price: s.price, change: s.change })),
      portfolio: { ...state.portfolio },
      tradeHistory: [...state.tradeHistory],
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(data))
  } catch { /* localStorage full or unavailable */ }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function deleteSave() {
  try { localStorage.removeItem(SAVE_KEY) } catch {}
}

export function hasSavedGame() {
  try { return !!localStorage.getItem(SAVE_KEY) } catch { return false }
}

export function saveHighScore(entry) {
  try {
    const raw = localStorage.getItem(SCORES_KEY)
    const scores = raw ? JSON.parse(raw) : []
    scores.push(entry)
    scores.sort((a, b) => b.netWorth - a.netWorth)
    scores.splice(10) // keep top 10
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores))
    return scores
  } catch {
    return []
  }
}

export function getHighScores() {
  try {
    const raw = localStorage.getItem(SCORES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
