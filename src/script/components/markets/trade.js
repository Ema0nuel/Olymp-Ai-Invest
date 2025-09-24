const trade = () => {
    function initGlowEffects() {
        const widgets = document.querySelectorAll('.tv-widget-wrapper')
        widgets.forEach(widget => {
            // Add pulse glow animation
            const glow = document.createElement('div')
            glow.className = 'absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-blue/20 opacity-0 transition-opacity duration-700 rounded-2xl'
            widget.appendChild(glow)

            widget.addEventListener('mouseenter', () => {
                widget.classList.add('scale-[1.02]')
                glow.classList.remove('opacity-0')
                widget.classList.add('shadow-[0_0_30px_rgba(26,251,145,0.3)]')
            })

            widget.addEventListener('mouseleave', () => {
                widget.classList.remove('scale-[1.02]')
                glow.classList.add('opacity-0')
                widget.classList.remove('shadow-[0_0_30px_rgba(26,251,145,0.3)]')
            })
        })
    }

    function pageEvents() {
        initGlowEffects()

        // Initialize widgets with staggered animation
        const widgets = document.querySelectorAll('.tv-widget-container')
        widgets.forEach((widget, index) => {
            setTimeout(() => {
                widget.classList.add('opacity-100', 'translate-y-0')
            }, index * 200)
        })
    }

    const miniSymbolWidgets = [
        { symbol: "FX:EURUSD", name: "EUR/USD" },
        { symbol: "FX:GBPUSD", name: "GBP/USD" },
        { symbol: "FX:USDJPY", name: "USD/JPY" },
        { symbol: "COINBASE:BTCUSD", name: "BTC/USD" }
    ]

    const widgetConfig = {
        colorTheme: "dark",
        dateRange: "12M",
        locale: "en",
        largeChartUrl: "",
        isTransparent: true,
        showFloatingTooltip: true,
        plotLineColorGrowing: "rgba(26, 251, 145, 1)",
        plotLineColorFalling: "rgba(255, 69, 58, 1)",
        gridLineColor: "rgba(240, 243, 250, 0.07)",
        scaleFontColor: "rgba(255, 255, 255, 0.7)",
        belowLineFillColorGrowing: "rgba(26, 251, 145, 0.12)",
        belowLineFillColorFalling: "rgba(255, 69, 58, 0.12)",
        belowLineFillColorGrowingBottom: "rgba(26, 251, 145, 0)",
        belowLineFillColorFallingBottom: "rgba(255, 69, 58, 0)",
        symbolActiveColor: "rgba(26, 251, 145, 0.12)",
        tabs: [
            {
                title: "Overview",
                symbols: [
                    { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                    { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
                    { s: "FOREXCOM:DJI", d: "Dow 30" },
                    { s: "INDEX:NKY", d: "Nikkei 225" },
                    { s: "CRYPTO:BTCUSD", d: "Bitcoin" },
                    { s: "CRYPTO:ETHUSD", d: "Ethereum" }
                ]
            },
            {
                title: "Forex",
                symbols: [
                    { s: "FX:EURUSD", d: "EUR/USD" },
                    { s: "FX:GBPUSD", d: "GBP/USD" },
                    { s: "FX:USDJPY", d: "USD/JPY" },
                    { s: "FX:USDCHF", d: "USD/CHF" },
                    { s: "FX:AUDUSD", d: "AUD/USD" },
                    { s: "FX:USDCAD", d: "USD/CAD" }
                ]
            }
        ],
        backgroundColor: "rgba(15, 15, 15, 0)",
        width: "100%",
        height: 400,
        showSymbolLogo: true,
        showChart: true
    }

    return ({
        html: /* html */`
        <section class="relative py-12 overflow-hidden">
            <!-- Background Effects -->
            <div class="absolute inset-0 pointer-events-none"></div>

            <!-- Mini Symbol Widgets -->
            <div class="container mx-auto px-4 relative z-10 mb-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${miniSymbolWidgets.map(widget => /* html */`
                        <div class="tv-widget-wrapper relative group">
                            <div class="relative p-1 rounded-xl border border-brand-primary/20 backdrop-blur-sm 
                                      transition-all duration-300 hover:border-brand-primary/40
                                      hover:shadow-[0_0_20px_rgba(26,251,145,0.2)]">
                                <div class="tradingview-widget-container" style="height:220px;">
                                    <iframe 
                                        scrolling="no" 
                                        allowtransparency="true" 
                                        frameborder="0"
                                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22${widget.symbol}%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%2212M%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%7D"
                                        style="width: 100%; height: 220px; display: block;"
                                        title="${widget.name} Overview"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Market Overview Widgets -->
            <div class="container mx-auto px-4 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Markets Widget -->
                    <div class="tv-widget-wrapper relative group transition-all duration-300 ease-out">
                        <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-blue/5 rounded-2xl"></div>
                        <div class="relative p-1 rounded-2xl border border-brand-primary/20 backdrop-blur-sm 
                                  transition-all duration-300 hover:border-brand-primary/40">
                            <div class="tv-widget-container opacity-0 translate-y-4 transition-all duration-500">
                                <div id="markets-widget" class="tradingview-widget-container">
                                    <div class="tradingview-widget-container__widget"></div>
                                    <script type="text/javascript">
                                    new TradingView.MediumWidget(${JSON.stringify({
            ...widgetConfig,
            container_id: "markets-widget",
            tabs: [widgetConfig.tabs[0]]
        })});
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Forex Widget -->
                    <div class="tv-widget-wrapper relative group transition-all duration-300 ease-out">
                        <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-primary/5 rounded-2xl"></div>
                        <div class="relative p-1 rounded-2xl border border-brand-primary/20 backdrop-blur-sm 
                                  transition-all duration-300 hover:border-brand-primary/40">
                            <div class="tv-widget-container opacity-0 translate-y-4 transition-all duration-500">
                                <div id="forex-widget" class="tradingview-widget-container">
                                    <div class="tradingview-widget-container__widget"></div>
                                    <script type="text/javascript">
                                    new TradingView.MediumWidget(${JSON.stringify({
            ...widgetConfig,
            container_id: "forex-widget",
            tabs: [widgetConfig.tabs[1]]
        })});
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Access Trading Links -->
                <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${['Forex', 'Crypto', 'Stocks', 'Commodities'].map(market => /* html */`
                        <a data-nav
                           class="group relative overflow-hidden rounded-xl p-4 border border-brand-primary/20
                                  bg-gradient-to-br from-brand-black to-brand-blue/5
                                  hover:border-brand-primary/40 transition-all duration-300">
                            <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative z-10 flex items-center justify-between">
                                <span class="text-white font-medium">${market}</span>
                                <i class="fas fa-chart-area text-brand-primary transform group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>
        `,
        pageEvents
    })
}

export default trade