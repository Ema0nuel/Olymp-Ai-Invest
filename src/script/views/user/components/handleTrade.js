import toastify from "../../../components/toastify";
import supabase from "../../../utils/supabaseClients";
import LOGO from "../../../../images/logo.jpg";

const CRYPTO_IDS = [
  "bitcoin",
  "ethereum",
  "tether",
  "binancecoin",
  "ripple",
  "cardano",
  "solana",
  "polkadot",
  "dogecoin",
  "avalanche-2",
  "chainlink",
  "uniswap",
  "litecoin",
  "matic-network",
  "stellar",
].join(",");

class TradeSessionHandler {
  constructor() {
    this.session = null;
    this.chart = null;
    this.priceInterval = null;
    this.timerInterval = null;
    this.socket = null;
    this.lastPrice = 100;
    this.candleData = [];
    this.isPaused = false;
    this.pauseStart = null;
    this.totalPausedTime = 0;
    this.tvWidget = null;
    this.tradeAsset = null;

    // Trading parameters
    this.leverage = 100;
    this.volatility = 0.002;
    this.trendStrength = 0.3;
    this.trend = 0;
    this.downwardBias = 0.48;
    this.priceHistory = [];
    this.marketPrices = {};
    this.priceUpdateInterval = null;
    this.marketSentiment = 0;
    this.volatilityFactor = 1.5;
    this.slippageFee = 0.05;
  }

