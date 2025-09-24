import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import reset, { cleanupAll } from "../../utils/reset"
import trade from "../../components/markets/trade"
import Post1 from '../../../images/assets/blog/621506e9a118372908f2f33e_everything-thumbnail-image.jpeg'
import Post2 from '../../../images/assets/blog/621506e9a118371ef8f2f224_Decentralised-finance.png'
import Post3 from "../../../images/assets/blog/621506e9a1183737fff2f2b8_NFT's & Metaverse.png"
import Post4 from "../../../images/assets/blog/621506e9a11837332ef2f241_A complete guide to NFT's.png"
import { renderHomeBanner } from "../../components/home/banner"
import { trackPageVisit } from '../../utils/analtics'


const BLOG_POSTS = [
    {
        title: "Everything you might have missed in January",
        subtitle: "Olymp AI Invest | January Recap",
        image: Post1,
        date: "February 1, 2024",
    },
    {
        title: "Decentralised Finance (DeFi) – The twenty-first century way of managing your finances",
        subtitle: "Olymp AI Invest | The twenty-first century way of managing your finances",
        image: Post2,
        date: "December 10, 2024",
    },
    {
        title: "A Complete Guide to NFTs",
        subtitle: "Olymp AI Invest | A Complete Guide to NFTs",
        image: Post3,
        date: "December 3, 2024",
    },
    {
        title: "A Complete Guide to the Metaverse - The World between Technology and Reality",
        subtitle: "Olymp AI Invest | A Complete Guide to the Metaverse",
        image: Post4,
        date: "November 26, 2024",
    }
]

const trading = async () => {
    reset('Olymp AI Invests Trades')
    cleanupAll()

    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()
    const { html: tradeWidget, pageEvents: tradeEvents } = trade()

    function pageEvents() {
        navEvents()
        tradeEvents()

        // Add hover effects for blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('transform', 'scale-[1.02]', 'shadow-xl')
            })
            card.addEventListener('mouseleave', () => {
                card.classList.remove('transform', 'scale-[1.02]', 'shadow-xl')
            })
        })

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
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" 
                 style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Trading & Analysis</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center">
                        <ol class="flex gap-2 text-gray-300">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">Trading</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <!-- Trading Widgets Section -->
        ${tradeWidget}

        <!-- Blog Section -->
        <section class="py-20 bg-brand-dark">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Latest Trading Insights</h2>
                    <p class="text-gray-400">Stay updated with our latest market analysis and trading strategies</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${BLOG_POSTS.map(post => /* html */`
                        <a data-nav 
                           class="blog-card group bg-brand-blue/10 rounded-xl overflow-hidden border border-brand-primary/20 
                                  transition-all duration-300">
                            <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img src="${post.image}" alt="${post.title}" 
                                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                                    ${post.title}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4">${post.subtitle}</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-brand-primary text-sm">${post.date}</span>
                                    <span class="text-white group-hover:translate-x-2 transition-transform">
                                        <i class="fas fa-paper-plane"></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>

                <div class="text-center mt-12">
                    <a href="/markets" data-nav 
                       class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue font-bold 
                              rounded-xl hover:bg-opacity-90 transition-all">
                        View All Markets Stats
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-brand-black">
            <div class="container mx-auto px-4">
                <div class="bg-brand-blue/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center 
                            justify-between gap-8 border border-brand-primary/20">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Start Trading?
                        </h2>
                        <p class="text-gray-300">
                            Join thousands of traders and start your journey today
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <a href="/signup" data-nav 
                           class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue 
                                  font-bold rounded-xl hover:bg-opacity-90 transition-all">
                            Open Account
                            <i class="fas fa-user-plus ml-2"></i>
                        </a>
                        <a href="/login" data-nav 
                           class="inline-flex items-center px-8 py-4 border-2 border-brand-primary 
                                  text-brand-primary font-bold rounded-xl hover:bg-brand-primary/10 transition-all">
                            Try Demo
                            <i class="fas fa-play-circle ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        ${Footer().html}
    `,
        pageEvents
    })
}

export default trading