import { ref, reactive, computed } from 'vue'
import { stocks as stockDefs } from '../data/stocks.js'
import { locations } from '../data/locations.js'
import { getRank } from '../data/ranks.js'
import { updatePrices } from './usePriceEngine.js'
import { maybeFireEvent } from './useEvents.js'
import { saveGame, loadGame, deleteSave, hasSavedGame, saveHighScore } from './usePersistence.js'

export function useGame() {
  const screen = ref('start')
  const currentTurn = ref(1)
  const maxTurns = 30
  const cash = ref(10000)
  const debt = ref(0)
  const currentLocationId = ref('sandhill')
  const currentEvent = ref(null)
  const activeTab = ref('market')

  const stocks = reactive(stockDefs.map(s => ({
    ...s,
    price: s.basePrice,
    change: 0,
  })))

  const portfolio = reactive({})
  const tradeQty = reactive({})
  const tradeHistory = reactive([])

  // Computed
  const currentLocation = computed(() => locations.find(l => l.id === currentLocationId.value))

  const availableStocks = computed(() => {
    const tickers = currentLocation.value?.stocks || []
    return stocks.filter(s => tickers.includes(s.ticker))
  })

  const portfolioValue = computed(() => {
    let total = 0
    for (const ticker in portfolio) {
      const s = stocks.find(x => x.ticker === ticker)
      if (s && portfolio[ticker] > 0) total += s.price * portfolio[ticker]
    }
    return total
  })

  const netWorth = computed(() => cash.value + portfolioValue.value - debt.value)

  const portfolioItems = computed(() => {
    const items = []
    for (const ticker in portfolio) {
      if (portfolio[ticker] > 0) {
        const s = stocks.find(x => x.ticker === ticker)
        items.push({ ticker, qty: portfolio[ticker], value: s ? s.price * portfolio[ticker] : 0, price: s?.price || 0 })
      }
    }
    return items.sort((a, b) => b.value - a.value)
  })

  const reversedHistory = computed(() => [...tradeHistory].reverse().slice(0, 50))

  const rank = computed(() => getRank(netWorth.value))

  const hasExistingSave = ref(hasSavedGame())

  // Formatting
  function formatMoney(n) {
    return Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  // Trading
  function canBuy(s) {
    const qty = tradeQty[s.ticker] || 0
    return qty > 0 && s.price * qty <= cash.value
  }

  function canSell(s) {
    const qty = tradeQty[s.ticker] || 0
    return qty > 0 && (portfolio[s.ticker] || 0) >= qty
  }

  function setMaxBuy(s) {
    tradeQty[s.ticker] = Math.floor(cash.value / s.price)
  }

  function setMaxSell(s) {
    tradeQty[s.ticker] = portfolio[s.ticker] || 0
  }

  function buy(s) {
    const qty = tradeQty[s.ticker] || 0
    if (qty <= 0 || s.price * qty > cash.value) return
    const cost = s.price * qty
    cash.value -= cost
    portfolio[s.ticker] = (portfolio[s.ticker] || 0) + qty
    tradeHistory.push({ type: 'buy', text: `Q${currentTurn.value} BUY ${qty}\u00D7 ${s.ticker} @ $${s.price.toFixed(2)}` })
    tradeQty[s.ticker] = 0
    vibrate(10)
  }

  function sell(s) {
    const qty = tradeQty[s.ticker] || 0
    if (qty <= 0 || (portfolio[s.ticker] || 0) < qty) return
    const revenue = s.price * qty
    cash.value += revenue
    portfolio[s.ticker] -= qty
    if (portfolio[s.ticker] <= 0) delete portfolio[s.ticker]
    tradeHistory.push({ type: 'sell', text: `Q${currentTurn.value} SELL ${qty}\u00D7 ${s.ticker} @ $${s.price.toFixed(2)}` })
    tradeQty[s.ticker] = 0
    vibrate(10)
  }

  // Loans
  function borrow(amount) {
    if (amount <= 0) return
    const actual = Math.min(amount, 50000 - debt.value)
    if (actual <= 0) return
    cash.value += actual
    debt.value += actual
    tradeHistory.push({ type: 'event', text: `Q${currentTurn.value} BORROWED $${formatMoney(actual)} from SoftBanker\u2122` })
  }

  function repay(amount) {
    const actual = Math.min(amount, debt.value, cash.value)
    if (actual <= 0) return
    cash.value -= actual
    debt.value -= actual
    tradeHistory.push({ type: 'sell', text: `Q${currentTurn.value} REPAID $${formatMoney(actual)} to SoftBanker\u2122` })
  }

  // Travel
  function travel(loc) {
    if (loc.id === currentLocationId.value) return
    currentLocationId.value = loc.id
    currentTurn.value++

    // Accrue debt interest
    if (debt.value > 0) {
      const interest = Math.floor(debt.value * 0.15)
      debt.value += interest
      if (interest > 0) {
        tradeHistory.push({ type: 'event', text: `Q${currentTurn.value} INTEREST: $${formatMoney(interest)} added to debt` })
      }
    }

    updatePrices(stocks)
    const evt = maybeFireEvent(stocks)
    currentEvent.value = evt
    if (evt) {
      tradeHistory.push({ type: 'event', text: `Q${currentTurn.value} EVENT: ${evt.text.substring(0, 80)}...` })
      vibrate([20, 50, 20])
    }

    // Auto-save
    saveGame({
      currentTurn: currentTurn.value,
      cash: cash.value,
      debt: debt.value,
      currentLocationId: currentLocationId.value,
      stocks,
      portfolio,
      tradeHistory,
    })

    // Check game end
    if (currentTurn.value >= maxTurns) {
      endGame()
    } else {
      activeTab.value = 'market'
    }
  }

  function endGame() {
    // Auto-liquidate portfolio
    for (const ticker in portfolio) {
      if (portfolio[ticker] > 0) {
        const s = stocks.find(x => x.ticker === ticker)
        if (s) cash.value += s.price * portfolio[ticker]
      }
      delete portfolio[ticker]
    }

    saveHighScore({
      netWorth: Math.round(netWorth.value),
      rank: `${rank.value.emoji} ${rank.value.title}`,
      date: new Date().toISOString().split('T')[0],
      turns: currentTurn.value,
      trades: tradeHistory.filter(h => h.type === 'buy' || h.type === 'sell').length,
    })

    deleteSave()
    vibrate([50, 100, 50, 100, 100])
    screen.value = 'end'
  }

  // Game flow
  function startGame() {
    resetState()
    screen.value = 'game'
  }

  function resumeGame() {
    const save = loadGame()
    if (!save) return startGame()

    currentTurn.value = save.currentTurn
    cash.value = save.cash
    debt.value = save.debt
    currentLocationId.value = save.currentLocationId

    // Restore stock prices
    save.stocks.forEach(saved => {
      const s = stocks.find(x => x.ticker === saved.ticker)
      if (s) {
        s.price = saved.price
        s.change = saved.change
      }
    })

    // Restore portfolio
    for (const key in portfolio) delete portfolio[key]
    for (const [k, v] of Object.entries(save.portfolio)) {
      portfolio[k] = v
    }

    // Restore trade history
    tradeHistory.splice(0)
    save.tradeHistory.forEach(h => tradeHistory.push(h))

    currentEvent.value = null
    screen.value = 'game'
  }

  function resetState() {
    currentTurn.value = 1
    cash.value = 10000
    debt.value = 0
    currentLocationId.value = 'sandhill'
    currentEvent.value = null
    activeTab.value = 'market'
    tradeHistory.splice(0)
    for (const key in portfolio) delete portfolio[key]
    for (const key in tradeQty) delete tradeQty[key]
    stocks.forEach(s => { s.price = s.basePrice; s.change = 0 })
  }

  function resetGame() {
    deleteSave()
    resetState()
    screen.value = 'start'
    hasExistingSave.value = false
  }

  // Haptics
  function vibrate(pattern) {
    try { navigator?.vibrate?.(pattern) } catch {}
  }

  return {
    // State
    screen, currentTurn, maxTurns, cash, debt,
    currentLocationId, currentLocation, currentEvent, activeTab,
    stocks, portfolio, tradeQty, tradeHistory,
    locations, hasExistingSave,

    // Computed
    availableStocks, portfolioValue, netWorth, portfolioItems,
    reversedHistory, rank,

    // Methods
    formatMoney, canBuy, canSell, setMaxBuy, setMaxSell,
    buy, sell, borrow, repay, travel,
    startGame, resumeGame, resetGame,
  }
}