  initializeTradingView(symbol = "BTCUSDT") {
    const container = document.getElementById("tradingview_widget");
    if (!container) return;

    container.innerHTML = /* html */ `
            <div class="tradingview-widget-container" style="height:100%;width:100%">
                <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>
                <div class="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                        <span class="blue-text">Track all markets on TradingView</span>
                    </a>
                </div>
            </div>
        `;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `${symbol}`,
      interval: "1",
      timezone: "exchange",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      withdateranges: true,
      save_image: false,
      details: true,
      hotlist: true,
      backgroundColor: "rgba(30, 34, 45, 1)",
    });

    container
      .querySelector(".tradingview-widget-container")
      .appendChild(script);
  }

  async initializeSession(sessionData) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let currentBalance;
      let accountId;
      const tradeAmount = parseFloat(sessionData.amount);

      // Handle USD balance from trading_accounts
      if (sessionData.tradeAsset === "USD") {
        const { data: tradingAccount, error: tradingError } = await supabase
          .from("trading_accounts")
          .select("*")
          .eq("user_id", user.id)
          .eq("account_type", "live")
          .single();

        if (tradingError) throw tradingError;

        currentBalance = parseFloat(tradingAccount?.balance || 0);
        accountId = tradingAccount?.id;

        // Immediately deduct trade amount from USD balance
        const newBalance = currentBalance - tradeAmount;
        if (newBalance < 0) {
          throw new Error(
            `Insufficient USD balance. Available: ${currentBalance}`
          );
        }

        const { error: updateError } = await supabase
          .from("trading_accounts")
          .update({ balance: newBalance })
          .eq("id", accountId);

        if (updateError) throw updateError;
      }
      // Handle other assets from user_assets
      else {
        // First get the asset ID
        const { data: asset, error: assetError } = await supabase
          .from("assets")
          .select("id")
          .eq("symbol", sessionData.tradeAsset)
          .single();

        if (assetError) {
          throw new Error(`Asset ${sessionData.tradeAsset} not found`);
        }

        // Then get the user's asset balance
        const { data: userAsset, error: userAssetError } = await supabase
          .from("user_assets")
          .select("id, balance")
          .eq("user_id", user.id)
          .eq("asset_id", asset.id)
          .single();

        if (userAssetError) {
          throw new Error(`No ${sessionData.tradeAsset} balance found`);
        }

        currentBalance = parseFloat(userAsset?.balance || 0);
        accountId = userAsset?.id;

        // Verify balance
        const newBalance = currentBalance - tradeAmount;
        if (newBalance < 0) {
          throw new Error(
            `Insufficient ${sessionData.tradeAsset} balance. Available: ${currentBalance}`
          );
        }

        // Update balance
        const { error: updateError } = await supabase
          .from("user_assets")
          .update({ balance: newBalance })
          .eq("id", accountId);

        if (updateError) throw updateError;
      }

      // Initialize session with correct values
      this.session = {
        ...sessionData,
        startTime: Date.now(),
        currentProfit: 0,
        highestProfit: 0,
        lowestProfit: 0,
        remainingTime: sessionData.duration,
        startPrice: this.lastPrice,
        currentPrice: this.lastPrice,
        takeProfitLevel: null,
        stopLossLevel: null,
        userId: user.id,
        accountId: accountId,
        initialBalance: currentBalance,
        currentBalance: currentBalance - tradeAmount,
        tradeAmount: tradeAmount,
        tradeFee: tradeAmount * 0.1,
        tradeAsset: sessionData.tradeAsset,
      };

      this.tradeAsset = sessionData.tradeAsset;

      localStorage.setItem(
        `userBalance_${this.tradeAsset}`,
        (currentBalance - tradeAmount).toString()
      );
      this.saveSessionToStorage();

      this.initializeTradingView(sessionData.symbol || "BTCUSDT");
      this.startPriceSimulation();
      this.startTimer();

      return this.session;
    } catch (error) {
      console.error("Session initialization error:", error);
      toastify({
        text: error.message || "Failed to initialize session",
        background: "bg-red-500",
      });
      throw error;
    }
  }

  // Update calculateProfit method

  calculateProfit() {
    if (!this.session) return;

    const tradeAmount = parseFloat(this.session.tradeAmount);
    const startPrice = parseFloat(this.session.startPrice);
    const currentPrice = parseFloat(this.lastPrice);

    // Calculate percentage change (as decimal)
    const priceChangePercent = (currentPrice - startPrice) / startPrice;

    // Calculate raw profit with corrected formula:
    // Example for 20% price change:
    // tradeAmount * (priceChangePercent) * leverage
    // $100 * 0.20 * 100 = $2000
    const rawProfit = tradeAmount * priceChangePercent * this.leverage;

    // Calculate fixed trading fee (10% of trade amount)
    const tradeFee = tradeAmount * 0.1; // $100 * 10% = $10

    // Store values in session
    this.session.rawProfit = rawProfit;
    this.session.tradeFee = tradeFee;
    this.session.currentProfit = rawProfit; // Raw profit before fees for display

    // Track profit extremes
    this.session.highestProfit = Math.max(
      this.session.highestProfit || 0,
      rawProfit
    );
    this.session.lowestProfit = Math.min(
      this.session.lowestProfit || 0,
      rawProfit
    );

    this.saveSessionToStorage();
  }

  async endSession(reason = "manual") {
    if (!this.session) return;

    try {
      // Cleanup
      if (this.priceInterval) clearInterval(this.priceInterval);
      if (this.timerInterval) clearInterval(this.timerInterval);
      if (this.socket) this.socket.close();
      if (this.tvWidget) this.tvWidget.remove();

      // Get values
      const tradeAmount = parseFloat(this.session.tradeAmount);
      const rawProfit = parseFloat(this.session.rawProfit);
      const tradeFee = parseFloat(this.session.tradeFee);
      const balanceAfterTrade = parseFloat(this.session.currentBalance); // $900 ($1000 - $100)

      // Calculate final balance:
      // 1. Start with balance after trade ($900)
      // 2. Add back trade amount ($900 + $100 = $1000)
      // 3. Add profit/loss after fees ($1000 + ($500 - $10) = $1490)
      const finalBalance =
        balanceAfterTrade + tradeAmount + (rawProfit - tradeFee);

      // Update balance in database
      const { error: updateError } = await supabase
        .from(
          this.session.tradeAsset === "USD" ? "trading_accounts" : "user_assets"
        )
        .update({
          balance: Math.max(0, finalBalance),
        })
        .eq("id", this.session.accountId);

      if (updateError) throw updateError;

      // Create transaction record
      const transactionData = {
        user_id: this.session.userId,
        type: "swap",
        status: "completed",
        amount: Math.abs(rawProfit),
        fee: tradeFee,
        fee_percentage: 10, // 10% fixed fee
        network: "internal",
        created_at: new Date(this.session.startTime).toISOString(),
        completed_at: new Date().toISOString(),
        currency: this.session.tradeAsset,
        notes: `Trading ${reason}`,
        metadata: {
          trade_type: "spot",
          initial_balance: this.session.initialBalance,
          trade_amount: tradeAmount,
          balance_after_trade: balanceAfterTrade,
          raw_profit_loss: rawProfit,
          trading_fee: tradeFee,
          final_balance: finalBalance,
          reason: reason,
          leverage_used: this.leverage,
        },
      };

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert(transactionData);

      if (transactionError) throw transactionError;

      // Store final values and clean up
      const netProfit = rawProfit - tradeFee;
      const sessionAsset = this.session.tradeAsset;

      // Clear session
      this.session = null;
      localStorage.removeItem("activeTradeSession");
      localStorage.setItem(
        `userBalance_${sessionAsset}`,
        finalBalance.toString()
      );

      toastify({
        text: `Trading session ended. P/L: ${netProfit.toFixed(
          2
        )} ${sessionAsset}`,
        background: netProfit >= 0 ? "bg-green-500" : "bg-red-500",
      });

      return netProfit;
    } catch (error) {
      console.error("Session end error:", error);
      toastify({
        text: "Error ending trading session",
        background: "bg-red-500",
      });
      throw error;
    }
  }

  async fetchMarketPrices() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS}&vs_currencies=usd`
      );
      const data = await response.json();
      this.marketPrices = data;
      return data;
    } catch (error) {
      console.error("Price fetch error:", error);
      return null;
    }
  }

  startPriceSimulation() {
    if (this.priceInterval) clearInterval(this.priceInterval);
    if (this.priceUpdateInterval) clearInterval(this.priceUpdateInterval);

    this.priceUpdateInterval = setInterval(async () => {
      await this.fetchMarketPrices();
    }, 30000);

    this.priceInterval = setInterval(() => {
      if (this.isPaused) return;

      this.marketSentiment += (Math.random() - 0.5) * 0.1;
      this.marketSentiment = Math.max(Math.min(this.marketSentiment, 1), -1);

      const symbol = this.session?.symbol?.toLowerCase() || "bitcoin";
      const marketPrice = this.marketPrices[symbol]?.usd || this.lastPrice;

      const volatility = this.volatility * this.volatilityFactor;
      const sentimentImpact = this.marketSentiment * volatility * 2;
      const trendImpact = this.trend * volatility;
      const randomFactor = (Math.random() - 0.5) * volatility;

      const priceChange =
        marketPrice *
        (sentimentImpact +
          trendImpact +
          randomFactor +
          Math.sin(Date.now() / 10000) * volatility * 0.5);

      this.lastPrice = Math.max(1, marketPrice + priceChange);
      this.priceHistory.push({
        price: this.lastPrice,
        timestamp: Date.now(),
      });

      if (this.priceHistory.length > 3600) {
        this.priceHistory.shift();
      }

      const candle = {
        x: Date.now(),
        o: this.lastPrice,
        h: this.lastPrice * (1 + Math.random() * volatility),
        l: this.lastPrice * (1 - Math.random() * volatility),
        c: this.lastPrice,
      };

      this.updatePriceData(candle);
    }, 1000);
  }

  updatePriceData(candle) {
    this.candleData.push(candle);
    if (this.candleData.length > 100) this.candleData.shift();

    if (this.session) {
      this.session.currentPrice = this.lastPrice;
      this.calculateProfit();
      this.updateChart();
      this.checkTakeProfitStopLoss();
      this.updateUI();
    }
  }

  renderTakeProfitStopLoss() {
    if (!this.session) return "";

    const { takeProfitLevel, stopLossLevel, currentProfit } = this.session;

    return /* html */ `
            ${
              takeProfitLevel
                ? /* html */ `
                <div class="mt-4 p-2 bg-green-500/10 rounded-lg flex justify-between items-center">
                    <span>Take Profit</span>
                    <span class="font-bold ${
                      currentProfit >= takeProfitLevel
                        ? "text-green-500"
                        : "text-white"
                    }">
                        $${takeProfitLevel.toFixed(2)}
                    </span>
                </div>
            `
                : ""
            }
            
            ${
              stopLossLevel
                ? /* html */ `
                <div class="mt-2 p-2 bg-red-500/10 rounded-lg flex justify-between items-center">
                    <span>Stop Loss</span>
                    <span class="font-bold ${
                      currentProfit <= stopLossLevel
                        ? "text-red-500"
                        : "text-white"
                    }">
                        $${Math.abs(stopLossLevel).toFixed(2)}
                    </span>
                </div>
            `
                : ""
            }
        `;
  }

  updateChart() {
    if (!this.chart || !this.candleData.length) return;

    this.chart.data.datasets[0].data = this.candleData;
    this.chart.update("none");
  }

  updateUI() {
    const infoContainer = document.getElementById("tradeInfo");
    if (!infoContainer || !this.session || !this.lastPrice) return;

    try {
      const timeLeft = this.session.remainingTime || 0;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      const startPrice = this.session.startPrice || this.lastPrice;
      const isProfit = this.lastPrice > startPrice;
      const profitClass = isProfit ? "text-green-500" : "text-red-500";
      const profitPrefix = isProfit ? "+" : "";

      const priceMovement = startPrice
        ? ((this.lastPrice - startPrice) / startPrice) * 100
        : 0;
      const momentum = this.calculateMomentum();

      const currentProfit = this.session.currentProfit || 0;
      const tradeFee = this.session.tradeFee || 0;
      const initialBalance = this.session.initialBalance || 0;
      const tradeAsset = this.session.tradeAsset || "USD";

      infoContainer.innerHTML = /* html */ `
            <div class="space-y-4 p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-gray-400">Current Leverage</div>
                        <div class="text-xl font-bold text-white">
                            ${(this.lastPrice || 0).toFixed(2)} ${tradeAsset}
                        </div>
                        <div class="text-xs ${profitClass}">
                            ${profitPrefix}${priceMovement.toFixed(2)}%
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-400">Time Left</div>
                        <div class="text-xl font-bold text-white">
                            ${minutes}:${seconds.toString().padStart(2, "0")}
                        </div>
                        <div class="text-xs text-gray-400">Momentum: ${momentum}</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-400">Current P/L</div>
                        <div class="text-xl font-bold ${profitClass}">
                            ${profitPrefix}${Math.abs(currentProfit).toFixed(
        2
      )} ${tradeAsset}
                        </div>
                        <div class="text-xs text-gray-400">
                            Fee: ${tradeFee.toFixed(2)} ${tradeAsset}
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-400">Initial Balance</div>
                        <div class="text-xl font-bold text-white">
                            ${initialBalance.toFixed(2)} ${tradeAsset}
                        </div>
                    </div>
                </div>
                ${this.renderTakeProfitStopLoss()}
            </div>
        `;
    } catch (error) {
      console.error("UI update error:", error);
      infoContainer.innerHTML = `
            <div class="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <p class="text-red-500">Error updating trade information</p>
            </div>
        `;
    }
  }

  calculateMomentum() {
    if (!Array.isArray(this.priceHistory) || this.priceHistory.length < 10) {
      return "Calculating...";
    }

    try {
      const recent = this.priceHistory.slice(-10);
      const momentum = recent.reduce((acc, curr, i, arr) => {
        if (i === 0) return acc;
        return acc + (curr.price - arr[i - 1].price) / arr[i - 1].price;
      }, 0);

      if (momentum > 0.01) return "🔥 Strong Up";
      if (momentum > 0) return "📈 Upward";
      if (momentum < -0.01) return "❄️ Strong Down";
      if (momentum < 0) return "📉 Downward";
      return "↔️ Neutral";
    } catch (error) {
      console.error("Momentum calculation error:", error);
      return "Calculating...";
    }
  }

  setTakeProfit(amount) {
    if (!this.session || !amount) return false;
    this.session.takeProfitLevel = parseFloat(amount);
    this.saveSessionToStorage();
    toastify({
      text: `Take Profit set to $${amount}`,
      background: "bg-green-500",
    });
    return true;
  }

  setStopLoss(amount) {
    if (!this.session || !amount) return false;
    this.session.stopLossLevel = -Math.abs(parseFloat(amount));
    this.saveSessionToStorage();
    toastify({
      text: `Stop Loss set to $${amount}`,
      background: "bg-red-500",
    });
    return true;
  }

  checkTakeProfitStopLoss() {
    if (!this.session?.currentProfit) return;

    const { currentProfit, takeProfitLevel, stopLossLevel } = this.session;

    if (takeProfitLevel && currentProfit >= takeProfitLevel) {
      this.endSession("take_profit");
      return;
    }

    if (stopLossLevel && currentProfit <= stopLossLevel) {
      this.endSession("stop_loss");
      return;
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.isPaused || !this.session) return;

      if (this.session.remainingTime <= 0) {
        this.endSession("timeout");
        return;
      }

      this.session.remainingTime--;
      this.saveSessionToStorage();
      this.updateUI();
    }, 1000);
  }

  handleVisibilityChange(isHidden) {
    if (isHidden) {
      this.pauseSession();
      this.showNotification(
        "Trading Session Paused",
        "Your trading session is on hold. Return to continue trading."
      );
    } else {
      this.resumeSession();
    }
  }

  pauseSession() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.pauseStart = Date.now();
    this.updateUI();
  }

  resumeSession() {
    if (!this.isPaused) return;
    this.isPaused = false;
    if (this.pauseStart) {
      this.totalPausedTime += Date.now() - this.pauseStart;
    }
    this.updateUI();
  }

  saveSessionToStorage() {
    if (!this.session) return;
    localStorage.setItem(
      "activeTradeSession",
      JSON.stringify({
        ...this.session,
        lastUpdated: Date.now(),
      })
    );
  }

  restoreSession(savedSession) {
    this.session = savedSession;
    this.lastPrice = savedSession.currentPrice;
    this.initializeTradingView(savedSession.symbol || "BTCUSDT");
    this.startPriceSimulation();
    this.startTimer();
  }

  showNotification(title, body) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: LOGO,
      });
    }
  }
}

export const handleTradeSession = new TradeSessionHandler();
