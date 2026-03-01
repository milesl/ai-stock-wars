import { events } from '../data/events.js'

export function maybeFireEvent(stocks) {
  if (Math.random() < 0.45) {
    const evt = events[Math.floor(Math.random() * events.length)]
    evt.apply(stocks)
    // Enforce minimum price after event
    stocks.forEach(s => { s.price = Math.max(0.50, s.price) })
    return evt
  }
  return null
}
