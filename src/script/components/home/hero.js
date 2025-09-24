import image114 from '../../../images/assets/image-114.png';
import Shape2 from '../../../images/assets/Shape2.png';
import Element from '../../../images/assets/Element.png';
import image113 from '../../../images/assets/image-113.png';

const hero = () => {
    function pageEvents() {
        // Animate floating elements
        window.anime({
            targets: '.hero-float',
            translateY: [-15, 0],
            duration: 3000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });

        // Fade in elements with stagger
        window.anime({
            targets: '.hero-fade-in',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuad'
        });

        // Initialize TradingView widget after the DOM is loaded
        const initTradingViewWidget = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "allow_symbol_change": true,
                "calendar": false,
                "details": false,
                "hide_side_toolbar": true,
                "hide_top_toolbar": false,
                "hide_legend": false,
                "hide_volume": false,
                "hotlist": false,
                "interval": "5",
                "locale": "en",
                "save_image": true,
                "style": "1",
                "symbol": "BITSTAMP:BTCUSD",
                "theme": "dark",
                "timezone": "Etc/UTC",
                "backgroundColor": "#0F0F0F",
                "gridColor": "rgba(242, 242, 242, 0.06)",
                "watchlist": [
                    "BITSTAMP:BTCUSD",
                    "OANDA:EURUSD"
                ],
                "withdateranges": false,
                "compareSymbols": [
                    {
                        "symbol": "BITSTAMP:ETHUSD",
                        "position": "SameScale"
                    }
                ],
                "studies": [
                    "STD;24h%Volume",
                    "STD;Accumulation_Distribution"
                ],
                "autosize": true
            });
            document.querySelector('.hero-container').appendChild(script);
        };

        // Initialize the widget
        initTradingViewWidget();
    }

    return ({
        html: /* html */`
        <section class="relative min-h-screen flex items-center py-16 lg:py-24 overflow-hidden">
            <!-- Decorative Elements -->
            <img src="${image114}" alt="vector" 
                 class="absolute top-24 left-5 w-28 lg:w-44 hidden md:block hero-float opacity-20">
            
            <img src="${Shape2}" alt="shape" 
                 class="absolute bottom-20 right-10 w-16 lg:w-24 hidden md:block hero-float opacity-40">
            
            <img src="${Element}" alt="element" 
                 class="absolute top-1/2 left-1/2 w-20 lg:w-28 hidden lg:block opacity-30 hero-float">
            
            <img src="${image113}" alt="decor" 
                 class="absolute bottom-24 right-[300px] w-36 lg:w-48 hidden md:block opacity-20">

            <!-- Main Content -->
            <div class="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
                <!-- Content Section -->
                <div class="space-y-8">
                    <span class="text-brand-primary font-semibold uppercase tracking-wide hero-fade-in inline-block">
                        Trade with AI, Grow Faster
                    </span>
                    
                    <h1 class="text-4xl lg:text-6xl font-bold leading-tight hero-fade-in">
                        Advance Your <br>
                        Trading with <span class="text-brand-primary">AI</span> <br>
                        Market Moves
                    </h1>
                    
                    <p class="text-brand-white/70 max-w-md text-lg hero-fade-in">
                        Experience professional trading with advanced tools and real-time market data for optimal performance.
                    </p>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="/signup" data-nav 
                           class="hero-fade-in inline-flex items-center justify-center px-8 py-4 
                                  bg-brand-primary text-brand-blue font-bold rounded-xl 
                                  hover:opacity-90 transition-all hover:translate-y-[-2px] 
                                  hover:shadow-lg hover:shadow-brand-primary/20 
                                  active:translate-y-[0px] text-sm">
                            Start Trading Now
                            <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                        <a href="/login" data-nav 
                           class="hero-fade-in inline-flex items-center justify-center px-8 py-4 
                                  border-2 border-brand-primary text-brand-primary font-bold 
                                  rounded-xl hover:bg-brand-primary/10 transition-all 
                                  hover:translate-y-[-2px] active:translate-y-[0px] text-sm">
                            <i class="fas fa-play-circle mr-2"></i>
                            Try Demo Account
                        </a>
                    </div>
                </div>

                <!-- TradingView Chart Section -->
                <div class="flex justify-center relative hero-fade-in aside-tab h-[500px]">
                    <div class="tradingview-widget-container w-full h-full">
                        <div class="tradingview-widget-container__widget hero-container h-[calc(100%-32px)] w-full"></div>
                        <div class="tradingview-widget-copyright">
                            <a href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITSTAMP" 
                               rel="noopener nofollow" 
                               target="_blank">
                                <span class="blue-text">BTCUSD chart</span>
                            </a>
                            <span class="trademark"> by TradingView</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        pageEvents
    });
}

export default hero;