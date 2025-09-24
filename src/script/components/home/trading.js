import Shape from '../../../images/assets/Shape.webp';
import Vector3 from '../../../images/assets/Vector-3.png';
import Element from '../../../images/assets/Element.png';
import Star from '../../../images/assets/Star-1.png';
import Planet1 from '../../../images/assets/planet-1.png';

// Market data configuration
const MARKET_CARDS = [
    {
        id: 'eurusd',
        symbol: '€/$',
        name: 'EUR/USD',
        price: '$1.11610',
        change: '+0.13%',
        color: 'brand-primary',
        pair: 'FX:EURUSD' // Updated trading pair format
    },
    {
        id: 'gold',
        symbol: 'Au',
        name: 'Gold',
        price: '$3,195.60',
        change: '+0.27%',
        color: 'ui-info',
        pair: 'TVC:GOLD' // Updated trading pair format
    },
    {
        id: 'btcusd',
        symbol: '₿',
        name: 'BTC/USD',
        price: '$52,369.80',
        change: '+1.78%',
        color: 'ui-warning',
        pair: 'BINANCE:BTCUSDT' // Updated trading pair format
    }
];

const trading = () => {
    let tvWidget = null;

    function initTradingViewWidget(symbol = "BINANCE:BTCUSDT") {
        const container = document.getElementById('tradingview-widget');
        if (!container) return;

        // Clear previous widget
        container.innerHTML = '';

        // Create widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container';
        widgetContainer.style.height = '100%';
        widgetContainer.style.width = '100%';

        // Create widget element
        const widget = document.createElement('div');
        widget.className = 'tradingview-widget-container__widget';
        widget.style.height = 'calc(100% - 32px)';
        widget.style.width = '100%';

        // Create copyright element
        const copyright = document.createElement('div');
        copyright.className = 'tradingview-widget-copyright';
        copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';

        // Append elements
        widgetContainer.appendChild(widget);
        widgetContainer.appendChild(copyright);
        container.appendChild(widgetContainer);

        // Initialize widget with configuration
        const widgetConfig = {
            width: '100%',
            height: '100%',
            autosize: true,
            symbol: symbol,
            interval: "1",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: widget.id,
            hide_side_toolbar: false,
            withdateranges: true,
            save_image: false,
            details: true,
            hotlist: true,
            calendar: false,
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            backgroundColor: "rgba(30, 34, 45, 1)",
            gridColor: "rgba(66, 66, 66, 0.06)",
            support_host: "https://www.tradingview.com"
        };

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify(widgetConfig);

        widgetContainer.appendChild(script);
    }

    function pageEvents() {
        // Initialize default chart
        window.addEventListener('load', () => {
            initTradingViewWidget();
        });

        // Add click handlers for market cards
        MARKET_CARDS.forEach(market => {
            setTimeout(() => {
                const card = document.getElementById(`market-${market.id}`);
                if (card) {
                    card.addEventListener('click', () => {
                        initTradingViewWidget(market.pair);
                    });
                }
            }, 100); // Small delay to ensure DOM is ready
        });
    }

    return {
        html: /* html */`
        <section class="relative min-h-screen bg-brand-dark overflow-hidden">
            <!-- Animated Background Elements -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-dark/50 to-transparent"></div>
                <img src="${Element}" class="absolute top-10 right-10 w-24 opacity-10 animate-pulse">
                <img src="${Star}" class="absolute top-1/4 left-10 w-16 opacity-10 animate-[spin_20s_linear_infinite]">
                <img src="${Planet1}" class="absolute bottom-1/4 right-10 w-20 opacity-10 animate-bounce">
            </div>

            <div class="container mx-auto px-4 py-20">
                <!-- Market Cards -->
                <div class="grid gap-4 mb-12 relative z-10">
                    ${MARKET_CARDS.map(market => `
                        <div id="market-${market.id}" 
                             class="group bg-brand-blue/10 backdrop-blur-sm border border-brand-primary/10 
                                    rounded-xl overflow-hidden hover:bg-brand-blue/20 transition-all 
                                    duration-300 text-sm cursor-pointer">
                            <div class="p-6 flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-${market.color}/20 flex items-center justify-center">
                                        <span class="text-${market.color} font-bold text-sm md:text-lg">${market.symbol}</span>
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold text-lg">${market.name}</h3>
                                        <p class="text-brand-primary text-lg">${market.change}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-8">
                                    <div class="text-right">
                                        <div class="text-white font-bold text-lg">${market.price}</div>
                                        <button class="mt-2 px-4 py-1.5 bg-brand-primary/20 text-brand-primary 
                                                     rounded-lg text-sm font-medium hover:bg-brand-primary/30 
                                                     transition-colors">
                                            Trade
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- TradingView Chart -->
                <div class="relative z-10 bg-brand-blue/10 backdrop-blur-sm border border-brand-primary/10 
                          rounded-xl overflow-hidden p-1">
                    <div id="tradingview-widget" class="w-full h-[600px] rounded-lg overflow-hidden"></div>
                </div>
            </div>

            <!-- Background Decorations -->
            <img src="${Vector3}" class="absolute bottom-0 left-0 w-96 opacity-5">
            <img src="${Shape}" class="absolute top-0 right-0 w-96 opacity-5">
        </section>
        `,
        pageEvents
    };
};

export default trading;