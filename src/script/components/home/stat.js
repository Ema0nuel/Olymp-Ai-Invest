export function renderHomeStat() {
    return /* html */`
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container h-full w-full">
        <div class="tradingview-widget-container__widget-stat" style="height:700px;width:80%;margin: auto;"></div>
        <div class="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/symbols/BITSTAMP-BTCUSD/?exchange=BITSTAMP" 
               rel="noopener nofollow" 
               target="_blank">
                <span class="blue-text">BTCUSD chart by TradingView</span>
            </a>
        </div>
    </div>
    <!-- TradingView Widget END -->
    `;
}

export function initializeStatWidget() {
    const container = document.querySelector('.tradingview-widget-container__widget-stat');
    if (container) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.innerHTML /* html */ = JSON.stringify({
            "allow_symbol_change": true,
            "calendar": false,
            "details": true,
            "hide_side_toolbar": false,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "hide_volume": false,
            "hotlist": true,
            "interval": "1",
            "locale": "en",
            "save_image": true,
            "style": "1",
            "symbol": "BITSTAMP:BTCUSD",
            "theme": "dark",
            "timezone": "Etc/UTC",
            "backgroundColor": "#0F0F0F",
            "gridColor": "rgba(242, 242, 242, 0.06)",
            "watchlist": [
                "SP:SPX",
                "TVC:GOLD",
                "BINANCE:BTCUSDT",
                "NASDAQ:QQQ"
            ],
            "withdateranges": true,
            "compareSymbols": [
                {
                    "symbol": "BITSTAMP:ETHUSD",
                    "position": "SameScale"
                },
                {
                    "symbol": "CRYPTOCAP:USDT",
                    "position": "SameScale"
                },
                {
                    "symbol": "TVC:GOLD",
                    "position": "SameScale"
                },
                {
                    "symbol": "FX:GBPUSD",
                    "position": "SameScale"
                }
            ],
            "studies": [],
            "autosize": true
        });
        container.appendChild(script);
    }
}