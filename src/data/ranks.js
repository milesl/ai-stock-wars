export const ranks = [
  { min: 100000, title: 'AI OVERLORD', emoji: '\uD83C\uDFC6', flavour: 'You won the hype cycle. Time to write a book about it and start a podcast.' },
  { min: 50000, title: 'VENTURE CAPITALIST', emoji: '\uD83D\uDC8E', flavour: 'Impressive returns. You should start an AI fund and charge 2-and-20 for index-level performance.' },
  { min: 25000, title: 'HYPE MERCHANT', emoji: '\uD83D\uDCC8', flavour: 'Not bad! You outperformed most VCs, which is a low bar but still.' },
  { min: 15000, title: 'BOT TRADER', emoji: '\uD83E\uDD16', flavour: 'You made some money. Enough for a used Tesla and a "HUSTLER" bumper sticker.' },
  { min: 10000, title: 'BROKE EVEN (somehow)', emoji: '\uD83D\uDE10', flavour: 'You literally could have put this in a savings account. But at least you had fun, right?' },
  { min: 5000, title: 'BAG HOLDER', emoji: '\uD83D\uDCC9', flavour: 'You lost half your money chasing AI hype. Classic retail experience.' },
  { min: 0, title: 'RETAIL INVESTOR', emoji: '\uD83D\uDDD1\uFE0F', flavour: 'At least you have something left. Maybe try bonds next time.' },
  { min: -Infinity, title: 'BANKRUPT FOUNDER', emoji: '\uD83D\uDC80', flavour: 'You owe money. The SoftBanker is coming. Start a new AI startup to pay off the debt.' },
]

export function getRank(netWorth) {
  return ranks.find(r => netWorth >= r.min) || ranks[ranks.length - 1]
}
