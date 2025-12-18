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
import { render } from "nprogress";


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

// Add this after your existing PORTFOLIOS array
export const INVESTMENT_PLANS = [
    {
        name: 'Starter Plan',
        minAmount: 300,
        maxAmount: 2999,
        duration: '7 days',
        dailyReturn: 2.5,
        totalReturn: '117.5%',
        features: [
            'Instant Withdrawal',
            'Smart Contract Integration',
            '24/7 Support'
        ],
        bgGradient: 'from-emerald-500 to-teal-700',
        accentColor: 'emerald'
    },
    {
        name: 'Advanced Plan',
        minAmount: 3000,
        maxAmount: 9999,
        duration: '14 days',
        dailyReturn: 3.2,
        totalReturn: '144.8%',
        features: [
            'Priority Withdrawal',
            'Smart Contract Integration',
            'Dedicated Account Manager',
            'Market Analysis Reports'
        ],
        bgGradient: 'from-blue-500 to-indigo-700',
        accentColor: 'blue',
        popular: true
    },
    {
        name: 'Expert Plan',
        minAmount: 10000,
        maxAmount: 49999,
        duration: '30 days',
        dailyReturn: 4.0,
        totalReturn: '220%',
        features: [
            'Instant Withdrawal',
            'Smart Contract Integration',
            'VIP Account Manager',
            'Advanced Trading Tools',
            'Weekly Strategy Calls'
        ],
        bgGradient: 'from-violet-500 to-purple-700',
        accentColor: 'violet'
    },
    {
        name: 'Elite Plan',
        minAmount: 50000,
        maxAmount: 1000000,
        duration: '45 days',
        dailyReturn: 5.0,
        totalReturn: '325%',
        features: [
            'Instant Withdrawal',
            'Smart Contract Integration',
            'Executive Account Manager',
            'Custom Trading Strategy',
            'Direct Phone Line',
            'Monthly Strategy Review'
        ],
        bgGradient: 'from-amber-500 to-orange-700',
        accentColor: 'amber'
    }
];

const { html: tradeHtml, pageEvents: tradeEvents } = trade()

export function renderInvestmentPlans() {
    return /* html */ `
        <!-- Investment Plans Section -->
                <section class="py-16 lg:py-24 bg-gradient-to-b from-brand-dark to-black">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-10 lg:mb-16">
                            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-3">
                                Investment Plans
                            </h2>
                            <p class="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
                                Choose the perfect investment plan tailored to your goals
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            ${INVESTMENT_PLANS.map(plan => /* html */`
                                <div class="relative group">
                                    ${plan.popular ? `
                                        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span class="bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                                                POPULAR
                                            </span>
                                        </div>
                                    ` : ''}
                                    
                                    <div class="h-full rounded-xl bg-gradient-to-br ${plan.bgGradient} p-[1px] transition-transform hover:scale-[1.02]">
                                        <div class="h-full rounded-xl bg-black/90 backdrop-blur-xl p-5 lg:p-6">
                                            <!-- Header -->
                                            <div class="mb-4">
                                                <h3 class="text-xl lg:text-2xl font-bold text-white mb-2">${plan.name}</h3>
                                                <div class="flex items-baseline gap-1">
                                                    <span class="text-2xl lg:text-3xl font-bold text-${plan.accentColor}-400">$${plan.minAmount.toLocaleString()}</span>
                                                    <span class="text-sm text-gray-400">min</span>
                                                </div>
                                            </div>

                                            <!-- Details -->
                                            <div class="space-y-4 grid-content-size-dy">
                                                <!-- Stats Grid -->
                                                <div class="grid grid-cols-2 gap-2">
                                                    <div class="p-2.5 rounded-lg bg-white/5 flex flex-col">
                                                        <span class="text-gray-400 text-[11px] leading-none mb-1">Maximum</span>
                                                        <span class="text-white text-xs md:text-sm font-medium leading-tight">$${plan.maxAmount.toLocaleString()}</span>
                                                    </div>
                                                    <div class="p-2.5 rounded-lg bg-white/5 flex flex-col">
                                                        <span class="text-gray-400 text-[11px] leading-none mb-1">Duration</span>
                                                        <span class="text-white text-xs md:text-sm font-medium leading-tight">${plan.duration}</span>
                                                    </div>
                                                    <div class="p-2.5 rounded-lg bg-white/5 flex flex-col">
                                                        <span class="text-gray-400 text-[11px] leading-none mb-1">Daily ROI</span>
                                                        <span class="text-${plan.accentColor}-400 text-xs md:text-sm font-bold leading-tight">${plan.dailyReturn}%</span>
                                                    </div>
                                                    <div class="p-2.5 rounded-lg bg-white/5 flex flex-col">
                                                        <span class="text-gray-400 text-[11px] leading-none mb-1">Total ROI</span>
                                                        <span class="text-${plan.accentColor}-400 text-xs md:text-sm font-bold leading-tight">${plan.totalReturn}</span>
                                                    </div>
                                                </div>

                                                <!-- Features List -->
                                                <div class="space-y-2 pt-2 pb-6">
                                                    ${plan.features.map(feature => `
                                                        <div class="flex items-center gap-2 text-sm">
                                                            <svg class="w-4 h-4 text-${plan.accentColor}-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span class="text-gray-300 text-sm">${feature}</span>
                                                        </div>
                                                    `).join('')}
                                                </div>

                                                <!-- Action Button -->
                                                <a data-nav href="/signup" class="w-full mt-8 py-2 px-4 rounded-lg bg-${plan.accentColor}-500/20 
                                                        border border-${plan.accentColor}-500/30 text-${plan.accentColor}-400 
                                                        text-sm font-semibold transition-all hover:bg-${plan.accentColor}-500/30 
                                                        hover:border-${plan.accentColor}-500/40 focus:outline-none focus:ring-2 
                                                        focus:ring-${plan.accentColor}-500/40 focus:ring-offset-1 
                                                        focus:ring-offset-black">
                                                    Choose Plan
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
    `
}

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
                <!-- Elfsight All-in-One Reviews | Olymp AI Invest -->
                <script src="https://elfsightcdn.com/platform.js" async></script>
                <div class="elfsight-app-4382ee77-9c65-4a3b-ab22-b4f5468d62df" data-elfsight-app-lazy></div>
                ${renderInvestmentPlans()}
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
