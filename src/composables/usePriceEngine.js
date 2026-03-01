export function updatePrices(stocks) {
  stocks.forEach(s => {
    const oldPrice = s.price
    const meanReversion = (s.basePrice - s.price) * 0.03
    const randomShock = (Math.random() - 0.5) * 2 * s.volatility * s.price
    s.price = Math.max(0.50, s.price + meanReversion + randomShock)
    s.change = ((s.price - oldPrice) / oldPrice) * 100
  })
}
