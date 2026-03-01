export const events = [
  // === MARKET-WIDE EVENTS (15) ===
  {
    text: "BREAKING: Fed chair mentions 'AI' in testimony \u2014 everything moons",
    effect: 'All stocks +20\u201340%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.2 + 0.2 }),
  },
  {
    text: 'Senate hearing: Senator asks AI to explain itself. AI refuses.',
    effect: 'All stocks -15%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.85 }),
  },
  {
    text: "Goldman Sachs report: 'AI is the new electricity.' Every stock pumps.",
    effect: 'All stocks +15\u201325%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.1 + 0.15 }),
  },
  {
    text: "Entire market realises nobody's actually making money from AI yet. Brief panic.",
    effect: 'All stocks -20\u201335%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.65 + Math.random() * 0.15 }),
  },
  {
    text: 'AI bubble comparison article #9,847 published. Market ignores it. Stocks up.',
    effect: 'All stocks +10%',
    apply: (ss) => ss.forEach(s => { s.price *= 1.1 }),
  },
  {
    text: 'Elon tweets a single emoji. Markets react accordingly.',
    effect: 'Random chaos \u00B130%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.7 + Math.random() * 0.6 }),
  },
  {
    text: 'China announces $500B AI fund. Global arms race accelerates.',
    effect: 'All stocks +10\u201330%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.2 + 0.1 }),
  },
  {
    text: 'EU passes AI Act. Nobody reads it. Stocks dip on vibes alone.',
    effect: 'All stocks -10\u201320%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.8 + Math.random() * 0.1 }),
  },
  {
    text: "Interest rates rise. Tech valuations? Who needs fundamentals?",
    effect: 'All stocks -15\u201325%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.75 + Math.random() * 0.1 }),
  },
  {
    text: 'SoftBanker\u2122 announces $100B Vision Fund 3. Money printer goes brr.',
    effect: 'All stocks +15\u201320%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.05 + 0.15 }),
  },
  {
    text: "Power grid can't handle AI data centres. Rolling blackouts in California.",
    effect: 'All stocks -10\u201315%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.85 + Math.random() * 0.05 }),
  },
  {
    text: "It's earnings season. Everyone beats estimates by redefining 'earnings'.",
    effect: 'All stocks +5\u201315%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.1 + 0.05 }),
  },
  {
    text: "Major hedge fund liquidates all AI positions. 'We've seen this before.'",
    effect: 'All stocks -15\u201330%',
    apply: (ss) => ss.forEach(s => { s.price *= 0.7 + Math.random() * 0.15 }),
  },
  {
    text: 'AI hype reaches peak Gartner. Trough of disillusionment postponed.',
    effect: 'All stocks +5\u201310%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.05 + 0.05 }),
  },
  {
    text: 'Year-end rally. Every fund manager panic-buys AI to look smart in the annual letter.',
    effect: 'All stocks +15\u201330%',
    apply: (ss) => ss.forEach(s => { s.price *= 1 + Math.random() * 0.15 + 0.15 }),
  },

  // === TICKER-SPECIFIC EVENTS (20) ===
  {
    text: "Your top holding's AI turns out to be 500 people in a call centre",
    effect: 'Random stock -50%',
    apply: (ss) => { ss[Math.floor(Math.random() * ss.length)].price *= 0.5 },
  },
  {
    text: 'AI Toaster goes viral on TikTok. It burns toast but with machine learning.',
    effect: 'TSTR +80%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'TSTR'); if (s) s.price *= 1.8 },
  },
  {
    text: "r/WallStreetBets discovers DFNS. 'It literally can't go tits up.'",
    effect: 'DFNS +100%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'DFNS'); if (s) s.price *= 2.0 },
  },
  {
    text: 'Autonomous Car Corp demo: drives perfectly for 30 seconds, then hits a cone.',
    effect: 'VROOM -25%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'VROOM'); if (s) s.price *= 0.75 },
  },
  {
    text: 'Y Combinator announces 847 new AI startups. All are API wrappers.',
    effect: 'WRPR -20%, SAAS -20%',
    apply: (ss) => { ss.filter(x => x.ticker === 'WRPR' || x.ticker === 'SAAS').forEach(s => { s.price *= 0.8 }) },
  },
  {
    text: "AGI Tomorrow CEO: 'We've achieved AGI internally.' Source: trust me bro.",
    effect: 'AGIX +60%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'AGIX'); if (s) s.price *= 1.6 },
  },
  {
    text: 'GPU shortage worsens. NVIDIA CEO does a leather jacket reveal. Crowd goes wild.',
    effect: 'GPUX +35%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'GPUX'); if (s) s.price *= 1.35 },
  },
  {
    text: "WeAddedAI Corp still hasn't explained how a mattress needs AI. Stock rallies anyway.",
    effect: 'RNMD +55%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'RNMD'); if (s) s.price *= 1.55 },
  },
  {
    text: "Circular economy update: VCs \u2192 startups \u2192 cloud \u2192 VCs. Everything is fine.",
    effect: 'HYPE +25%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'HYPE'); if (s) s.price *= 1.25 },
  },
  {
    text: 'RugPull AI Token founder spotted boarding a one-way flight. Token dumps.',
    effect: 'RUGX -70%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'RUGX'); if (s) s.price *= 0.3 },
  },
  {
    text: 'Smart Fridge Neural sends your shopping list to your employer. PR crisis.',
    effect: 'PINS -40%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'PINS'); if (s) s.price *= 0.6 },
  },
  {
    text: 'AI Drone Taxi completes first flight! ...into a building. Pilot was the AI.',
    effect: 'FLYT -35%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'FLYT'); if (s) s.price *= 0.65 },
  },
  {
    text: "RoboButler demo: successfully pours wine. Into the CEO's lap. Stock moons anyway.",
    effect: 'ROBO +50%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'ROBO'); if (s) s.price *= 1.5 },
  },
  {
    text: 'DeepFake Studios accidentally deepfakes the president. Secret Service not amused.',
    effect: 'DEEP -45%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'DEEP'); if (s) s.price *= 0.55 },
  },
  {
    text: "MeetingBot Pro achieves sentience, starts scheduling meetings about its own existence.",
    effect: 'SENT +50%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'SENT'); if (s) s.price *= 1.5 },
  },
  {
    text: "Sentience Labs AI writes a poem. Investors call it 'evidence of consciousness'. It rhymed 'cat' with 'hat'.",
    effect: 'SENT +50%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'SENT'); if (s) s.price *= 1.5 },
  },
  {
    text: 'PharmaBot discovers New Drug\u2122. It\'s aspirin. Patent rejected.',
    effect: 'PILL -30%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'PILL'); if (s) s.price *= 0.7 },
  },
  {
    text: 'AlgoTrade AI buys its own stock. Creates infinite loop. SEC confused.',
    effect: 'CLRA +45%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'CLRA'); if (s) s.price *= 1.45 },
  },
  {
    text: "ClarityBot gains viral traction after arguing with a user for 3 hours about whether a hot dog is a sandwich.",
    effect: 'CLRA +45%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'CLRA'); if (s) s.price *= 1.45 },
  },
  {
    text: "NeoBank.ai accidentally sends everyone's balance to zero. Calls it 'a feature'.",
    effect: 'BLKC -50%',
    apply: (ss) => { const s = ss.find(x => x.ticker === 'BLKC'); if (s) s.price *= 0.5 },
  },

  // === CATEGORY EVENTS (10) ===
  {
    text: 'New AI model drops \u2014 previous gen instantly worthless',
    effect: 'Chatbot/wrapper -40%, infra +30%',
    apply: (ss) => ss.forEach(s => {
      if (s.category === 'chatbot' || s.category === 'wrapper') s.price *= 0.6
      if (s.category === 'infra') s.price *= 1.3
    }),
  },
  {
    text: 'OpenAI announces a new model. Again. Everyone pivots. Again.',
    effect: 'Wrappers -30%, infra +20%',
    apply: (ss) => ss.forEach(s => {
      if (s.category === 'wrapper') s.price *= 0.7
      if (s.category === 'infra') s.price *= 1.2
    }),
  },
  {
    text: 'AI Girlfriend Premium users report feeling genuine emotions. Therapists concerned.',
    effect: 'Consumer stocks +45%',
    apply: (ss) => ss.filter(s => s.category === 'consumer').forEach(s => { s.price *= 1.45 }),
  },
  {
    text: 'Breaking: AI passes the bar exam, medical boards, and a vibe check.',
    effect: 'AGI +40%, chatbot +25%',
    apply: (ss) => ss.forEach(s => {
      if (s.category === 'agi') s.price *= 1.4
      if (s.category === 'chatbot') s.price *= 1.25
    }),
  },
  {
    text: 'Congress bans AI in healthcare pending review. Biotech panic.',
    effect: 'Health stocks -40%',
    apply: (ss) => ss.filter(s => s.category === 'health').forEach(s => { s.price *= 0.6 }),
  },
  {
    text: 'Enterprise AI budgets triple. Every Fortune 500 needs an AI strategy deck.',
    effect: 'Wrappers +20%',
    apply: (ss) => ss.filter(s => s.category === 'wrapper').forEach(s => { s.price *= 1.2 }),
  },
  {
    text: 'AI-generated content floods Google. SEO is dead. AI media stocks surge.',
    effect: 'Media stocks +40%',
    apply: (ss) => ss.filter(s => s.category === 'media').forEach(s => { s.price *= 1.4 }),
  },
  {
    text: 'Crypto winter returns. All blockchain-adjacent AI tokens dump.',
    effect: 'Scam stocks -50%',
    apply: (ss) => ss.filter(s => s.category === 'scam').forEach(s => { s.price *= 0.5 }),
  },
  {
    text: "Hardware startups can't get chips. Supply chain nightmare.",
    effect: 'Hardware -30%, infra +25%',
    apply: (ss) => ss.forEach(s => {
      if (s.category === 'hardware') s.price *= 0.7
      if (s.category === 'infra') s.price *= 1.25
    }),
  },
  {
    text: 'Fintech AI flash crash: algorithms trading against each other in a death spiral.',
    effect: 'Scam stocks -35%',
    apply: (ss) => ss.filter(s => s.category === 'scam').forEach(s => { s.price *= 0.65 }),
  },

  // === NO-OP / COMEDY EVENTS (5) ===
  {
    text: 'EXCLUSIVE: Major AI company caught training on copyrighted content. Nobody cares.',
    effect: 'No effect. Business as usual.',
    apply: () => {},
  },
  {
    text: "Tech journalist writes 'AI will change everything'. Adds nothing new. Gets 50k likes.",
    effect: 'No effect. Engagement economy working as intended.',
    apply: () => {},
  },
  {
    text: 'AI ethicist publishes 900-page report. VCs use it as a monitor stand.',
    effect: 'No effect. Ethics never had a chance.',
    apply: () => {},
  },
  {
    text: "Sam Altman tweets 'something interesting coming soon \uD83D\uDC40'. Nothing happens for 6 months.",
    effect: 'No effect. Hype is the product.',
    apply: () => {},
  },
  {
    text: 'Your portfolio briefly gains sentience, looks at its own performance, and asks to be deleted.',
    effect: 'No effect. Existential dread is not a market signal.',
    apply: () => {},
  },
]
