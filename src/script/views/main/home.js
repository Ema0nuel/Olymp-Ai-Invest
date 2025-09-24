import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import TradingCard from "../../components/home/TradingCard";
import consultation from "../../components/home/consultation";
import process from "../../components/home/process";
import Hero from "../../components/home/hero";
import reset, { cleanupAll } from "../../utils/reset";
import preview from "../../components/home/preview";
import trading from "../../components/home/trading";
import faq from "../../components/home/faq";
import trade from "../../components/markets/trade";
import Brands from "../../components/Brands";
import { renderHomeBanner } from "../../components/home/banner";
import { initializeStatWidget, renderHomeStat } from "../../components/home/stat";
import { trackPageVisit } from '../../utils/analtics'


const PORTFOLIOS = [
    {
        type: 'NFT & Metaverse',
        subtitle: 'Innovation before safety',
        riskLevel: 4,
        since: 'April 2021',
        distribution: { crypto: 100 },
        bgClass: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
        type: 'Adventurous',
        subtitle: 'Returns before safety',
        riskLevel: 4,
        since: 'January 2021',
        distribution: { crypto: 100 },
        bgClass: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    {
        type: 'New Pattern Hooks',
        subtitle: 'Ensures new strategies',
        riskLevel: 2,
        since: 'August 2024',
        distribution: { crypto: 500 },
        bgClass: 'bg-gradient-to-br from-yellow-200 to-yellow-400'
    },
    {
        type: 'Copy outlook',
        subtitle: 'Already prepared by the team',
        riskLevel: 5,
        since: 'December 2023',
        distribution: { crypto: 200 },
        bgClass: 'bg-gradient-to-br from-red-700 to-red-400'
    },
    // Add other portfolios
];

const { html: tradeHtml, pageEvents: tradeEvents } = trade()

const home = async () => {
    reset('Olymp AI Invest');
    cleanupAll()

    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar();
    const { html: hero, pageEvents: heroEvents } = Hero();
    const { html: consultationHtml, pageEvents: consultationEvents } = consultation();
    const { html: tradingCardHtml, pageEvents: tradingCardEvents } = TradingCard();
    const { html: processHtml, pageEvents: processEvents } = process();
    const { html: previewHtml, pageEvents: previewEvents } = preview();
    const { html: tradingHtml, pageEvents: tradingEvents } = trading();
    const { html: faqHtml, pageEvents: faqEvents } = faq();
    const bannerTape = renderHomeBanner()
    const statBox = renderHomeStat()
    tradingEvents();


    function pageEvents() {
        navEvents();
        heroEvents();
        tradeEvents()
        consultationEvents();
        tradingCardEvents();
        processEvents();
        previewEvents()
        faqEvents();

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

        initializeStatWidget()
    }

    return {
        html: /* html */`
            ${navbar}
            <div class="taper-banner w-full">
                ${bannerTape}
            </div>
            <main class="pt-[15px] animate-fade-in-up">
                ${hero}
                ${statBox}
                ${tradeHtml}
                ${consultationHtml}
                ${tradingCardHtml}
                ${processHtml}
                ${Brands()}
                <!-- Portfolio Section -->
                <section class="py-20 bg-brand-dark">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl font-bold text-white mb-4">
                                Pick a Portfolio. We Handle the Rest!
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            ${PORTFOLIOS.map(portfolio => `
                                <div class="rounded-2xl overflow-hidden ${portfolio.bgClass} 
                                          backdrop-blur-xl transition-transform hover:scale-[1.02]">
                                    <div class="p-6 border-b border-white/10">
                                        <h3 class="text-2xl font-semibold text-white mb-2">
                                            ${portfolio.type}
                                        </h3>
                                        <p class="text-white/70 text-sm mb-4">${portfolio.subtitle}</p>
                                        
                                        <div class="flex gap-1 mb-2">
                                            ${Array(4).fill().map((_, i) => `
                                                <svg class="w-4 h-4 ${i < portfolio.riskLevel ? 'text-blue-400' : 'text-white/30'}" 
                                                     viewBox="0 0 24 24">
                                                    <path fill="currentColor" 
                                                          d="M13,0.5c0,0,0.1,0.1,0.1,0.1l3.6,3.6c0.1,0.1,0.1,0.2,0.1,0.3v16c0,0.6-0.4,1-1,1H8.2c-0.6,0-1-0.4-1-1V4.5c0-0.1,0-0.2,0.1-0.3l3.6-3.6C11,0.5,11.1,0.5,13,0.5z"/>
                                                </svg>
                                            `).join('')}
                                        </div>
                                        <p class="text-sm text-white/60">Risk Level</p>
                                    </div>

                                    <div class="p-6 bg-black/20">
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <p class="text-sm text-white/60">Crypto Market</p>
                                                <p class="text-lg font-semibold text-white">
                                                    ${portfolio.distribution.crypto}%
                                                </p>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <svg class="w-4 h-4 text-green-400" viewBox="0 0 24 24">
                                                    <path fill="currentColor" 
                                                          d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"/>
                                                </svg>
                                                <span class="text-sm text-white/70">Smart Rebalancing</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="text-center mt-12">
                            <a href="/markets" data-nav 
                               class="inline-flex items-center gap-2 text-white/90 hover:text-white 
                                      transition-colors">
                                <span>See all portfolios</span>
                                <svg class="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" 
                                          d="M14.59,7.41L18.17,11H2v2h16.17l-3.59,3.59L16,18l6-6l-6-6L14.59,7.41z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                ${previewHtml}
                ${tradingHtml}
                ${faqHtml}
            </main>
            ${Footer().html}
        `,
        pageEvents
    }
}

export default home;
