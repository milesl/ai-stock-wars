# AI Stock Wars

A satirical stock trading game inspired by the classic Dope Wars (1998), set in the absurdity of the AI investment hype cycle. Buy low, sell high, survive random market events, and try not to go bankrupt.

## Play

**[Live Demo](#)** (coming soon)

Or run locally:

```bash
npm install
npm run dev
```

## How to Play

- You start with **$10,000** and **30 turns** (quarters)
- Travel between 16 Silicon Valley locations to find different stocks
- Buy and sell from a pool of 30 fictional AI companies
- Random satirical news events crash or pump the market each turn
- Borrow from the SoftBanker (15% interest per quarter — what could go wrong?)
- After 30 turns your portfolio is liquidated and you're ranked

## Ranks

| Net Worth | Rank |
|---|---|
| $100,000+ | AI OVERLORD |
| $50,000+ | VENTURE CAPITALIST |
| $25,000+ | HYPE MERCHANT |
| $15,000+ | BOT TRADER |
| $10,000+ | BROKE EVEN (somehow) |
| $5,000+ | BAG HOLDER |
| $0+ | RETAIL INVESTOR |
| < $0 | BANKRUPT FOUNDER |

## Tech Stack

- Vue 3 (Composition API, SFCs)
- Vite
- PWA (installable, offline-capable)
- No backend — all client-side with localStorage persistence

## Build

```bash
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Disclaimer

None of this is financial advice. All characters are fictional. Any resemblance to actual grifts is entirely intentional.
