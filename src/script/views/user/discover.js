import auth from '../../utils/auth'
import reset, { cleanupAll } from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import { trackPageVisit } from '../../utils/analtics'


const discover = async () => {
    const authCheck = await auth.check('discover')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Discover')
    cleanupAll();
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // Get user data and greeting
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    const getGreeting = () => {
        const hour = new Date().getHours()
        return hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'
    }

    const marketWidgets = {
        tickerTape: {
            widget: "ticker-tape",
            containerId: "ticker_tape",
            config: {
                colorTheme: "dark",
                isTransparent: false,
                showSymbolLogo: true,
                displayMode: "adaptive",
                locale: "en",
                symbols: [
                    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                    { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                    { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
                    { proName: "OANDA:XAUUSD", title: "Gold" }
                ]
            }
        },
        marketQuotes: {
            widget: "market-quotes",
            containerId: "market_quotes",
            config: {
                width: "100%",
                height: "400",
                locale: "en",
                colorTheme: "dark",
                isTransparent: false,
                showSymbolLogo: true
            }
        },
        hotlists: {
            widget: "hotlists",
            containerId: "market_hotlists",
            config: {
                colorTheme: "dark",
                isTransparent: false,
                showChart: true,
                locale: "en",
                width: "100%",
                height: "400",
                dateRange: "12M"
            }
        },
        forexCross: {
            widget: "forex-cross-rates",
            containerId: "forex_cross_rates",
            config: {
                width: "100%",
                height: "400",
                colorTheme: "dark",
                isTransparent: false,
                currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"]
            }
        }
    }

    const initializeWidget = (widget) => {
        return new Promise((resolve) => {
            const container = document.getElementById(widget.containerId)
            if (container) {
                const script = document.createElement('script')
                script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widget.widget}.js`
                script.type = 'text/javascript'
                script.async = true
                script.innerHTML = JSON.stringify(widget.config)

                script.onload = () => resolve()
                container.appendChild(script)
            }
        })
    }

    async function initializeWidgets() {
        try {
            await Promise.all(Object.values(marketWidgets).map(widget => initializeWidget(widget)))
        } catch (error) {
            console.error('Error initializing widgets:', error)
        }
    }

    async function pageEvents() {
        await navEvents()
        await initializeWidgets()

        // Add responsive handlers for mobile/desktop switches
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const handleViewportChange = (e) => {
            const containers = document.querySelectorAll('.widget-container')
            containers.forEach(container => {
                container.style.height = e.matches ? '400px' : '300px'
            })
        }
        mediaQuery.addListener(handleViewportChange)
        handleViewportChange(mediaQuery)
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view flex-1">
                <!-- Ticker Tape - Fixed at top -->
                <div class="sticky top-0 z-10 h-24 lg:px-6 lg:mx-auto">
                    <div id="${marketWidgets.tickerTape.containerId}"></div>
                </div>

                <!-- User Greeting -->
                <div class="p-4 pt-20 md:p-6 md:pt-8">
                    <h1 class="text-2xl font-bold text-white">
                        ${getGreeting()}, ${profile?.full_name?.split(' ')[0] || 'Trader'}!
                    </h1>
                    <p class="text-gray-400 mt-1">Here's your market overview</p>
                </div>

                <!-- Market Overview Sections -->
                <div class="p-4 md:p-6 space-y-6 pb-14 lg:pb-0">
                    <!-- Market Quotes Section -->
                    <section class="widget-container rounded-lg overflow-hidden">
                        <h2 class="text-xl font-semibold text-white mb-4">Market Overview</h2>
                        <div id="${marketWidgets.marketQuotes.containerId}" class="h-full"></div>
                    </section>

                    <!-- Two Column Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Hotlists -->
                        <section class="widget-container rounded-lg overflow-hidden">
                            <h2 class="text-xl font-semibold text-white mb-4">Top Movers</h2>
                            <div id="${marketWidgets.hotlists.containerId}" class="h-full"></div>
                        </section>

                        <!-- Forex Cross Rates -->
                        <section class="widget-container rounded-lg overflow-hidden">
                            <h2 class="text-xl font-semibold text-white mb-4">Forex Overview</h2>
                            <div id="${marketWidgets.forexCross.containerId}" class="h-full"></div>
                        </section>
                    </div>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default discover