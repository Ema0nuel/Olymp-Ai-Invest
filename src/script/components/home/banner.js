export function renderHomeBanner() {
    return /* html */`
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container" id="tradingview-banner">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span class="blue-text">Ticker tape by TradingView</span>
        </a>
      </div>
    </div>
    <!-- TradingView Widget END -->
    `;
}