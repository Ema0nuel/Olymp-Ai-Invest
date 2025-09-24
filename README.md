# Basic Feature and Main Focus

## Screens (what to build / why)

1. Dashboard (Overview)
   Quick portfolio snapshot, top movers, cash, net P&L, small sparkline charts, latest trades/notifications.
   — Packages: nanostores, chart.js, date-fns, toastify-js.

2. Market / Watchlist
   Search symbols, add to watchlist, see last price, 24h change, volume. Click symbol → Trade View. Live updates.
   — Packages: reconnecting-websocket, mitt, nanostores.

3. Trade View (main trading screen) — big one
   Candlestick chart + depth/orderbook + order entry panel + recent fills + ability to click on chart to set price / TP / SL.
   — Packages: lightweight-charts, chart.js (for supporting analytics), toastify-js, micromodal.

4. Advanced Chart / Market Analysis
   Multi-indicator panel (SMA/EMA/RSI/MACD), multiple timeframes, template saves, drawing tools (simple). Users can set benchmarks and create alerts.
   — Packages: technicalindicators (for indicator logic) — but for streaming indicator updates use incremental formulas (see examples), lightweight-charts.

5. Copy Trading / Social Feed
   Leaderboard of traders, follow/unfollow, per-follower allocation, manual vs. auto copy, history of copied trades and P&L.
   — Packages: mitt, nanostores, mathjs (scaling/allocator).

6. Orders & History
   All open/filled/cancelled orders, trade details, export CSV.
   — Packages: @supabase/supabase-js (if saving server-side), toastify-js.

7. Strategy Builder / Alerts
   Small UI for users to define auto-rules (TP/SL, trailing stop, time-based withdraw) and backtest against recorded ticks.
   — Packages: technicalindicators, mathjs.

8. Admin / Demo Controller
   Seed accounts, pause feed, change liquidity/slippage, replay sessions (for interviews/demos).
   — Packages: none special — this is app-specific.

## Mapping: screen → principal packages & components

1. Trade View: lightweight-charts, reconnecting-websocket, micromodal, toastify-js, nanostores.

2. Analysis View: lightweight-charts, technicalindicators (or internal incremental impl), chart.js (histograms).

3. Copy Trading: mitt (pub/sub), nanostores, mathjs (scaling), server-side events (optional Pub/Sub).

4. Auto-withdraw / TP: nanostores, toastify-js, background worker timer (or server cron).
