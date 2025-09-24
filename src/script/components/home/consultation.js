
import Binance from '../../../images/assets/Binance_Logo.svg'
import Bybit from '../../../images/assets/Bybit_Logo.svg'
import Coinbase from '../../../images/assets/Coinbase.svg'
import Huobi from '../../../images/assets/Huobi-logo.png'
import Kraken from '../../../images/assets/Kraken_bitcoin_exchange_logo.png'
import Kucoin from '../../../images/assets/KUCOIN.svg'

const consultation = () => {
    function pageEvents() {
        // Add hover effect for service cards
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.icon-wrapper');
                icon.classList.remove('bg-brand-blue/10');
                icon.classList.add('bg-brand-primary');
                icon.querySelector('i').classList.add('text-brand-blue');
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.icon-wrapper');
                icon.classList.add('bg-brand-blue/10');
                icon.classList.remove('bg-brand-primary');
                icon.querySelector('i').classList.remove('text-brand-blue');
            });
        });
    }

    return ({
        html: /* html */`
        <section class="py-20">
            <!-- Partners Section -->
            <div class="container mx-auto px-4 py-8 mb-20 bg-brand-primary w-full">
                <div class="flex justify-center items-center flex-wrap gap-8 opacity-100 transition-opacity">
                    <img src="${Binance}" alt="Binance" class="h-8 w-auto">
                    <img src="${Bybit}" alt="Bybit" class="h-8 w-auto">
                    <img src="${Coinbase}" alt="Coinbase" class="h-8 w-auto">
                    <img src="${Huobi}" alt="Huobi" class="h-8 w-auto">
                    <img src="${Kraken}" alt="Kraken" class="h-8 w-auto">
                    <img src="${Kucoin}" alt="Kucoin" class="h-8 w-auto">
                </div>
            </div>

            <!-- Services Section -->
            <div class="container mx-auto px-4">
                <!-- Header -->
                <div class="flex flex-col lg:flex-row justify-between items-center mb-16">
                    <div class="lg:w-1/2">
                        <span class="text-brand-primary font-semibold uppercase tracking-wide mb-3 block">
                            Our Services
                        </span>
                        <h2 class="text-3xl lg:text-4xl font-bold text-brand-white">
                            Unlock Financial Freedom With Smart Choices
                        </h2>
                    </div>
                    <div class="lg:w-1/2 mt-4 lg:mt-0">
                        <p class="text-brand-white/70 text-lg lg:text-right">
                            Experience professional trading with advanced tools and real-time market data for optimal performance.
                        </p>
                    </div>
                </div>

                <!-- Services Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    ${[
                {
                    icon: 'fa-chart-line',
                    title: 'Market Analysis',
                    description: 'Advanced technical analysis tools and real-time market data for informed trading decisions.'
                },
                {
                    icon: 'fa-robot',
                    title: 'Automated Trading',
                    description: 'Smart algorithms and automated trading systems to execute trades with precision.'
                },
                {
                    icon: 'fa-shield-alt',
                    title: 'Secure Trading',
                    description: 'State-of-the-art security measures to protect your assets and transactions.'
                },
                {
                    icon: 'fa-graduation-cap',
                    title: 'Trading Education',
                    description: 'Comprehensive learning resources and expert guidance for traders of all levels.'
                },
                {
                    icon: 'fa-users-cog',
                    title: 'Portfolio Management',
                    description: 'Professional tools for managing and optimizing your investment portfolio.'
                },
                {
                    icon: 'fa-headset',
                    title: '24/7 Support',
                    description: 'Round-the-clock customer support to assist you with any trading-related queries.'
                }
            ].map(service => `
                        <div class="service-card group">
                            <div class="relative bg-brand-blue/5 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-8 transition-all duration-300 hover:border-brand-primary/30">
                                <span class="icon-wrapper flex items-center justify-center w-16 h-16 bg-brand-blue/10 text-brand-primary rounded-xl transition-all duration-300">
                                    <i class="fas ${service.icon} text-2xl transition-colors duration-300"></i>
                                </span>
                                <h3 class="mt-6 mb-4 text-xl font-bold text-brand-white group-hover:text-brand-primary transition-colors">
                                    ${service.title}
                                </h3>
                                <p class="text-brand-white/70 text-sm leading-relaxed">
                                    ${service.description}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        `,
        pageEvents
    })
}

export default consultation