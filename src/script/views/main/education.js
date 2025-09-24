import Footer from "../../components/Footer";
import { initializeStatWidget, renderHomeStat } from "../../components/home/stat";
import { renderHomeBanner } from "../../components/home/banner";
import Navbar from "../../components/Navbar";
import reset, { cleanupAll } from "../../utils/reset";
import { trackPageVisit } from '../../utils/analtics'


// Course card data
const COURSES = [
    {
        title: "Forex Trading Fundamentals",
        category: "beginner",
        lessons: 12,
        duration: "6 hours",
        icon: "chart-line",
        description: "Master the basics of forex trading, currency pairs, and market analysis.",
        color: "blue"
    },
    {
        title: "Technical Analysis Mastery",
        category: "intermediate",
        lessons: 15,
        duration: "8 hours",
        icon: "chart-candlestick",
        description: "Learn advanced chart patterns and technical indicators.",
        color: "emerald"
    },
    {
        title: "Risk Management Strategies",
        category: "advanced",
        lessons: 10,
        duration: "5 hours",
        icon: "shield-check",
        description: "Develop effective risk management techniques for consistent trading.",
        color: "purple"
    },
    {
        title: "Cryptocurrency Trading",
        category: "intermediate",
        lessons: 14,
        duration: "7 hours",
        icon: "bitcoin-sign",
        description: "Navigate the crypto markets with confidence and strategy.",
        color: "amber"
    }
];

// Education stats
const STATS = [
    { value: 1000, suffix: "+", label: "Video Lessons", icon: "video" },
    { value: 50, suffix: "K+", label: "Active Students", icon: "users" },
    { value: 95, suffix: "%", label: "Success Rate", icon: "chart-line" },
    { value: 24, suffix: "/7", label: "Support", icon: "headset" }
];

function initStatsAnimation() {
    STATS.forEach((stat, index) => {
        const el = document.querySelector(`.stat-value-${index}`);
        if (el) {
            let start = 0;
            const end = stat.value;
            const duration = 1500;

            anime({
                targets: el,
                innerHTML: [start, end],
                easing: 'easeInOutExpo',
                duration,
                round: 1,
                update: function (anim) {
                    el.innerHTML = Math.round(anim.animations[0].currentValue) + stat.suffix;
                }
            });
        }
    });
}

function initCourseCardEffects() {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
    });
}

const education = async () => {
    reset('Olymp AI Invest Education Center');
    cleanupAll();
    await trackPageVisit()

    const { html: navbar, pageEvents: navEvents } = Navbar();
    const bannerTape = renderHomeBanner()

    function pageEvents() {
        navEvents();
        initStatsAnimation();
        initCourseCardEffects();
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
        <main class="flex flex-col min-h-screen bg-brand-dark">
            
            <!-- Hero Section -->
            <section class="relative py-20 overflow-hidden bg-cover bg-center"  
                     style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
                 <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-brand-black/90"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-4xl mx-auto text-center">
                        <span class="inline-block px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                            Education Center
                        </span>
                        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                            Master the Markets with Confidence
                        </h1>
                        <p class="text-xl text-gray-400 mb-12">
                            Access professional trading education, market analysis, and expert insights to enhance your trading journey.
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                            ${STATS.map((stat, index) => `
                                <div class="p-6 rounded-2xl bg-brand-black/50 backdrop-blur border border-brand-primary/10">
                                    <i class="fas fa-${stat.icon} text-2xl text-brand-primary mb-4"></i>
                                    <div class="stat-value-${index} text-3xl font-bold text-white mb-2">0</div>
                                    <div class="text-gray-400">${stat.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
            ${renderHomeStat()}

            <!-- Courses Section -->
            <section class="py-20">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h2 class="text-3xl font-bold text-white mb-4">Featured Courses</h2>
                            <p class="text-gray-400 max-w-2xl">
                                Start your trading journey with our comprehensive courses designed by industry experts.
                            </p>
                        </div>
                        <div class="flex gap-4">
                            <button class="px-6 py-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                All Courses
                            </button>
                            <button class="px-6 py-2 rounded-xl bg-brand-black/50 text-white hover:bg-brand-black/70 transition-colors">
                                Popular
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${COURSES.map(course => `
                            <div class="course-card group rounded-2xl bg-brand-black/50 border border-brand-primary/10 p-6 transition-all">
                                <div class="flex items-center gap-4 mb-6">
                                    <div class="w-12 h-12 rounded-xl bg-${course.color}-500/10 flex items-center justify-center">
                                        <i class="fas fa-${course.icon} text-${course.color}-500"></i>
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-400 capitalize">${course.category}</span>
                                        <h3 class="text-lg font-semibold text-white">${course.title}</h3>
                                    </div>
                                </div>
                                <p class="text-gray-400 mb-6">${course.description}</p>
                                <div class="flex items-center justify-between pt-4 border-t border-brand-primary/10">
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm text-gray-400">
                                            <i class="fas fa-book-open mr-2"></i>${course.lessons} lessons
                                        </span>
                                        <span class="text-sm text-gray-400">
                                            <i class="fas fa-clock mr-2"></i>${course.duration}
                                        </span>
                                    </div>
                                    <button class="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary 
                                                   group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="py-20 bg-brand-black relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-4xl mx-auto bg-brand-black/80 backdrop-blur rounded-2xl p-8 border border-brand-primary/10">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-white mb-6">
                                Ready to Start Learning?
                            </h2>
                            <p class="text-gray-400 mb-8">
                                Join thousands of traders who are already learning and trading with Olymp AI Invest.
                            </p>
                            <div class="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="/signup" data-nav 
                                   class="px-8 py-4 rounded-xl bg-brand-primary text-brand-dark font-semibold 
                                          hover:bg-brand-primary/90 transition-colors">
                                    Create Free Account
                                </a>
                                <a href="/markets" data-nav 
                                   class="px-8 py-4 rounded-xl border border-brand-primary text-brand-primary 
                                          hover:bg-brand-primary/10 transition-colors">
                                    Explore Markets
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            ${Footer().html}
        </main>
        `,
        pageEvents
    }
}

export default education;