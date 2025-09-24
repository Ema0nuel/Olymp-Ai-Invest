import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import reset, { cleanupAll } from "../../utils/reset"
import DIP from '../../../images/assets/platform.fd56916942650780b1f8.webm'
import { renderHomeBanner } from "../../components/home/banner"
import { trackPageVisit } from '../../utils/analtics'


const stats = [
    { label: "Active Traders", value: "3.5M+", icon: "fas fa-users" },
    { label: "Daily Volume", value: "$8.2B+", icon: "fas fa-chart-line" },
    { label: "Countries", value: "195+", icon: "fas fa-globe" },
    { label: "Assets", value: "250+", icon: "fas fa-coins" }
]

const news = [
    {
        title: "S&P 500 Hits New Highs",
        desc: "The S&P 500 index reached record levels, driven by tech sector growth.",
        date: "Aug 20, 2025"
    },
    {
        title: "Gold Surges Amid Inflation",
        desc: "Gold prices rally as inflation concerns rise globally.",
        date: "Aug 19, 2025"
    },
    {
        title: "Forex Volatility Spikes",
        desc: "Major currency pairs experience increased volatility after Fed comments.",
        date: "Aug 18, 2025"
    }
]

async function marketsOverview() {
    reset('Olymp AI Invests Overview')
    cleanupAll()
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    function pageEvents() {
        navEvents()
        // Animate stats on load
        document.querySelectorAll('.stat-animate').forEach(el => {
            el.classList.add('animate-fade-in-up')
        })
        // TradingView widget hover effect
        const tvBox = document.querySelector('.tv-widget-box')
        if (tvBox) {
            tvBox.addEventListener('mouseenter', () => tvBox.classList.add('shadow-[0_0_20px_#f1d416]'))
            tvBox.addEventListener('mouseleave', () => tvBox.classList.remove('shadow-[0_0_20px_#f1d416]'))
        }
        // Inject TradingView widget script after banner is rendered
        const bannerDiv = document.getElementById('tradingview-banner');
        if (bannerDiv) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
            script.innerHTML = JSON.stringify({
                "symbols": [
                    { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
                    { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
                    { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
                    { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
                    { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
                    { "proName": "NSE:NIFTY", "title": "Nifty" }
                ],
                "colorTheme": "dark",
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": false,
                "showSymbolLogo": true,
                "displayMode": "adaptive"
            });
            bannerDiv.querySelector('.tradingview-widget-container__widget').appendChild(script);
        }
    }

    return ({
        html: /* html */`
        ${navbar}
        <div class="taper-banner w-full">
            ${renderHomeBanner()}
        </div>
        <main class="min-h-screen">
            <!-- Hero Section -->
            <section class="relative py-20 bg-cover bg-center" style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
                <div class="absolute inset-0 bg-black/70"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-3xl mx-auto text-center">
                        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                            Olymp AI Invest Overview & Analysis
                        </h1>
                        <p class="text-lg text-gray-200 mb-8 animate-fade-in-up">
                            Olymp AI Invest is trusted by over 3.5 million traders in 195+ countries, offering access to 250+ assets and daily volumes exceeding $8.2B. Our platform delivers real-time analytics, deep liquidity, and advanced trading tools for every trader.
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            ${stats.map(s => `
                                <div class="flex flex-col items-center bg-brand-blue/10 rounded-xl p-6 stat-animate transition-all duration-500 hover:bg-brand-primary/10 hover:scale-105">
                                    <i class="${s.icon} text-2xl text-brand-primary mb-2"></i>
                                    <span class="text-2xl font-bold text-brand-primary mb-1">${s.value}</span>
                                    <span class="text-gray-300 text-sm">${s.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
            <!-- Video Section -->
            <section class="py-10">
                <div class="container mx-auto px-4">
                    <div class="tv-widget-box relative w-full max-w-4xl mx-auto p-2 rounded-2xl bg-transparent backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_#f1d416] transition duration-300">
                        <video autoplay loop muted playsinline class="w-full object-cover rounded-2xl border-none bg-transparent transition-all duration-300">
                            <source src="${DIP}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="absolute bottom-4 right-4 bg-brand-primary/80 text-brand-blue px-3 py-1 rounded-lg text-xs font-bold shadow-lg">Live Market Sentiment</div>
                    </div>
                </div>
            </section>
            <!-- TradingView Widget Section -->
            <section class="py-10">
                <div class="container mx-auto px-4">
                    <div class="relative w-full max-w-4xl mx-auto p-2 rounded-2xl border border-[#f1d416] bg-transparent backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_#f1d416] transition duration-300">
                        <iframe 
                            scrolling="no" 
                            allowtransparency="true" 
                            frameborder="0"
                            src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%221D%22%2C%22showChart%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A361%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Instruments%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%7D%5D%7D"
                            title="market overview TradingView widget" 
                            lang="en"
                            class="w-full h-[361px] rounded-2xl border-none bg-transparent">
                        </iframe>
                    </div>
                </div>
            </section>
            <!-- TradingView Multi Stats Section -->
            <section class="py-10">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="rounded-xl p-6">
                            <h3 class="text-xl font-bold text-white mb-4">Indices & Futures</h3>
                            <div class="tradingview-widget-container">
                                <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=FOREXCOM:SPXUSD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&hideideas=1&widgetbar=hide&hidevolume=1&hidelegend=1&width=100%25&height=300" width="100%" height="300" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
                            </div>
                        </div>
                        <div class="rounded-xl p-6">
                            <h3 class="text-xl font-bold text-white mb-4">Forex & Commodities</h3>
                            <div class="tradingview-widget-container">
                                <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_2&symbol=FX:EURUSD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&hideideas=1&widgetbar=hide&hidevolume=1&hidelegend=1&width=100%25&height=300" width="100%" height="300" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- News Section -->
            <section class="py-10">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold text-white mb-6">Latest Market News</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${news.map(n => /* html */`
                            <div class="bg-brand-blue/10 rounded-xl p-6 transition-all duration-300 hover:bg-brand-primary/10 hover:scale-105">
                                <h4 class="text-lg font-bold text-white mb-2">${n.title}</h4>
                                <p class="text-gray-400 mb-2">${n.desc}</p>
                                <span class="text-sm text-brand-primary">${n.date}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        </main>
        ${Footer().html}
        `,
        pageEvents
    })
}

export default marketsOverview